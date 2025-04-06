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
import { AuthService } from './auth/services/auth.service';
import { SignupDto } from './auth/dto/signup.dto';
import { LoginDto } from './auth/dto/login.dto';
import { JwtAuthGuard, StaffJwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Request, Response } from 'express';
import { ChangePasswordDto } from './auth/dto/change-password.dto'; 

// Extend the Request interface to include the `user` property.
interface AuthenticatedRequest extends Request {
  user?: { sub: string; staffId: string };
} 

@Controller('auth') // Base route for all authentication-related endpoints
export class AuthController {
  constructor(private authService: AuthService) {}

  //Handles user signup requests.
  @Post('signup')
  async signup(@Body() signupDto: SignupDto, @Res() res: Response) {
    const data = await this.authService.signup(signupDto); // Call the signup service to register the user
    res.json({
      success: true,
      message: 'User registered successfully',
      data, // Return the registered user data
    });
  }

  // Handles user login requests.
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    // Validate the user's credentials
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      // If validation fails, return a 401 Unauthorized response
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    // Generate a JWT token for the authenticated user
    const { token } = this.authService.login(user);

    // Return the token and a success message
    res.json({ success: true, message: 'Login successful', token });
  }



  //Staff login endpoint.
  @Post('staff/login')
  async loginStaff(@Body() loginDto: LoginDto, @Res() res: Response) {
    // Validate staff credentials using the service.
    const staff = await this.authService.validateStaff(
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
    const { token } = this.authService.login(staff);
    // Return the token along with a success message.
    res.json({ success: true, message: 'Staff login successful', token });
  }
  // Change password endpoint for staff.
  @Patch('staff/change-password')
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
    await this.authService.changePassword(staffId, changePasswordDto);

    // Respond with a success message.
    return { success: true, message: 'Password changed successfully' };
  }
}
