/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

<<<<<<< HEAD
//JwtStrategy is used for validating JWT tokens for regular users.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      // Extract JWT token from the Authorization header ("Bearer <token>")
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Secret key for verifying the token; Non-null assertion used because it's assumed to be defined.
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  // This method is automatically called after successful token verification.
  validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

// StaffJwtStrategy is used for validating JWT tokens for staff members.
=======
>>>>>>> 7fabc87481018b0af37b37982d03386f7177f4d2
@Injectable()
export class StaffJwtStrategy extends PassportStrategy(Strategy, 'staff-jwt') {
  constructor() {
    super({
<<<<<<< HEAD
      // Extract JWT token from the Authorization header ("Bearer <token>")
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Secret key for verifying staff tokens; Non-null assertion used because it's assumed to be defined.
      secretOrKey: process.env.STAFF_JWT_SECRET as string
=======
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
>>>>>>> 7fabc87481018b0af37b37982d03386f7177f4d2
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
