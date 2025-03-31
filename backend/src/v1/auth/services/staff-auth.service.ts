import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Staff_Auth } from '../entities/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from '../dto/change-password.dto';

@Injectable()
export class StaffAuthService {
  // Inject the Staff_Auth repository and JwtService via dependency injection.
  constructor(
    @InjectRepository(Staff_Auth)
    private staffRepository: Repository<Staff_Auth>,
    private jwtService: JwtService,
  ) {}

  // Validate staff credentials.
  async validateStaff(
    email: string,
    password: string,
  ): Promise<Staff_Auth | null> {
    // Retrieve the staff record by email.
    const staff = await this.staffRepository.findOne({ where: { email } });
    // Compare the provided password with the stored hashed password.
    if (staff && (await bcrypt.compare(password, staff.password))) {
      return staff;
    }
    return null;
  }

  // Generates a JWT token for an authenticated staff member.
  login(staff: Staff_Auth): { token: string } {
    // Create a payload with the staff's unique identifier and email.
    const payload = { sub: staff.staffId, email: staff.email };
    // Return a signed JWT token with an expiration time, using the secret from environment variables.
    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.STAFF_JWT_SECRET, // The secret key for staff JWT tokens.
        expiresIn: '1h', // Token expiration is set to 1 hour.
      }),
    };
  }

  // Changes the password for a given staff member.
  async changePassword(
    staffId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    // Find the staff by their unique staffId.
    const staff = await this.staffRepository.findOne({ where: { staffId } });
    if (!staff) throw new Error('Staff not found');

    // Validate the old password provided by the staff.
    const isOldPasswordValid = await bcrypt.compare(
      changePasswordDto.oldPassword,
      staff.password,
    );
    if (!isOldPasswordValid) throw new Error('Invalid old password');

    // Hash the new password.
    staff.password = await bcrypt.hash(changePasswordDto.newPassword, 10);

    // Save the updated staff entity with the new password.
    await this.staffRepository.save(staff);
  }
}
