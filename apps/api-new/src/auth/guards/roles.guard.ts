import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ROLE } from 'src/users/entities/user.entity';
import { AuthUser } from '../strategies/jwt.strategy';
import { IS_PUBLIC_KEY } from '../decorators/public-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {

    // Check if route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If route is public, skip all role checks
    if (isPublic) {
      return true;
    }

    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are specified, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: AuthUser = request.user;

    // Check if user exists and has roles
    if (!user || !user.role) {
      throw new ForbiddenException('Access denied: No roles assigned');
    }

    // Admin bypass: If user is an admin, skip all role checks and allow access
    if (user.role == ROLE.ADMIN) {
      return true;
    }

    // Check if user has at least one of the required roles
    const hasRole = requiredRoles.some((role) => user.role == role);

    if (!hasRole) {
      throw new ForbiddenException(
        `Access denied: Requires one of the following roles: ${requiredRoles.join(', ')}`
      );
    }

    return true;
  }
}
