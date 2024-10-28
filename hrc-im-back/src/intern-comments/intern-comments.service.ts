import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInternCommentDto } from './dto/create-intern-comment.dto';
import { UpdateInternCommentDto } from './dto/update-intern-comment.dto';
import { IRequestUser } from 'src/common/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { InternComment } from './entities/intern-comment.entity';
import { Repository } from 'typeorm';
import { SupervisorsService } from 'src/supervisors/supervisors.service';
import { InternsService } from 'src/interns/interns.service';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';
import { handleInternalServerError } from 'src/common/utils';
import { cleanInternData } from './helpers';

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
    const existingIntern = await this.internsService.findOne(
      createInternCommentDto.internId,
    );
    const existingSupervisor = await this.supervisorsService.findOne(
      createInternCommentDto.supervisorId,
    );

    const internCommentToCreate = this.internCommentsRepository.create({
      ...createInternCommentDto,
      intern: existingIntern,
      supervisor: existingSupervisor,
    });
    try {
      const savedInternComment = await this.internCommentsRepository.save(
        internCommentToCreate,
      );
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'CREATE INTERN COMMENT',
        {
          id: savedInternComment.id,
          data: `${savedInternComment.postedComment}`,
        },
        'SUCCESS',
      );
      return savedInternComment;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO CREATE INTERN FILES',
        { id: null, data: `${internCommentToCreate}` },
        'FAILED TO CREATE INTERN FILES',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async findAll() {
    try {
      const allInternComments = await this.internCommentsRepository.find({
        relations: {
          intern: true,
          supervisor: true,
        },
        order: { updatedAt: 'DESC' },
      });
      return allInternComments.map((comment) => ({
        ...comment,
        intern: cleanInternData(comment.intern),
      }));
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const existingInternComment = await this.internCommentsRepository.findOne(
        {
          where: { id },
          relations: {
            intern: true,
            supervisor: true,
          },
        },
      );
      if (!existingInternComment)
        throw new NotFoundException('Intern comment not found.');

      return {
        ...existingInternComment,
        intern: cleanInternData(existingInternComment.intern),
      };
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async update(
    id: string,
    updateInternCommentDto: UpdateInternCommentDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    const existingInternComment = await this.findOne(id);

    if (updateInternCommentDto.postedComment)
      existingInternComment.postedComment =
        updateInternCommentDto.postedComment;

    try {
      const savedInternComment = await this.internCommentsRepository.save(
        existingInternComment,
      );

      await this.systemAuditsService.createSystemAudit(
        { id: userId, fullName, role },
        'UPDATE INTERN COMMENT',
        { id, data: savedInternComment.postedComment },
        'SUCCESS',
      );

      return savedInternComment;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        { id: userId, fullName, role },
        'FAILED UPDATE INTERN COMMENT',
        { id, data: existingInternComment.postedComment },
        'FAILED',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async remove(id: string, { fullName, role, userId }: IRequestUser) {
    const existingInternComment = await this.findOne(id);
    try {
      const deletedInternComment = await this.internCommentsRepository.delete(
        existingInternComment,
      );

      await this.systemAuditsService.createSystemAudit(
        { id: userId, fullName, role },
        'DELETE INTERN COMMENT',
        { id, data: existingInternComment.postedComment },
        'SUCCESS',
      );

      return deletedInternComment.affected;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        { id: userId, fullName, role },
        'FAILED DELETE INTERN COMMENT',
        { id, data: existingInternComment.postedComment },
        'FAILED',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }
}
