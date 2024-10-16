import { Injectable } from '@nestjs/common';
import { initialData } from './data/seed.data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedingService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.insertNewUsers();
    return 'Seed executed!';
  }

  private async insertNewUsers() {
    await this.usersRepository.delete({});

    const users = initialData.users;

    // Mapeamos los datos y creamos las instancias
    const insertPromises = users.map((user) =>
      this.usersRepository.save(this.usersRepository.create(user)),
    );

    // Esperamos a que se resuelvan las promesas de la insercion
    await Promise.all(insertPromises);

    return true;
  }
}
