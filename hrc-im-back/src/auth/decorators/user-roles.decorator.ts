import { SetMetadata } from '@nestjs/common';
import { USER_ROLES_KEY } from 'src/common/constants/constants';
import { UserRole } from 'src/common/enums/user-role.enum';

export const UserRoles = (...userRoles: [UserRole, ...UserRole[]]) =>
  SetMetadata(USER_ROLES_KEY, userRoles);
