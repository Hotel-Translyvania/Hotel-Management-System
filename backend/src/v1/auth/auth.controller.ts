import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Req,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard,StaffJwtAuthGuard } from './guards/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto'; 

// Extend the Request interface to include the `user` property.
interface AuthenticatedRequest extends Request {
  user?: { sub: string;  };
} 
@Controller('auth') // Base route for all authentication-related endpoints
export class AuthController {
  constructor(private authService: AuthService) {}

  //Handles user signup requests.
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const data = await this.authService.signup(signupDto); // Call the signup service to register the user
    return {
      success: true,
      message: 'User registered successfully',
      data, // Return the registered user data
    };
  }

  // Handles user login requests.
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // Validate the user's credentials
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      // If validation fails, return a 401 Unauthorized response
      throw new HttpException(
        'Invalid credentials',HttpStatus.UNAUTHORIZED)
    }

    // Generate a JWT token for the authenticated user
    const { token } = this.authService.generateToken(user);

    // Return the token and a success message
    return { success: true, message: 'Login successful', token };
  }



  //Staff login endpoint.
  @Post('staff/login')
  async loginStaff(@Body() loginDto: LoginDto) {
    // Validate staff credentials using the service.
    const staff = await this.authService.validateStaff(
      loginDto.email,
      loginDto.password,
    );
    // If credentials are invalid, return an unauthorized error.
    if (!staff) {
      throw new HttpException(
        'Invalid credentials',HttpStatus.UNAUTHORIZED)
    }
    // Generate a JWT token for the validated staff.
    const { token } = this.authService.generateStaffToken(staff);
    // Return the token along with a success message.
    return { success: true, message: 'Staff login successful', token };
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
    const staffId = req.user?.sub; 

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
