import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { initialData } from './data/seed.data';

@Injectable()
export class SeedingService {
  constructor(private readonly usersRepositoy: UsersService) {}

  async runSeed() {
    await this.insertNewUsers();
    return 'Seed executed!';
  }

  private async insertNewUsers() {
    await this.usersRepositoy.removeAllUsers();

    const users = initialData.users;

    const insertPromises = [];

    users.forEach((user) => {
      insertPromises.push(this.usersRepositoy.create(user));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
