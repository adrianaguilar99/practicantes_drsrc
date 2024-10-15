import {
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
    // Buscamos las relaciones, en caso de que existan se agregan al nuevo registro
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

    const internCode = await this.generateUniqueInternCode();

    const newIntern = this.internsRepository.create({
      ...createInternDto,
      career,
      department,
      internshipDepartment,
      institution,
      property,
      user,
      internCode,
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
          name: `${createdIntern.user.firstName} ${createdIntern.user.lastName}`,
        },
        'SUCCESS',
      );
      return createdIntern;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO CREATE INTERN',
        { id: null, name: `${user.firstName} ${user.lastName}` },
        'FAILED TO CREATE INTERN',
        error.message,
      );
      if (error.code === '23505') {
        throw new ConflictException(`${RESOURCE_NAME_ALREADY_EXISTS}`);
      }
      handleInternalServerError(error.message);
    }
  }

  async findAll({ userId, role }: IRequestUser) {
    let allInterns: Intern[];
    if (role === UserRole.SUPERVISOR) {
      const { department } = await this.supervisorsService.findByUser(userId);
      // console.log(supervisor);
      allInterns = await this.internsRepository.find({
        where: { department },
      });
    } else {
      allInterns = await this.internsRepository.find();
    }
    const safeInterns = allInterns.map((intern) => {
      const { password, hashedRefreshToken, ...safeUser } = intern.user;
      return {
        ...intern,
        user: safeUser,
      };
    });
    return safeInterns;
  }

  async findOne(id: string) {
    const intern = await this.internsRepository.findOne({
      where: { id },
    });
    if (!intern)
      throw new NotFoundException(`Intern with id: ${id} not found.`);

    const { password, hashedRefreshToken, ...safeUser } = intern.user;
    return {
      ...intern,
      user: safeUser,
    };
  }

  async update(
    id: string,
    updateInternDto: UpdateInternDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    const existingIntern = await this.findOne(id);

    // console.log(existingIntern);

    // Bloqueamos que se actualicen campos no permitidos
    const isUnauthorizedUpdate =
      updateInternDto.internshipStart ||
      updateInternDto.internshipEnd ||
      updateInternDto.departmentId ||
      updateInternDto.userId;

    if (isUnauthorizedUpdate) {
      await this.systemAuditsService.createSystemAudit(
        { id: userId, fullName, role },
        'TRY TO UPDATE INTERN',
        {
          id: existingIntern.id,
          name: `${existingIntern.user.firstName} ${existingIntern.user.lastName}`,
        },
        'FAILED TO UPDATE INTERN',
        'Attempted to update fields that are not allowed: internshipStart, internshipEnd, department or user',
      );
      throw new ConflictException(
        'You are not allowed to update: internshipStart, internshipEnd, department or user.',
      );
    }

    // Sacamos los campos permitidos
    const {
      bloodType,
      phone,
      address,
      status,
      schoolEnrollment,
      careerId,
      internshipDepartmentId,
      institutionId,
      propertyId,
    } = updateInternDto;

    if (bloodType) existingIntern.bloodType = bloodType;
    if (schoolEnrollment) existingIntern.schoolEnrollment = schoolEnrollment;
    if (address) existingIntern.address = address.trim();
    if (phone) existingIntern.phone = phone;
    if (status) existingIntern.status = status;

    if (careerId) {
      const career = await this.careersService.findOne(careerId);
      existingIntern.career = career;
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
        { id: userId, fullName, role },
        'UPDATE INTERN',
        {
          id: updatedIntern.id,
          name: `${updatedIntern.user.firstName} ${updatedIntern.user.lastName}`,
        },
        'SUCCESS',
      );
      return updatedIntern;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        { id: userId, fullName, role },
        'FAILED TO UPDATE INTERN',
        {
          id: null,
          name: `${existingIntern.user.firstName} ${existingIntern.user.lastName}`,
        },
        'FAILED',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async remove(id: string, { fullName, role, userId }: IRequestUser) {
    await this.findOne(id);
    try {
      const removedIntern = await this.internsRepository.delete(id);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'DELETE INTERN',
        { id, name: 'Intern' },
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
        { id, name: 'User' },
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
