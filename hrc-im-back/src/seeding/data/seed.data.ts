import { UserRole } from 'src/common';
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
      firstName: 'MARTIN',
      lastName: 'MARTINEZ ARIAS',
      email: 'for.any.app.testing@gmail.com',
      password: 'for.any.app.testing',
      userRole: UserRole.ADMINISTRATOR,
      createdAt: new Date(),
    },
    // {
    //   id: uuidv4(),
    //   firstName: 'Jane',
    //   lastName: 'Doe',
    //   email: 'jane.doe@facebook.com',
    //   password: '',
    //   userRole: UserRole.SUPERVISOR,
    //   createdAt: new Date().toISOString(),
    // },
    // {
    //   id: uuidv4(),
    //   firstName: 'Mark',
    //   lastName: 'Smith',
    //   email: 'mark.smith@intern.com',
    //   password: '',
    //   userRole: UserRole.INTERN,
    //   createdAt: new Date().toISOString(),
    // },
    // {
    //   id: uuidv4(),
    //   firstName: 'Susan',
    //   lastName: 'Lee',
    //   email: 'susan.lee@google.com',
    //   password: '',
    //   userRole: UserRole.ADMINISTRATOR,
    //   createdAt: new Date().toISOString(),
    // },
    // {
    //   id: uuidv4(),
    //   firstName: 'Michael',
    //   lastName: 'Jones',
    //   email: 'michael.jones@facebook.com',
    //   password: '',
    //   userRole: UserRole.SUPERVISOR,
    //   createdAt: new Date().toISOString(),
    // },
  ],
};
