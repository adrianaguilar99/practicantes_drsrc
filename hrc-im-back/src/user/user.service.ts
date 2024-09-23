import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  INTERNAL_SERVER_ERROR,
  LIMIT_RECORDS,
  OFFSET_RECORDS,
  SUCCESSFUL_DELETION,
  USER_NOT_FOUND,
} from 'src/common/constants/constants';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateHashedRefreshToken(userId: string, hashedRefreshToken: string) {
    try {
      const result = await this.userRepository.update(
        { id: userId },
        { hashedRefreshToken },
      );
      if (result.affected === 0) {
        throw new NotFoundException(`${USER_NOT_FOUND}, User id: ${userId}`);
      }
      return result;
    } catch (error) {
      this.internalServerErrorMessage(error.message);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    try {
      const savedUser = await this.userRepository.save(newUser);
      return savedUser;
    } catch (error) {
      this.internalServerErrorMessage(error.message);
    }
  }

  private internalServerErrorMessage(message: string) {
    throw new InternalServerErrorException(
      `${INTERNAL_SERVER_ERROR}. Details: ${message}`,
    );
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();
      return { users, records: users.length };
    } catch (error) {
      this.internalServerErrorMessage(error.message);
    }
  }

  async findAllPaginated({
    limit = LIMIT_RECORDS,
    offset = OFFSET_RECORDS,
  }: PaginationDto) {
    try {
      const users = await this.userRepository.find({
        take: limit,
        skip: offset,
      });
      return { users, records: users.length };
    } catch (error) {
      throw new InternalServerErrorException(
        `${INTERNAL_SERVER_ERROR}. Details: ${error.message}`,
      );
    }
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'userRole', 'createdAt', 'hashedRefreshToken'],
    });
    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async remove(id: string) {
    const userToRemove = await this.findOne(id);
    try {
      const removedUser = await this.userRepository.remove(userToRemove);
      return { message: SUCCESSFUL_DELETION, removedUser };
    } catch (error) {
      if (!userToRemove) throw new BadRequestException(USER_NOT_FOUND);
    }
  }

  async removeAllUsers() {
    const query = this.userRepository.createQueryBuilder('user');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      return error;
    }
  }
}
