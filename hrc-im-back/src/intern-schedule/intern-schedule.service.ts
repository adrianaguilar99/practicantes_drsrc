import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInternScheduleDto } from './dto/create-intern-schedule.dto';
import { UpdateInternScheduleDto } from './dto/update-intern-schedule.dto';
import { IRequestUser } from 'src/common/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { InternSchedule } from './entities/intern-schedule.entity';
import { Repository } from 'typeorm';
import { InternsService } from 'src/interns/interns.service';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';
import { handleInternalServerError } from 'src/common/utils';

@Injectable()
export class InternScheduleService {
  constructor(
    @InjectRepository(InternSchedule)
    private readonly internScheduleRepository: Repository<InternSchedule>,
    private readonly internsService: InternsService,
    private readonly systemAuditsService: SystemAuditsService,
  ) {}

  async create(
    createInternScheduleDto: CreateInternScheduleDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    // Validamos que exista un practicante
    const existingIntern = await this.internsService.findOne(
      createInternScheduleDto.internId,
    );

    const internScheduleToCreate = this.internScheduleRepository.create({
      ...createInternScheduleDto,
      intern: existingIntern,
    });
    try {
      const createdInternSchedule = await this.internScheduleRepository.save(
        internScheduleToCreate,
      );
      const { intern, ...data } = createdInternSchedule;
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'CREATE INTERN SCHEDULE',
        data,
        'SUCCESS',
      );
      return createdInternSchedule;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO CREATE INTERN SCHEDULE',
        createInternScheduleDto,
        'FAILED TO CREATE INTERN SCHEDULE',
        error.message,
      );
      if (error.code === '23505')
        throw new ConflictException(
          "A record already exists containing the intern's schedule. Only one can be created.",
        );
      handleInternalServerError(error.message);
    }
  }

  async findAll() {
    try {
      const allInternSchedules = await this.internScheduleRepository.find();
      return allInternSchedules;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const existingInternSchedule =
        await this.internScheduleRepository.findOne({
          where: { id },
        });
      if (!existingInternSchedule)
        throw new NotFoundException('Intern schedule not found.');

      return existingInternSchedule;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleInternalServerError(error.message);
    }
  }

  async findOneByIntern(id: string) {
    try {
      const existingInternSchedule =
        await this.internScheduleRepository.findOne({
          where: { intern: { id } },
          relations: {
            intern: true,
          },
        });
      if (!existingInternSchedule)
        throw new NotFoundException('Intern schedule not found.');

      return existingInternSchedule;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleInternalServerError(error.message);
    }
  }

  async update(
    id: string,
    updateInternScheduleDto: UpdateInternScheduleDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    await this.findOne(id); // Validamos que exista el horario del practicante
    try {
      const internScheduleToUpdate =
        await this.internScheduleRepository.preload({
          id,
          ...updateInternScheduleDto,
        });
      const updatedInternSchedule = await this.internScheduleRepository.save(
        internScheduleToUpdate,
      );
      const { intern, ...data } = updatedInternSchedule;
      await this.systemAuditsService.createSystemAudit(
        { id: userId, fullName, role },
        'UPDATE INTERN SCHEDULE',
        data,
        'SUCCESS',
      );
      return updatedInternSchedule;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        { id: userId, fullName, role },
        'FAILED UPDATE INTERN SCHEDULE',
        updateInternScheduleDto,
        'FAILED',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async remove(id: string, { fullName, role, userId }: IRequestUser) {
    const existingInternSchedule = await this.findOne(id);
    const { intern, ...data } = existingInternSchedule;
    try {
      const deletedInternSchedule =
        await this.internScheduleRepository.delete(id);

      await this.systemAuditsService.createSystemAudit(
        { id: userId, fullName, role },
        'DELETE INTERN SCHEDULE',
        data,
        'SUCCESS',
      );

      return deletedInternSchedule.affected;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        { id: userId, fullName, role },
        'FAILED DELETE INTERN SCHEDULE',
        data,
        'FAILED',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }
}
