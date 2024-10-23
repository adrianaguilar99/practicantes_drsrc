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
      firstName: 'LEONARDO DANIEL',
      lastName: 'REBOLLO CALERO',
      email: 'leonardod.rebollo@gmail.com',
      password: 'Generico2024$$',
      userRole: UserRole.ADMINISTRATOR,
      createdAt: new Date(),
    },
    {
      id: uuidv4(),
      firstName: 'ElKarma',
      lastName: 'PRO2',
      email: 'elkarmapro2@gmail.com',
      password: 'Generico2024$$',
      userRole: UserRole.SUPERVISOR_RH,
      createdAt: new Date(),
    },
    {
      id: uuidv4(),
      firstName: 'NatoNull',
      lastName: 'null',
      email: 'natonull@gmail.com',
      password: 'Generico2024$$',
      userRole: UserRole.INTERN,
      createdAt: new Date(),
    },
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
