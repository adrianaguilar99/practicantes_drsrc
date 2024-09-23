import { UserRole } from 'src/common/enums/user-role.enum';

export type AuthJwtPayload = {
  sub: string;
  role: UserRole;
};
