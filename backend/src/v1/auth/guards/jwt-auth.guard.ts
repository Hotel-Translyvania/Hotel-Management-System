import { Injectable, UnauthorizedException, ExecutionContext, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// This guard is used to protect routes that require JWT authentication.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// This guard is specifically for staff authentication using JWT.
@Injectable()
export class StaffJwtAuthGuard extends AuthGuard('staff-jwt') {
  private readonly logger = new Logger(StaffJwtAuthGuard.name);

  canActivate(context: ExecutionContext) {
    this.logger.debug('Attempting staff JWT authentication...');
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    this.logger.debug(`Authentication result - Error: ${err}, User: ${JSON.stringify(user)}, Info: ${info}`);
    
    if (err || !user) {
      this.logger.error('JWT validation failed:', err?.message || 'No user object');
      throw err || new UnauthorizedException('Invalid staff token');
    }
    
    this.logger.log(`Successfully authenticated staff ${user.email} with role ${user.role}`);
    return user;
  }
}

