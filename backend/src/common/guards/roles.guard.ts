// src/shared/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    
    // No role restrictions
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    
    // User has no role
    if (!user?.role) {
      throw new ForbiddenException('Access denied - no role assigned');
    }

    // Check role match
    const hasRole = requiredRoles.some((role) => user.role === role);
    
    if (!hasRole) {
      throw new ForbiddenException(
        `Role ${user.role} cannot access this resource. Required roles: ${requiredRoles.join(', ')}`
      );
    }

    return true;
  }
}