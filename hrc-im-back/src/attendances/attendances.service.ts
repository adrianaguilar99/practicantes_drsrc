import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';
import { InternsService } from 'src/interns/interns.service';
import { differenceInMinutes } from 'date-fns';
import { AttendanceStatuses, UserRole } from 'src/common/enums';
import {
  calculateWorkedHoursInHHMMSS,
  validateAttendancePeriod,
} from './helpers';
import { handleInternalServerError } from 'src/common/utils';
import { IRequestUser } from 'src/common/interfaces';
import { SupervisorsService } from 'src/supervisors/supervisors.service';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';
import { UserNotificationsGateway } from 'src/user-notifications/user-notifications.gateway';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendancesRepository: Repository<Attendance>,
    private readonly internsService: InternsService,
    private readonly supervisorsService: SupervisorsService,
    private readonly systemAuditsService: SystemAuditsService,
    private readonly userNotificationsGateway: UserNotificationsGateway,
  ) {}

  async registerEntry(internCode: string, timestamp: Date) {
    const existingIntern =
      await this.internsService.findOneByInternCode(internCode);
    // console.log(existingIntern.user);

    // Validacion de que registre asistencias solo en su periodo
    validateAttendancePeriod(existingIntern, timestamp);

    const attendanceDate = timestamp.toDateString();
    const entryTime = timestamp.toTimeString().split(' ')[0];

    // if (timeexistingIntern.internshipStart)
    const existingRecord = await this.attendancesRepository.findOne({
      where: { intern: existingIntern, attendanceDate },
    });
    if (existingRecord) {
      if (!existingRecord.exitTime) {
        throw new BadRequestException(
          'Entry has already been registered for today.',
        );
      } else {
        throw new BadRequestException(
          'There is already a complete attendance record for today.',
        );
      }
    }

    const exitDeadline = await this.getScheduledExitTime(internCode, timestamp);
    try {
      if (entryTime > exitDeadline) {
        await this.attendancesRepository.save({
          attendanceDate,
          entryTime: null,
          exitTime: null,
          intern: existingIntern,
          attendanceStatuses: AttendanceStatuses.ABSENCE,
          worked_hours: null,
          isLate: true,
        });
        this.userNotificationsGateway.emitEvent('attendance', {
          internFullName: `${existingIntern.user.firstName} ${existingIntern.user.lastName}`,
          internInternshipDepartment: existingIntern.internshipDepartment.name,
          attendanceType: AttendanceStatuses.ABSENCE,
          notificationDate: new Date(),
        });
        return 'You have registered an absence, please consult your supervisor or administrator.';
      }
    } catch (error) {
      handleInternalServerError(error.message);
    }

    const entryDeadline = await this.getScheduledEntryTime(
      internCode,
      timestamp,
    );
    if (!entryDeadline)
      throw new NotFoundException("You don't have schedules today.");

    const [scheduledHours, scheduledMinutes] = entryDeadline
      .split(':')
      .map(Number);
    const scheduledEntryDateTime = new Date(timestamp);
    scheduledEntryDateTime.setHours(scheduledHours, scheduledMinutes, 0);

    const minutesDifference = differenceInMinutes(
      timestamp,
      scheduledEntryDateTime,
    );
    // console.log('registerEntry', { minutesDifference });
    // Validamos los minutos de tolerancia de entrada
    if (minutesDifference >= 15) {
      try {
        await this.attendancesRepository.save({
          attendanceDate,
          entryTime,
          exitTime: null,
          intern: existingIntern,
          attendanceStatuses: AttendanceStatuses.DELAYED_ENTRY,
          isLate: true,
        });
        this.userNotificationsGateway.emitEvent('attendance', {
          internFullName: `${existingIntern.user.firstName} ${existingIntern.user.lastName}`,
          internInternshipDepartment: existingIntern.internshipDepartment.name,
          attendanceType: `${AttendanceStatuses.DELAYED_ENTRY}. ${minutesDifference - 15} MINUTOS DE RETRASO`,
          notificationDate: new Date(),
        });
        return 'You have registered a delayed attendance.';
      } catch (error) {
        handleInternalServerError(error.message);
      }
    }

    try {
      await this.attendancesRepository.save({
        attendanceDate,
        entryTime,
        exitTime: null,
        intern: existingIntern,
        attendanceStatuses: AttendanceStatuses.ENTRY,
      });
      this.userNotificationsGateway.emitEvent('attendance', {
        internFullName: `${existingIntern.user.firstName} ${existingIntern.user.lastName}`,
        internInternshipDepartment: existingIntern.internshipDepartment.name,
        attendanceType: AttendanceStatuses.ENTRY,
        notificationDate: new Date(),
      });
      return 'You have recorded normal attendance.';
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async registerExit(internCode: string, timestamp: Date) {
    const existingIntern =
      await this.internsService.findOneByInternCode(internCode);
    const attendanceDate = timestamp.toDateString();
    const exitTime = timestamp.toTimeString().split(' ')[0];

    const attendanceRecord = await this.attendancesRepository.findOne({
      where: { intern: existingIntern, attendanceDate },
    });

    if (
      !attendanceRecord ||
      (attendanceRecord.attendanceStatuses !== AttendanceStatuses.ENTRY &&
        attendanceRecord.attendanceStatuses !==
          AttendanceStatuses.DELAYED_ENTRY)
    )
      throw new BadRequestException('There is no entry registered for today.');

    const scheduledExitTime = await this.getScheduledExitTime(
      internCode,
      timestamp,
    );
    if (!scheduledExitTime)
      throw new NotFoundException("You don't have schedules today.");
    const [scheduledHours, scheduledMinutes] = scheduledExitTime
      .split(':')
      .map(Number);
    const scheduledExitDateTime = new Date(timestamp);
    scheduledExitDateTime.setHours(scheduledHours, scheduledMinutes, 0);

    const minutesDifference = differenceInMinutes(
      timestamp,
      scheduledExitDateTime,
    );
    // console.log('registerExit', { minutesDifference });
    if (minutesDifference <= 0) {
      attendanceRecord.exitTime = exitTime;
      attendanceRecord.attendanceStatuses =
        AttendanceStatuses.EARLY_EXIT_ATTENDANCE;
      attendanceRecord.worked_hours = calculateWorkedHoursInHHMMSS(
        attendanceRecord.entryTime,
        exitTime,
      );
      try {
        await this.attendancesRepository.save(attendanceRecord);
        this.userNotificationsGateway.emitEvent('attendance', {
          internFullName: `${existingIntern.user.firstName} ${existingIntern.user.lastName}`,
          internInternshipDepartment: existingIntern.internshipDepartment.name,
          attendanceType: AttendanceStatuses.EARLY_EXIT_ATTENDANCE,
          notificationDate: new Date(),
        });
        return 'You have registered an attendance with an early exit.';
      } catch (error) {
        handleInternalServerError(error.message);
      }
    } else {
      attendanceRecord.exitTime = exitTime;
      attendanceRecord.attendanceStatuses =
        AttendanceStatuses.NORMAL_ATTENDANCE;
      attendanceRecord.worked_hours = calculateWorkedHoursInHHMMSS(
        attendanceRecord.entryTime,
        exitTime,
      );
      try {
        await this.attendancesRepository.save(attendanceRecord);
        this.userNotificationsGateway.emitEvent('attendance', {
          internFullName: `${existingIntern.user.firstName} ${existingIntern.user.lastName}`,
          internInternshipDepartment: existingIntern.internshipDepartment.name,
          attendanceType: AttendanceStatuses.NORMAL_ATTENDANCE,
          notificationDate: new Date(),
        });
        return 'You have registered an attendance with a regular exit.';
      } catch (error) {
        handleInternalServerError(error.message);
      }
    }
  }

  // Validar entrada del practicante, solo si tiene asignado horario de entrada para ese dia
  async getScheduledEntryTime(internCode: string, timestamp: Date) {
    const { internSchedule } =
      await this.internsService.findOneByInternCode(internCode);
    const dayOfWeek = timestamp.getDay();
    if (!internSchedule)
      throw new NotFoundException(
        'The intern has not been assigned a schedule yet. Please assign a schedule for this intern.',
      );

    switch (dayOfWeek) {
      case 0:
        return internSchedule.sundayIn;
      case 1:
        return internSchedule.mondayIn;
      case 2:
        return internSchedule.tuesdayIn;
      case 3:
        return internSchedule.wednesdayIn;
      case 4:
        return internSchedule.thursdayIn;
      case 5:
        return internSchedule.fridayIn;
      case 6:
        return internSchedule.saturdayIn;
      default:
        return null;
    }
  }

  async getScheduledExitTime(internCode: string, timestamp: Date) {
    const { internSchedule } =
      await this.internsService.findOneByInternCode(internCode);
    const dayOfWeek = timestamp.getDay();
    if (!internSchedule)
      throw new NotFoundException(
        'The intern has not been assigned a schedule yet. Please assign a schedule for this intern.',
      );

    switch (dayOfWeek) {
      case 0:
        return internSchedule.sundayOut;
      case 1:
        return internSchedule.mondayOut;
      case 2:
        return internSchedule.tuesdayOut;
      case 3:
        return internSchedule.wednesdayOut;
      case 4:
        return internSchedule.thursdayOut;
      case 5:
        return internSchedule.fridayOut;
      case 6:
        return internSchedule.saturdayOut;
      default:
        return null;
    }
  }

  async findAttendanceRecord(internCode: string, attendanceDate: string) {
    const intern = await this.internsService.findOneByInternCode(internCode);
    return this.attendancesRepository.findOne({
      where: { intern, attendanceDate },
    });
  }

  async findAll({ userId, role }: IRequestUser) {
    let allAttendances: Attendance[];
    if (role === UserRole.SUPERVISOR) {
      const { department } = await this.supervisorsService.findByUser(userId);
      allAttendances = await this.attendancesRepository.find({
        where: { intern: { internshipDepartment: department } },
      });
    } else {
      allAttendances = await this.attendancesRepository.find();
    }
    const filteredAttendances = allAttendances.map((attendance) => {
      // filtramos todos los datos innecesarios del practicante para no sobrecargar al front
      const {
        bloodType,
        phone,
        address,
        schoolEnrollment,
        internshipStart,
        internshipEnd,
        internshipDuration,
        status,
        totalInternshipCompletion,
        career,
        department,
        institution,
        property,
        emergencyContacts,
        internComents,
        internFiles,
        internSchedule,
        ...filteredIntern
      } = attendance.intern;
      // ahora filtramos todos los datos innecesarios del lugar de practicas
      const { supervisors, ...filteredInternshipDepartment } =
        filteredIntern.internshipDepartment;

      //retornamos data limpia
      return {
        ...attendance,
        intern: {
          ...filteredIntern,
          internshipDepartment: filteredInternshipDepartment,
        },
      };
    });
    return filteredAttendances;
  }

  async findOne(id: string) {
    const attendance = await this.attendancesRepository.findOne({
      where: { id },
    });
    if (!attendance)
      throw new NotFoundException(`Intern with id: ${id} not found.`);

    const {
      bloodType,
      phone,
      address,
      schoolEnrollment,
      internshipStart,
      internshipEnd,
      internshipDuration,
      status,
      totalInternshipCompletion,
      career,
      department,
      institution,
      property,
      emergencyContacts,
      internComents,
      internFiles,
      internSchedule,
      ...filteredIntern
    } = attendance.intern;

    const { supervisors, ...filteredInternshipDepartment } =
      filteredIntern.internshipDepartment;

    return {
      ...attendance,
      intern: {
        ...filteredIntern,
        internshipDepartment: filteredInternshipDepartment,
      },
    };
  }

  async update(
    id: string,
    updateAttendanceDto: UpdateAttendanceDto,
    { fullName, role, userId: userReq }: IRequestUser,
  ) {
    const existingAttendace = await this.findOne(id);
    if (updateAttendanceDto.entryTime)
      existingAttendace.entryTime = updateAttendanceDto.entryTime;
    if (updateAttendanceDto.exitTime)
      existingAttendace.exitTime = updateAttendanceDto.exitTime;
    if (updateAttendanceDto.attendanceStatuses)
      existingAttendace.attendanceStatuses =
        updateAttendanceDto.attendanceStatuses;
    if (updateAttendanceDto.isLate !== undefined)
      existingAttendace.isLate = updateAttendanceDto.isLate;
    existingAttendace.worked_hours = calculateWorkedHoursInHHMMSS(
      updateAttendanceDto.entryTime,
      updateAttendanceDto.exitTime,
    );

    try {
      const updatedAttendance =
        await this.attendancesRepository.save(existingAttendace);
      await this.systemAuditsService.createSystemAudit(
        { id: userReq, fullName, role },
        "SUCCESSFUL UPDATE INTERN'S ATTENDACE",
        updatedAttendance,
        'SUCCESS',
      );
      return updatedAttendance;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        { id: userReq, fullName, role },
        "FAILED TO UPDATE INTERN'S ATTENDACE",
        updateAttendanceDto,
        'FAILED',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async resetExit(
    id: string,
    { fullName, role, userId: userReq }: IRequestUser,
  ) {
    const existingAttendace = await this.findOne(id);
    existingAttendace.exitTime = null;
    existingAttendace.attendanceStatuses = AttendanceStatuses.ENTRY;
    try {
      const resetInternExit =
        await this.attendancesRepository.save(existingAttendace);
      await this.systemAuditsService.createSystemAudit(
        { id: userReq, fullName, role },
        "SUCCESSFUL RESET OF THE INTERN'S EXIT TIME",
        resetInternExit,
        'SUCCESS',
      );
      return resetInternExit;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        { id: userReq, fullName, role },
        "FAILED TO RESET OF THE INTERN'S EXIT TIME",
        `${existingAttendace.exitTime}, ${existingAttendace.attendanceStatuses}`,
        'FAILED',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  // remove(id: string) {
  //   return `This action removes a #${id} attendance`;
  // }
}
