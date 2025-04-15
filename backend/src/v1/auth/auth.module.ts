import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './controllers/auth.controller';
import { StaffAuthController } from './controllers/staff-auth.controller';
import { User } from '../../common/entities/user.entity';
import { Staff } from '../../common/entities/staff.entity';
import { AuthService } from './services/auth.service';
import { StaffAuthService } from './services/staff-auth.service';
import { JwtStrategy, StaffJwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    // Register the Guest_Auth and Staff_Auth entities for use with TypeORM.
    TypeOrmModule.forFeature([User, Staff]),

    // Import PassportModule to enable authentication features.
    PassportModule,

    // Register JwtModule for regular users using the JWT_SECRET.
    JwtModule.register({
      secret: process.env.JWT_SECRET, // JWT secret key for regular users (loaded from .env)
      signOptions: { expiresIn: process.env.JWT_EXPIRATION}, // Token expiration set to 1 hour
    }),
    // Register another instance of JwtModule for staff using the STAFF_JWT_SECRET.
    JwtModule.register({
      secret: process.env.STAFF_JWT_SECRET, // JWT secret key for staff members (loaded from .env)
      signOptions: { expiresIn: process.env.STAFF_JWT_EXPIRATION }, // Token expiration set to 1 hour
    }),
  ],
  // Define the controllers for authentication-related endpoints.
  controllers: [AuthController, StaffAuthController],

  // Provide the services and strategies for dependency injection.
  providers: [AuthService, StaffAuthService, JwtStrategy, StaffJwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}