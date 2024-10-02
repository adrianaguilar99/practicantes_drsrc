import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  NOT_FOUND,
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
} from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { handleInternalServerError } from 'src/common/utils';
import { IRequestUser } from 'src/common/interfaces';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly systemAuditsService: SystemAuditsService,
  ) {}
  async updateHashedRefreshToken(userId: string, hashedRefreshToken: string) {
    try {
      const result = await this.usersRepository.update(
        { id: userId },
        { hashedRefreshToken },
      );
      if (result.affected === 0) {
        throw new NotFoundException(`${USER_NOT_FOUND}, User id: ${userId}`);
      }
      return result;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async create(
    createUserDto: CreateUserDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    const newUser = this.usersRepository.create(createUserDto);
    try {
      const savedUser = await this.usersRepository.save(newUser);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'CREATE USER',
        {
          id: savedUser.id,
          name: `${savedUser.firstName} ${savedUser.lastName}`,
        },
        'SUCCESS',
      );
      const { password, ...createdUser } = savedUser;
      return createdUser;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO CREATE USER',
        {
          id: null,
          name: `${createUserDto.firstName} ${createUserDto.lastName}`,
        },
        'FAILED TO CREATE USER',
        error.message,
      );
      if (error.code === '23505')
        throw new ConflictException(`${USER_ALREADY_EXISTS}`);
      handleInternalServerError(error.message);
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.find({
        where: { isActive: true },
      });
      const withoutPassword = users.map(({ password, ...rest }) => rest);
      return withoutPassword;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  // async findAllPaginated({
  //   limit = LIMIT_RECORDS,
  //   offset = OFFSET_RECORDS,
  // }: PaginationDto) {
  //   try {
  //     const users = await this.usersRepository.find({
  //       where: { isActive: true },
  //       take: limit,
  //       skip: offset,
  //     });
  //     const withoutPassword = users.map(({ password, ...rest }) => rest);
  //     return withoutPassword;
  //   } catch (error) {
  //     handleInternalServerError(error.message);
  //   }
  // }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id, isActive: true },
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'userRole',
        'createdAt',
        'hashedRefreshToken',
      ],
    });
    if (!user) throw new NotFoundException(`${USER_NOT_FOUND}`);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email, isActive: true },
    });
    if (!user) throw new NotFoundException(`${NOT_FOUND}`);
    return user;
  }

  async remove(id: string, { fullName, role, userId }: IRequestUser) {
    await this.findOne(id);
    try {
      const removedUser = await this.usersRepository.update(
        { id },
        { isActive: false },
      );
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'DELETE USER',
        { id, name: 'User' },
        'SUCCESS',
      );
      return removedUser;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO DELETE USER',
        { id, name: 'User' },
        'FAILED TO DELETE User',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async removeAll() {
    try {
      await this.usersRepository.update({}, { isActive: false });
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }
}
