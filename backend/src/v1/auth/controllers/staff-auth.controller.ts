import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { StaffAuthService } from '../services/staff-auth.service';
import { LoginDto } from '../dto/login.dto';
import { StaffJwtAuthGuard } from '../guards/jwt-auth.guard';
import { Request, Response } from 'express';
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
    @Req() req: Request,
    @Body() changePasswordDto: ChangePasswordDto,
    @Res() res: Response,
  ) {
    // Extract the staff's unique identifier (sub) from the JWT payload attached to req.user.
    const staffId = (req.user as { sub: string })?.sub;
    // Call the service to change the staff's password using the provided staffId and changePasswordDto.
    await this.staffAuthService.changePassword(staffId, changePasswordDto);
    // Respond with a success message.
    res.json({ success: true, message: 'Password changed successfully' });
  }
}