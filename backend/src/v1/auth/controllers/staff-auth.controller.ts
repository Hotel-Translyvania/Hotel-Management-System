import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { StaffAuthService } from '../services/staff-auth.service';
import { LoginDto } from '../dto/login.dto';
import { StaffJwtAuthGuard } from '../guards/jwt-auth.guard';
import { ChangePasswordDto } from '../dto/change-password.dto';

// Extended Request type for authenticated routes
interface AuthenticatedRequest extends Request {
  user?: {
    sub: string;
    staffId: string;
    role: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
    profilePic: string;
    salary: number;
    employedAt: Date;
    status: string;

  };
}

@Controller('auth/staff')
export class StaffAuthController {
  constructor(private readonly staffAuthService: StaffAuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const staff = await this.staffAuthService.validateStaff(
      loginDto.email,
      loginDto.password
    );

    if (!staff) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const { token } = this.staffAuthService.login(staff);

    // Set secure HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      path: '/',
    });

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Login successful',
      user : {
        email: staff.email,
        role: staff.role,
        staffId: staff.id,
        firstName: staff.firstname,
        lastName: staff.lastname,
        phone: staff.phonenumber,
        dateOfBirth: staff.dateOfBirth,
      },

    });
  }


  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      path: '/',
    });
    return res.json({ success: true, message: 'Logged out successfully' });
  }

  @Patch('change-password')
  @UseGuards(StaffJwtAuthGuard)
  async changePassword(
    @Req() req: AuthenticatedRequest,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    if (!req.user?.staffId) {
      throw new Error('Staff ID is missing in the request');
    }

    await this.staffAuthService.changePassword(
      req.user.staffId,
      changePasswordDto
    );

    return {
      success: true,
      message: 'Password changed successfully',
    };
  }


  @Get('checkAuth')
  @UseGuards(StaffJwtAuthGuard)
  async checkAuth(@Req() req: AuthenticatedRequest) {
    // The guard already validated the JWT
    const staff = await this.staffAuthService.findStaffById(req.user?.sub);
    // console.log(req.user?.sub,"staff is here")
    if (!staff) {
      return {
        success: false,
        message: 'Staff not found',
      };
    }
    return {
      user: {
        id: staff.id,
        email: staff.email,
        role: staff.role,
        firstName: staff.firstname,
        lastName: staff.lastname,
        phone: staff.phonenumber,
        dateOfBirth: staff.dateOfBirth,
        profilePic : staff.profilePic,
        salary: staff.salary,
        employedAt: staff.employedAt,
        status: staff.status,
        
      },
      
    };
  }
}