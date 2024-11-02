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
import { AttendanceStatuses } from 'src/common/enums';
import {
  calculateWorkedHoursInHHMMSS,
  validateAttendancePeriod,
} from './helpers';
import { handleInternalServerError } from 'src/common/utils';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendancesRepository: Repository<Attendance>,
    private readonly internsService: InternsService,
  ) {}

  async registerEntry(internCode: string, timestamp: Date) {
    const existingIntern =
      await this.internsService.findOneByInternCode(internCode);

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
        return;
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
          attendanceStatuses: AttendanceStatuses.ENTRY,
          isLate: true,
        });
        return;
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
      attendanceRecord.attendanceStatuses !== AttendanceStatuses.ENTRY
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
    console.log('registerExit', { minutesDifference });
    if (minutesDifference <= 0) {
      attendanceRecord.exitTime = exitTime;
      attendanceRecord.attendanceStatuses =
        AttendanceStatuses.EARLY_EXIT_ASSISTANCE;
      attendanceRecord.worked_hours = calculateWorkedHoursInHHMMSS(
        attendanceRecord.entryTime,
        exitTime,
      );
    } else {
      attendanceRecord.exitTime = exitTime;
      attendanceRecord.attendanceStatuses =
        AttendanceStatuses.SUCCESSFUL_ASSISTANCE;
      attendanceRecord.worked_hours = calculateWorkedHoursInHHMMSS(
        attendanceRecord.entryTime,
        exitTime,
      );
    }
    try {
      await this.attendancesRepository.save(attendanceRecord);
    } catch (error) {
      handleInternalServerError(error.message);
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

  async findAll() {
    return `This action returns all attendances`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} attendance`;
  }

  async update(id: string, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  // remove(id: string) {
  //   return `This action removes a #${id} attendance`;
  // }
}
