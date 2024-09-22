import { UserRole } from 'src/common/enums/user-role.enum';
import { v4 as uuidv4 } from 'uuid';

interface SeedUser {
  id: string;
  email: string;
  hashedPassword: string;
  userRole: UserRole;
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
      hashedPassword: '',
      userRole: UserRole.ADMINISTRATOR,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'jane.doe@facebook.com',
      hashedPassword: '',
      userRole: UserRole.SUPERVISOR,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'mark.smith@intern.com',
      hashedPassword: '',
      userRole: UserRole.INTERN,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'susan.lee@google.com',
      hashedPassword: '',
      userRole: UserRole.ADMINISTRATOR,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'michael.jones@facebook.com',
      hashedPassword: '',
      userRole: UserRole.SUPERVISOR,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'anna.johnson@intern.com',
      hashedPassword: '',
      userRole: UserRole.INTERN,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'charles.brown@google.com',
      hashedPassword: '',
      userRole: UserRole.ADMINISTRATOR,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'emily.white@facebook.com',
      hashedPassword: '',
      userRole: UserRole.SUPERVISOR,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'peter.miller@intern.com',
      hashedPassword: '',
      userRole: UserRole.INTERN,
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      email: 'laura.wilson@intern.com',
      hashedPassword: '',
      userRole: UserRole.INTERN,
      createdAt: new Date().toISOString(),
    },
  ],
};
