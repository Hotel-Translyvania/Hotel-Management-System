import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// This guard is used to protect routes that require JWT authentication.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// This guard is specifically for staff authentication using JWT.
@Injectable()
export class StaffJwtAuthGuard extends AuthGuard('staff-jwt') {}
