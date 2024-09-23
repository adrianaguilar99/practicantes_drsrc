import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_ROLES_KEY } from 'src/common/constants/constants';
import { UserRole } from 'src/common/enums/user-role.enum';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredUserRoles = this.reflector.getAllAndOverride<UserRole[]>(
      USER_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredUserRoles) return true;
    const user = context.switchToHttp().getRequest().user;
    // console.log(user);   // para ver roles

    // valido cuando el rol es dinamico
    // const hasRequiredUserRole = requiredUserRoles.some(
    //   (userRole) => user.userRole === userRole,
    // );

    return requiredUserRoles.includes(user.role);
  }
}
