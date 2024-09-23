import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import {
  LIMIT_RECORDS,
  OFFSET_RECORDS,
  SUCCESSFUL_DELETION,
  USER_NOT_FOUND,
} from 'src/common/constants/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateHashedRefreshToken(userId: string, hashedRefreshToken: string) {
    return this.userRepository.update({ id: userId }, { hashedRefreshToken });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(newUser);
    try {
      return savedUser;
    } catch (error) {
      throw new InternalServerErrorException(
        `Something went wrong when creating the user. Details: ${error.message}`,
      );
    }
  }

  async findAll() {
    const users = await this.userRepository.find();
    return { users, records: users.length };
  }

  async findAllPaginated({
    limit = LIMIT_RECORDS,
    offset = OFFSET_RECORDS,
  }: PaginationDto) {
    const users = await this.userRepository.find({
      take: limit,
      skip: offset,
    });
    return { users, records: users.length };
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
