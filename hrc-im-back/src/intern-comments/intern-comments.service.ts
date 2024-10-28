import { Injectable } from '@nestjs/common';
import { CreateInternCommentDto } from './dto/create-intern-comment.dto';
import { UpdateInternCommentDto } from './dto/update-intern-comment.dto';
import { IRequestUser } from 'src/common/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { InternComment } from './entities/intern-comment.entity';
import { Repository } from 'typeorm';
import { SupervisorsService } from 'src/supervisors/supervisors.service';
import { InternsService } from 'src/interns/interns.service';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';

@Injectable()
export class InternCommentsService {
  constructor(
    @InjectRepository(InternComment)
    private readonly internCommentsRepository: Repository<InternComment>,
    private readonly internsService: InternsService,
    private readonly supervisorsService: SupervisorsService,
    private readonly systemAuditsService: SystemAuditsService,
  ) {}
  async create(
    createInternCommentDto: CreateInternCommentDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    return 'This action adds a new internComment';
  }

  async findAll() {
    return `This action returns all internComments`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} internComment`;
  }

  async update(
    id: string,
    updateInternCommentDto: UpdateInternCommentDto,
    { fullName, role, userId: userReq }: IRequestUser,
  ) {
    return `This action updates a #${id} internComment`;
  }

  async remove(id: string, { fullName, role, userId: userReq }: IRequestUser) {
    return `This action removes a #${id} internComment`;
  }
}
