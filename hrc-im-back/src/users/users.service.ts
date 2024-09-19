import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
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

  async findAll(paginationDto: PaginationDto): Promise<User[]> {
    const {
      limit = this.configService.getOrThrow<number>('LIMIT_RECORDS'),
      offset = this.configService.getOrThrow<number>('OFFSET_RECORDS'),
    } = paginationDto;

    const users = await this.userRepository.find({
      take: limit,
      skip: offset,
    });
    return users;
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
