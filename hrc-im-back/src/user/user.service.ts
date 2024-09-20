import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);

    try {
      return await this.userRepository.save(newUser);
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

  async findAllPaginated({ limit = 3, offset = 0 }: PaginationDto) {
    const users = await this.userRepository.find({
      take: limit,
      skip: offset,
    });
    return { users, records: users.length };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  // DIRECTAMENTE DE LA ENTIDAD USUARIO POR AHORA NO SE PUEDE EDITAR NADA
  // update(id: number, updateUserDto: UpdateUserDto) {}

  async remove(id: string): Promise<User> {
    const userToRemove = await this.findOne(id);
    await this.userRepository.remove(userToRemove);

    return userToRemove;
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
