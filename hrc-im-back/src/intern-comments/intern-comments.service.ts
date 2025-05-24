import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInternCommentDto } from './dto/create-intern-comment.dto';
import { UpdateInternCommentDto } from './dto/update-intern-comment.dto';
import { IRequestUser } from 'src/common/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { InternComment } from './entities/intern-comment.entity';
import { Repository } from 'typeorm';
import { InternsService } from 'src/interns/interns.service';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';
import { handleInternalServerError } from 'src/common/utils';
import { UsersService } from 'src/users/users.service';
import { UserNotificationsGateway } from 'src/user-notifications/user-notifications.gateway';

@Injectable()
export class InternCommentsService {
  constructor(
    @InjectRepository(InternComment)
    private readonly internCommentsRepository: Repository<InternComment>,
    private readonly internsService: InternsService,
    private readonly usersService: UsersService,
    private readonly systemAuditsService: SystemAuditsService,
    private readonly userNotificationsGateway: UserNotificationsGateway,
  ) {}

  async create(
    createInternCommentDto: CreateInternCommentDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    const existingIntern = await this.internsService.findOne(
      createInternCommentDto.internId,
    );
    const existingUser = await this.usersService.findOne(userId);

    const internCommentToCreate = this.internCommentsRepository.create({
      ...createInternCommentDto,
      intern: existingIntern,
      user: existingUser,
    });
    try {
      const savedInternComment = await this.internCommentsRepository.save(
        internCommentToCreate,
      );
      const { intern, user, ...data } = savedInternComment;
      this.userNotificationsGateway.emitEvent(
        'comment',
        `Supervisor: ${fullName} realizó un comentario al practicante: ${existingIntern.user.firstName} ${existingIntern.user.lastName}`,
      );
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'CREATE INTERN COMMENT',
        data,
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
        createInternCommentDto,
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
          user: true,
        },
        order: { updatedAt: 'DESC' },
      });
      return allInternComments;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findAllByIntern(id: string) {
    try {
      const allInternCommentsByIntern =
        await this.internCommentsRepository.find({
          relations: {
            intern: true,
            user: true,
          },
          where: { intern: { id } },
          order: { updatedAt: 'DESC' },
        });
      return allInternCommentsByIntern;
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
            user: true,
          },
        },
      );
      if (!existingInternComment)
        throw new NotFoundException('Intern comment not found.');

      return existingInternComment;
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
      const { intern, user, ...data } = savedInternComment;
      await this.systemAuditsService.createSystemAudit(
        { id: userId, fullName, role },
        'UPDATE INTERN COMMENT',
        data,
        'SUCCESS',
      );
      return savedInternComment;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        { id: userId, fullName, role },
        'FAILED UPDATE INTERN COMMENT',
        updateInternCommentDto,
        'FAILED',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async remove(id: string, { fullName, role, userId }: IRequestUser) {
    const existingInternComment = await this.findOne(id);
    const { intern, user, ...data } = existingInternComment;
    try {
      const deletedInternComment =
        await this.internCommentsRepository.delete(id);

      await this.systemAuditsService.createSystemAudit(
        { id: userId, fullName, role },
        'DELETE INTERN COMMENT',
        data,
        'SUCCESS',
      );

      return deletedInternComment.affected;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        { id: userId, fullName, role },
        'FAILED DELETE INTERN COMMENT',
        data,
        'FAILED',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }
}
