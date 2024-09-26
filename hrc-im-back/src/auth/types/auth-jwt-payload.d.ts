import { UserRole } from 'src/common';

export type AuthJwtPayload = {
  sub: string;
  role: UserRole;
};
