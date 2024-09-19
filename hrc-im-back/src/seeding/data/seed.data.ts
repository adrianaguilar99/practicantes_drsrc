import { UserRoles } from 'src/common/enums/userRoles.enum';
import { v4 as uuidv4 } from 'uuid';

interface SeedUser {
  id: string;
  email: string;
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
      userRol: UserRoles.ADMINISTRATOR,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'jane.doe@facebook.com',
      userRol: UserRoles.SUPERVISOR,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'mark.smith@intern.com',
      userRol: UserRoles.INTERN,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'susan.lee@google.com',
      userRol: UserRoles.ADMINISTRATOR,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'michael.jones@facebook.com',
      userRol: UserRoles.SUPERVISOR,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'anna.johnson@intern.com',
      userRol: UserRoles.INTERN,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'charles.brown@google.com',
      userRol: UserRoles.ADMINISTRATOR,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'emily.white@facebook.com',
      userRol: UserRoles.SUPERVISOR,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'peter.miller@intern.com',
      userRol: UserRoles.INTERN,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'laura.wilson@intern.com',
      userRol: UserRoles.INTERN,
      createdAt: new Date().toISOString(),
    },
  ],
};
