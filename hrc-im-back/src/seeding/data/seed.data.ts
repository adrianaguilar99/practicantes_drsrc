import { ENV } from 'src/configs';
import { UserRole } from 'src/common/enums';
import { v4 as uuidv4 } from 'uuid';

interface SeedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userRole: UserRole;
  createdAt: Date;
}

interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
    {
      id: uuidv4(),
      firstName: ENV.ADMIN.FIRST_NAME,
      lastName: ENV.ADMIN.LAST_NAME,
      email: ENV.ADMIN.EMAIL,
      password: ENV.ADMIN.PASSWORD,
      userRole: UserRole.ADMINISTRATOR,
      createdAt: new Date(),
    },
  ],
};
