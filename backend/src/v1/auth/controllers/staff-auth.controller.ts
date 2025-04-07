import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Req,
  Res,
  Header,
} from '@nestjs/common';
import { StaffAuthService } from '../services/staff-auth.service';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard, StaffJwtAuthGuard } from '../guards/jwt-auth.guard';
import { Request, Response } from 'express';

// Extend the Request interface to include the `user` property.
interface AuthenticatedRequest extends Request {
  user?: { sub: string; staffId: string };
}
import { ChangePasswordDto } from '../dto/change-password.dto';

@Controller('auth/staff') // Base endpoint for staff authentication
export class StaffAuthController {
  constructor(private staffAuthService: StaffAuthService) {}

  //Staff login endpoint.
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    // Validate staff credentials using the service.
    const staff = await this.staffAuthService.validateStaff(
      loginDto.email,
      loginDto.password,
    );
    // If credentials are invalid, return an unauthorized error.
    if (!staff) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }
    // Generate a JWT token for the validated staff.
    const { token } = this.staffAuthService.login(staff);
    // Return the token along with a success message.
    res.json({ success: true, message: 'Staff login successful', token });
  }
  // Change password endpoint for staff.
  @Patch('change-password')
  @UseGuards(StaffJwtAuthGuard) // Protect this route with the staff JWT authentication guard.
  async changePassword(
    @Req() req: AuthenticatedRequest,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    console.log("req", req.user);

    // Extract the staff's unique identifier (staffId) from the JWT payload attached to the request.
    const staffId = req.user?.staffId;

    if (!staffId) {
      throw new Error('Staff ID is missing in the request');
    }

    console.log('Staff ID:', staffId);

    // Call the service to change the password.
    await this.staffAuthService.changePassword(staffId, changePasswordDto);

    // Respond with a success message.
    return { success: true, message: 'Password changed successfully' };
  }
}