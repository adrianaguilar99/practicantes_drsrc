import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  LIMIT_RECORDS,
  NOT_FOUND,
  OFFSET_RECORDS,
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
} from 'src/common/constants/constants';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { handleInternalServerError } from 'src/common/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
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

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    try {
      const savedUser = await this.usersRepository.save(newUser);
      const { password, ...createdUser } = savedUser;
      return createdUser;
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException(`${USER_ALREADY_EXISTS}`);
      handleInternalServerError(error.message);
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.find({
        where: { isDeleted: false },
      });
      const withoutPassword = users.map(({ password, ...rest }) => rest);
      return withoutPassword;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findAllPaginated({
    limit = LIMIT_RECORDS,
    offset = OFFSET_RECORDS,
  }: PaginationDto) {
    try {
      const users = await this.usersRepository.find({
        where: { isDeleted: false },
        take: limit,
        skip: offset,
      });
      const withoutPassword = users.map(({ password, ...rest }) => rest);
      return withoutPassword;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id, isDeleted: false },
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
      where: { email, isDeleted: false },
    });
    if (!user) throw new NotFoundException(`${NOT_FOUND}`);
    return user;
  }

  async remove(id: string) {
    const userToRemove = await this.findOne(id);
    if (!userToRemove) throw new NotFoundException(`${USER_NOT_FOUND}`);
    userToRemove.isDeleted = true;
    try {
      const removedUser = await this.usersRepository.save(userToRemove);
      return removedUser;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async removeAllUsers() {
    try {
      await this.usersRepository.update({}, { isDeleted: true });
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }
}
