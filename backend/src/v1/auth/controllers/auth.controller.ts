import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignupDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { Response } from 'express';

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
}
