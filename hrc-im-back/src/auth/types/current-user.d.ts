import { UserRole } from 'src/common/enums/user-role.enum';

export type CurrentUser = {
  id: string;
  userRole: UserRole;
};
