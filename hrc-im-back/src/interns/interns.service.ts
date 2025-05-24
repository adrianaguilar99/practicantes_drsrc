import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInternDto } from './dto/create-intern.dto';
import { UpdateInternDto } from './dto/update-intern.dto';
import { Repository } from 'typeorm';
import { Intern } from './entities/intern.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentsService } from 'src/departments/departments.service';
import { UserRole } from 'src/common/enums';
import { UsersService } from 'src/users/users.service';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';
import { CareersService } from 'src/careers/careers.service';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { PropertiesService } from 'src/properties/properties.service';
import { IRequestUser } from 'src/common/interfaces';
import { handleInternalServerError } from 'src/common/utils';
import { SupervisorsService } from 'src/supervisors/supervisors.service';
import { calculateTotalWorkedTime, internshipCalculator } from './helpers';

@Injectable()
export class InternsService {
  constructor(
    @InjectRepository(Intern)
    private readonly internsRepository: Repository<Intern>,
    private readonly careersService: CareersService,
    private readonly departmentsService: DepartmentsService,
    private readonly institutionsService: InstitutionsService,
    private readonly propertiesService: PropertiesService,
    private readonly supervisorsService: SupervisorsService,
    private readonly systemAuditsService: SystemAuditsService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createInternDto: CreateInternDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    const user = await this.usersService.findOne(createInternDto.userId);
    if (user.userRole !== UserRole.INTERN) {
      throw new ConflictException(
        `User with ID ${createInternDto.userId} does not have the required role to be a intern.`,
      );
    }

    if (createInternDto.departmentId) {
      if (
        createInternDto.schoolEnrollment ||
        createInternDto.institutionId ||
        createInternDto.careerId
      ) {
        throw new ConflictException(
          'If department is provided, school enrollment, institution, and career cannot be provided.',
        );
      }
      // No generar codigo de practicante externo si departmentId está presente
      createInternDto.externalInternCode = null;

      // Asegurarse de que se pase un internalInternCode manualmente si departmentId está presente
      if (!createInternDto.internalInternCode) {
        throw new ConflictException(
          'If department is provided, internal intern code must be assigned.',
        );
      }
    } else {
      // No crear el codigo de practicante interno si no se pasa departmentId
      createInternDto.internalInternCode = null;

      // Generar codigo de practicante externo si no se proporciona departmentId
      createInternDto.externalInternCode =
        await this.generateUniqueInternCode();
    }

    /** Buscamos las relaciones, en caso de que se exista o se este se agregando
     * en el cuerpo de la solicitud, se agrega al nuevo registro
     * Esto se aplica a: Carrera, Departamento e Institucion  */
    const career = createInternDto.careerId
      ? await this.careersService.findOne(createInternDto.careerId)
      : null;

    const department = createInternDto.departmentId
      ? await this.departmentsService.findOne(createInternDto.departmentId)
      : null;

    const internshipDepartment = await this.departmentsService.findOne(
      createInternDto.internshipDepartmentId,
    );

    const institution = createInternDto.institutionId
      ? await this.institutionsService.findOne(createInternDto.institutionId)
      : null;

    const property = await this.propertiesService.findOne(
      createInternDto.propertyId,
    );

    const existingIntern = await this.internsRepository.findOne({
      where: { user },
    });

    if (existingIntern) {
      throw new ConflictException(
        `User with ID ${createInternDto.userId} is already associated with an intern.`,
      );
    }

    const newIntern = this.internsRepository.create({
      ...createInternDto,
      career,
      department,
      internshipDepartment,
      institution,
      property,
      user,
    });
    try {
      const createdIntern = await this.internsRepository.save(newIntern);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'CREATE INTERN',
        {
          id: createdIntern.id,
          data: `${createdIntern.user.firstName} ${createdIntern.user.lastName}`,
        },
        'SUCCESS',
      );
      return createdIntern;
    } catch (error) {
      await this.usersService.physicalRemove(user.id, {
        fullName,
        role,
        userId,
      });
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO CREATE INTERN',
        createInternDto,
        'FAILED TO CREATE INTERN',
        error.message,
      );
      if (error.code === '23505')
        throw new ConflictException(
          'A resource with the same data already exists.',
        );
      if (error instanceof BadRequestException) throw error;
      handleInternalServerError(error.message);
    }
  }

  async findAll({ userId, role }: IRequestUser) {
    let allInterns: Intern[];
    if (role === UserRole.SUPERVISOR) {
      const { department } = await this.supervisorsService.findByUser(userId);
      allInterns = await this.internsRepository.find({
        relations: { attendances: true },
        where: { internshipDepartment: department },
      });
    } else {
      allInterns = await this.internsRepository.find({
        relations: { attendances: true },
      });
    }

    const filteredInterns = allInterns.map((intern) => {
      const filteredAttendances = intern.attendances.map((attendance) => {
        const {
          attendanceDate,
          attendanceStatuses,
          entryTime,
          exitTime,
          intern,
          isLate,
          ...workedHours
        } = attendance;
        return workedHours;
      });
      return {
        ...intern,
        attendances: filteredAttendances,
      };
    });
    return Promise.all(
      filteredInterns.map(async (intern) => this.updateCompletion(intern)),
    );
  }

  async findOne(id: string) {
    const intern = await this.internsRepository.findOne({
      where: { id },
    });
    if (!intern)
      throw new NotFoundException(`Intern with id: ${id} not found.`);

    return intern;
  }

  async findOneByUserId(id: string) {
    const intern = await this.internsRepository.findOne({
      where: { user: { id } },
    });
    if (!intern)
      throw new NotFoundException(`Intern with id: ${id} not found.`);

    return this.updateCompletion(intern);
  }

  async findOneByInternCode(code: string) {
    const intern = await this.internsRepository.findOne({
      where: [{ internalInternCode: code }, { externalInternCode: code }],
    });
    if (!intern)
      throw new NotFoundException(`Intern with code: ${code} not found.`);

    return intern;
  }

  async countInternsByInternshipDepartment(): Promise<Record<string, number>> {
    const result = await this.internsRepository
      .createQueryBuilder('intern')
      .innerJoin('intern.internshipDepartment', 'internshipDepartment')
      .select('internshipDepartment.name', 'departmentName')
      .addSelect('COUNT(intern.id)', 'internCount')
      .groupBy('internshipDepartment.name')
      .getRawMany();

    const departmentCount: Record<string, number> = {};
    result.forEach((row) => {
      departmentCount[row.departmentName] = Number(row.internCount);
    });

    return departmentCount;
  }

  async update(
    id: string,
    updateInternDto: UpdateInternDto,
    { fullName, role, userId: userReq }: IRequestUser,
  ) {
    const existingIntern = await this.findOne(id);

    // Validación de exclusión mutua entre departmentId y otros campos
    if (updateInternDto.departmentId) {
      /**
       * Verificar si ya existen valores para externalInternCode,
       * schoolEnrollment, institutionId o careerId en el registro existente
       */
      if (
        existingIntern.externalInternCode ||
        existingIntern.schoolEnrollment ||
        existingIntern.institution ||
        existingIntern.career
      )
        throw new ConflictException(
          'Cannot assign departmentId because externalInternCode, schoolEnrollment, institutionId, or careerId already exist for this intern.',
        );
      existingIntern.externalInternCode = null;

      if (!updateInternDto.internalInternCode)
        throw new ConflictException(
          'If departmentId is provided, internalInternCode must be manually assigned.',
        );
      existingIntern.internalInternCode = updateInternDto.internalInternCode;
    } else {
      /**
       * Si no se esta pasando el departamento pero si existe el departamento es necesario que venga el internal code
       */
      if (existingIntern.department) {
        if (!updateInternDto.internalInternCode)
          throw new ConflictException(
            'If the intern is already assigned a department, internalInternCode must be assigned manually.',
          );
        existingIntern.internalInternCode = updateInternDto.internalInternCode;
      } else {
        /**
         * Si no se proporciona el departamento en el cuerpo y tampoco
         * existe registro de departamento en el intern
         * entonces limpiamos el codigo internal y validamos el external
         */
        existingIntern.internalInternCode = null;

        if (!updateInternDto.externalInternCode)
          throw new ConflictException('Please enter the externalInternCode');
        // El updataDto valida que sea de 6 digitos
        existingIntern.externalInternCode = updateInternDto.externalInternCode;
      }
    }
    // Si ya existe un departmentId, no permitir actualizar externalInternCode schoolEnrollment, institutionId, y careerId
    if (
      existingIntern.department &&
      (updateInternDto.externalInternCode ||
        updateInternDto.schoolEnrollment ||
        updateInternDto.institutionId ||
        updateInternDto.careerId)
    )
      throw new ConflictException(
        'Cannot update externalInternCode, schoolEnrollment, institutionId, or careerId because departmentId is already assigned to this intern.',
      );

    /** Al igual que en la creacion, se verifica si alguno de las propiedades
     * si estan mandando en el cuerpo de la peticion, en dado caso de que se manden
     * y existan se actualiza el registro */
    if (updateInternDto.bloodType)
      existingIntern.bloodType = updateInternDto.bloodType;
    if (updateInternDto.schoolEnrollment)
      existingIntern.schoolEnrollment = updateInternDto.schoolEnrollment;
    if (updateInternDto.address)
      existingIntern.address = updateInternDto.address;
    if (updateInternDto.phone) existingIntern.phone = updateInternDto.phone;
    if (updateInternDto.status) existingIntern.status = updateInternDto.status;
    if (updateInternDto.internshipStart)
      existingIntern.internshipStart = updateInternDto.internshipStart;
    if (updateInternDto.internshipEnd)
      existingIntern.internshipEnd = updateInternDto.internshipEnd;
    if (updateInternDto.internshipDuration)
      existingIntern.internshipDuration = updateInternDto.internshipDuration;

    if (updateInternDto.careerId) {
      const career = await this.careersService.findOne(
        updateInternDto.careerId,
      );
      existingIntern.career = career;
    }

    if (updateInternDto.departmentId) {
      const department = await this.departmentsService.findOne(
        updateInternDto.departmentId,
      );
      existingIntern.department = department;
    }

    if (updateInternDto.internshipDepartmentId) {
      const internshipDepartment = await this.departmentsService.findOne(
        updateInternDto.internshipDepartmentId,
      );
      existingIntern.internshipDepartment = internshipDepartment;
    }

    if (updateInternDto.institutionId) {
      const institution = await this.institutionsService.findOne(
        updateInternDto.institutionId,
      );
      existingIntern.institution = institution;
    }

    if (updateInternDto.propertyId) {
      const property = await this.propertiesService.findOne(
        updateInternDto.propertyId,
      );
      existingIntern.property = property;
    }

    try {
      const updatedIntern = await this.internsRepository.save(existingIntern);
      await this.systemAuditsService.createSystemAudit(
        { id: userReq, fullName, role },
        'UPDATE INTERN',
        {
          id,
          data: `${updatedIntern.user.firstName} ${updatedIntern.user.lastName}`,
        },
        'SUCCESS',
      );
      return updatedIntern;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        { id: userReq, fullName, role },
        'FAILED TO UPDATE INTERN',
        updateInternDto,
        'FAILED',
        error.message,
      );
      if (error instanceof BadRequestException) throw error;
      handleInternalServerError(error.message);
    }
  }

  async remove(id: string, { fullName, role, userId }: IRequestUser) {
    const existingIntern = await this.findOne(id);
    try {
      const removedIntern = await this.internsRepository.delete(id);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'DELETE INTERN',
        {
          id,
          data: `${existingIntern.user.firstName} ${existingIntern.user.lastName}`,
        },
        'SUCCESS',
      );
      return removedIntern.affected;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO DELETE INTERN',
        {
          id,
          data: `${existingIntern.user.firstName} ${existingIntern.user.lastName}`,
        },
        'FAILED TO DELETE INTERN',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  private async generateUniqueInternCode(): Promise<string> {
    let code: string;
    let codeExists: boolean;

    do {
      // Genera un número aleatorio entre 500000 y 999999
      code = Math.floor(500000 + Math.random() * 500000).toString();
      codeExists = !!(await this.internsRepository.findOne({
        where: [{ externalInternCode: code }, { internalInternCode: code }],
      }));
    } while (codeExists);

    return code;
  }

  private async updateCompletion(intern: any) {
    intern.totalInternshipCompletion = internshipCalculator(
      intern.internshipDuration,
      intern.attendances,
    );
    intern.totalWorkedTime = calculateTotalWorkedTime(intern.attendances);
    try {
      return this.internsRepository.save(intern);
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }
}
