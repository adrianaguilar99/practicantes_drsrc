import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);

    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error interno al crear el usuario. Detalles: ${error.message}`,
      );
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
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
