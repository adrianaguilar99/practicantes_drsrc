import { UserRole } from 'src/common';

export type AuthJwtPayload = {
  sub: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};
