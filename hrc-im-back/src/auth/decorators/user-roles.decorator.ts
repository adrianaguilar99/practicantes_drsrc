import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/common';
import { USER_ROLES_KEY } from 'src/common/constants/constants';

export const UserRoles = (...userRoles: [UserRole, ...UserRole[]]) =>
  SetMetadata(USER_ROLES_KEY, userRoles);
