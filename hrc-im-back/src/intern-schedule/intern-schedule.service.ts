import { ConflictException, Injectable } from '@nestjs/common';
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

    const { intern, ...data } = internScheduleToCreate;
    try {
      const createdInternSchedule = await this.internScheduleRepository.save(
        internScheduleToCreate,
      );
      console.log(Array(data).map((v) => v));

      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'CREATE INTERN SCHEDULE',
        {
          id: createdInternSchedule.intern.id,
          data,
        },
        'SUCCESS',
      );

      return createdInternSchedule;
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException(
          "A record already exists containing the intern's schedule. Only one can be created.",
        );
      handleInternalServerError(error.message);
    }
  }

  async findAll() {
    return `This action returns all internSchedule`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} internSchedule`;
  }

  async update(
    id: string,
    updateInternScheduleDto: UpdateInternScheduleDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    return `This action updates a #${id} internSchedule`;
  }

  async remove(id: string, { fullName, role, userId }: IRequestUser) {
    return `This action removes a #${id} internSchedule`;
  }
}

// TODO: Creacion terminada implementar auditoria y terminar los demas servicios
