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
import { RESOURCE_NAME_ALREADY_EXISTS } from 'src/common/constants/constants';
import { SupervisorsService } from 'src/supervisors/supervisors.service';
import { convertToInterval } from './helpers';

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
    if (createInternDto.departmentId) {
      if (
        createInternDto.schoolEnrollment ||
        createInternDto.institutionId ||
        createInternDto.careerId
      ) {
        throw new ConflictException(
          'If department is provided, schoolEnrollment, institution, and career cannot be provided.',
        );
      }
    }

    const user = await this.usersService.findOne(createInternDto.userId);
    if (user.userRole !== UserRole.INTERN) {
      throw new ConflictException(
        `User with ID ${createInternDto.userId} does not have the required role to be a intern.`,
      );
    }

    // Si todo se valida correctamente continuamos con el registro del practicante
    // Asignamos un codigo unico para el practicante
    const internCode = await this.generateUniqueInternCode();

    // Convertimos el tiempo de practicas a un formato valido "INTERVAL"
    const internshipDurationInterval = convertToInterval(
      createInternDto.internshipDuration,
    );

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
      internCode,
      internshipDuration: internshipDurationInterval,
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
      await this.usersService.physicalRemove(newIntern.user.id, {
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
        { id: null, data: `${user.firstName} ${user.lastName}` },
        'FAILED TO CREATE INTERN',
        error.message,
      );
      if (error.code === '23505')
        throw new ConflictException(`${RESOURCE_NAME_ALREADY_EXISTS}`);
      if (error instanceof BadRequestException) throw error;
      handleInternalServerError(error.message);
    }
  }

  async findAll({ userId, role }: IRequestUser) {
    let allInterns: Intern[];
    if (role === UserRole.SUPERVISOR) {
      const { department } = await this.supervisorsService.findByUser(userId);
      allInterns = await this.internsRepository.find({
        where: { internshipDepartment: department },
      });
    } else {
      allInterns = await this.internsRepository.find();
    }
    return allInterns;
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

    return intern;
  }

  async update(
    id: string,
    {
      address,
      bloodType,
      careerId,
      departmentId,
      institutionId,
      internshipDepartmentId,
      internshipEnd,
      internshipStart,
      entryTime,
      exitTime,
      internshipDuration,
      phone,
      propertyId,
      schoolEnrollment,
      status,
      userId,
    }: UpdateInternDto,
    { fullName, role, userId: userReq }: IRequestUser,
  ) {
    const existingIntern = await this.findOne(id);

    // console.log(existingIntern);

    // Bloqueamos que se actualicen campos no permitidos
    if (userId) {
      await this.systemAuditsService.createSystemAudit(
        { id: userReq, fullName, role },
        'TRY TO UPDATE INTERN',
        {
          id,
          data: `${existingIntern.user.firstName} ${existingIntern.user.lastName}`,
        },
        'FAILED TO UPDATE INTERN',
        'Attempted to update fields that are not allowed: User',
      );
      throw new ConflictException('You are not allowed to update: User.');
    }

    // Validación de exclusión mutua entre departmentId y otros campos
    if (departmentId) {
      // Verificar si ya existen valores para schoolEnrollment, institutionId o careerId en el registro existente
      if (
        existingIntern.schoolEnrollment ||
        existingIntern.institution ||
        existingIntern.career
      )
        throw new ConflictException(
          'Cannot assign departmentId because schoolEnrollment, institutionId, or careerId already exist for this intern.',
        );

      // También verificar que no se envíen en la misma solicitud
      if (schoolEnrollment || institutionId || careerId)
        throw new ConflictException(
          'If departmentId is provided, schoolEnrollment, institutionId, and careerId cannot be provided.',
        );
    }

    // Si ya existe un departmentId, no permitir actualizar schoolEnrollment, institutionId, y careerId
    if (
      existingIntern.department &&
      (schoolEnrollment || institutionId || careerId)
    )
      throw new ConflictException(
        'Cannot update schoolEnrollment, institutionId, or careerId because departmentId is already assigned to this intern.',
      );

    /** Al igual que en la creacion, se verifica si alguno de las propiedades
     * si estan mandando en el cuerpo de la peticion, en dado caso de que se manden
     * y existan se actualiza el registro */
    if (bloodType) existingIntern.bloodType = bloodType;
    if (schoolEnrollment) existingIntern.schoolEnrollment = schoolEnrollment;
    if (address) existingIntern.address = address;
    if (phone) existingIntern.phone = phone;
    if (status) existingIntern.status = status;
    if (internshipStart) existingIntern.internshipStart = internshipStart;
    if (internshipEnd) existingIntern.internshipEnd = internshipEnd;
    if (entryTime) existingIntern.entryTime = entryTime;
    if (exitTime) existingIntern.exitTime = exitTime;
    if (internshipDuration)
      existingIntern.internshipDuration = convertToInterval(internshipDuration);

    if (careerId) {
      const career = await this.careersService.findOne(careerId);
      existingIntern.career = career;
    }

    if (departmentId) {
      const department = await this.departmentsService.findOne(departmentId);
      existingIntern.department = department;
    }

    if (internshipDepartmentId) {
      const internshipDepartment = await this.departmentsService.findOne(
        internshipDepartmentId,
      );
      existingIntern.internshipDepartment = internshipDepartment;
    }

    if (institutionId) {
      const institution = await this.institutionsService.findOne(institutionId);
      existingIntern.institution = institution;
    }

    if (propertyId) {
      const property = await this.propertiesService.findOne(propertyId);
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
        {
          id,
          data: `${existingIntern.user.firstName} ${existingIntern.user.lastName}`,
        },
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
      code = Math.floor(100000 + Math.random() * 900000).toString();
      codeExists = !!(await this.internsRepository.findOne({
        where: { internCode: code },
      }));
    } while (codeExists);

    return code;
  }
}
