/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class StaffJwtStrategy extends PassportStrategy(Strategy, 'staff-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // Check for token in cookies first
          const token = request?.cookies?.token;
          if (!token) return null;
          return token;
        },
        // Fall back to Authorization header
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.STAFF_JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // Validate required fields
    if (!payload.sub || !payload.email || !payload.role) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return {
      sub: payload.sub,
      staffId: payload.sub,
      email: payload.email,
      role: payload.role,
      firstName: payload.firstName,
      lastName: payload.lastName,
      phone: payload.phone,
      dateOfBirth: payload.dateOfBirth
    };
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: any) {
    return {
      sub: payload.sub,
      userId: payload.sub,
      email: payload.email,
      role: payload.role
    };
  }
}
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('STAFF_JWT_SECRET:', process.env.STAFF_JWT_SECRET);
