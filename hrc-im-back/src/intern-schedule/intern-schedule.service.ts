import { Injectable } from '@nestjs/common';
import { CreateInternScheduleDto } from './dto/create-intern-schedule.dto';
import { UpdateInternScheduleDto } from './dto/update-intern-schedule.dto';
import { IRequestUser } from 'src/common/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { InternSchedule } from './entities/intern-schedule.entity';
import { Repository } from 'typeorm';
import { InternsService } from 'src/interns/interns.service';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';

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
  ) {}

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
