import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { initialData } from './data/seed.data';
import { IRequestUser } from 'src/common/interfaces';

@Injectable()
export class SeedingService {
  constructor(private readonly usersRepositoy: UsersService) {}

  async runSeed(reqUser: IRequestUser) {
    await this.insertNewUsers(reqUser);
    return 'Seed executed!';
  }

  private async insertNewUsers(reqUser: IRequestUser) {
    await this.usersRepositoy.removeAll();

    const users = initialData.users;

    const insertPromises = [];

    users.forEach((user) => {
      insertPromises.push(this.usersRepositoy.create(user, reqUser));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
