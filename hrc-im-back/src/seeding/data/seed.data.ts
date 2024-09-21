import { UserRoles } from 'src/common/enums/userRoles.enum';
import { v4 as uuidv4 } from 'uuid';

interface SeedUser {
  id: string;
  email: string;
  password: string;
  userRol: UserRoles;
  createdAt: string;
}

interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
    {
      id: uuidv4(),
      email: 'john.doe@google.com',
      password: '',
      userRol: UserRoles.ADMINISTRATOR,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'jane.doe@facebook.com',
      password: '',
      userRol: UserRoles.SUPERVISOR,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'mark.smith@intern.com',
      password: '',
      userRol: UserRoles.INTERN,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'susan.lee@google.com',
      password: '',
      userRol: UserRoles.ADMINISTRATOR,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'michael.jones@facebook.com',
      password: '',
      userRol: UserRoles.SUPERVISOR,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'anna.johnson@intern.com',
      password: '',
      userRol: UserRoles.INTERN,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'charles.brown@google.com',
      password: '',
      userRol: UserRoles.ADMINISTRATOR,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'emily.white@facebook.com',
      password: '',
      userRol: UserRoles.SUPERVISOR,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'peter.miller@intern.com',
      password: '',
      userRol: UserRoles.INTERN,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'laura.wilson@intern.com',
      password: '',
      userRol: UserRoles.INTERN,
      createdAt: new Date().toISOString(),
    },
  ],
};
