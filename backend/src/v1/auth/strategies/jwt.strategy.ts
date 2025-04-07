  import { ExtractJwt, Strategy } from 'passport-jwt';
  import { PassportStrategy } from '@nestjs/passport';
  import { Injectable } from '@nestjs/common';

  //JwtStrategy is used for validating JWT tokens for regular users.
  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
      super({
        // Extract JWT token from the Authorization header ("Bearer <token>")
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        // Secret key for verifying the token; Non-null assertion used because it's assumed to be defined.
        secretOrKey: process.env.JWT_SECRET,
      });
    }

validate(payload: any) {
  return { userId: payload.sub, email: payload.email, role: payload.role };
}


// StaffJwtStrategy is used for validating JWT tokens for staff members.
@Injectable()
export class StaffJwtStrategy extends PassportStrategy(Strategy, 'staff-jwt') {
  constructor() {
    super({
      // Extract JWT token from the Authorization header ("Bearer <token>")
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Secret key for verifying staff tokens
      secretOrKey: process.env.STAFF_JWT_SECRET,
    });
  }

  /**
   * This method is automatically called after successful token verification.
   * It receives the decoded JWT payload and returns a staff object.
   */
  async validate(payload: any) {
    // This object becomes req.user
    return {
      staffId: payload.sub, // Prefer using descriptive name
      email: payload.email,
      role: payload.role,
    };
  }
}
