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
import { AdminAuthService } from '../services/admin-auth.service';
import { ManagerAuthService } from '../services/manager-auth.service';
import { LoginDto } from '../dto/login.dto';
import { StaffJwtAuthGuard } from '../guards/jwt-auth.guard';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { Staff } from 'src/common/entities/staff.entity';
import { Manager } from 'src/common/entities/manager.entity';
import { Admin } from 'src/common/entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';


// Extended Request type for authenticated routes
interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    role: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
    profilePic: string;
    address: string;
  };
}

@Controller('auth/hms')
export class StaffAuthController {
  constructor(
    private readonly staffAuthService: StaffAuthService,
    private readonly adminAuthService: AdminAuthService,
    private readonly managerAuthService: ManagerAuthService,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password, role } = loginDto;
    if (role === 'staff') {
      const staff = await this.staffAuthService.validateStaff(
        loginDto.email,
        loginDto.password,
      );

      if (!staff) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      const { token } = this.staffAuthService.login(staff);
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });

      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Login successful',
        user: {
          email: staff.email,
          role: staff.role,
          staffId: staff.id,
          firstName: staff.firstname,
          lastName: staff.lastname,
          phone: staff.phonenumber,
          dateOfBirth: staff.dateOfBirth,
          profilePic: staff.profilePic,
          address: staff.address,
        },
      });
    } else if (role === 'admin') {
      console.log('before admin');
      const admin = await this.adminAuthService.validateAdmin(
        loginDto.email,
        loginDto.password,
      );

      if (!admin) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          message: 'Invalid credentials',
        });
      }
      const { token } = this.adminAuthService.session(admin);
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });

      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Login successful',
        user: {
          email: admin.email,
          role: admin.role,
          adminId: admin.id,
          firstName: admin.firstName,
          lastName: admin.lastName,
          phone: admin.phoneNumber,
          dateOfBirth: admin.dateOfBirth,
          profilePic: admin.profilePic,
          address: admin.address,
        },
      });
    } else {
      const manager = await this.managerAuthService.validateManager(
        loginDto.email,
        loginDto.password,
      );

      if (!manager) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      const { token } = this.managerAuthService.session(manager);
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });

      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Login successful',
        user: {
          email: manager.email,
          role: manager.role,
          managerId: manager.id,
          firstName: manager.firstName,
          lastName: manager.lastName,
          phone: manager.phoneNumber,
          dateOfBirth: manager.dateOfBirth,
          profilePic: manager.profilePic,
          address: manager.address,
        },
      });
    }
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
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const { role, id } = req.user;
    if (!id) {
      throw new Error('ID is missing in the request');
    }
    try {
      if (role === 'staff') {
        await this.staffAuthService.changePassword(id, changePasswordDto);
      } else if (role === 'admin') {
        await this.adminAuthService.changePassword(id, changePasswordDto);
      } else if (role === 'manager') {
        await this.managerAuthService.changePassword(id, changePasswordDto);
      }
      return {
        success: true,
        message: 'Password changed successfully',
      };
    } catch (error) {
      // console.error('Error changing password:', error);
      return {
        success: false,
        message: 'Failed to change password',
      };
    }
  }

  @Get('checkAuth')
  @UseGuards(StaffJwtAuthGuard)
  async checkAuth(@Req() req: AuthenticatedRequest) {
    const { role, id } = req.user;
    console.log('checkAuth', req.user);
    let user: any;
    if (role === 'staff') {
      user = await this.staffAuthService.findStaffById(id);
    } else if (role === 'admin') {
      user = await this.adminAuthService.findById(id);
    } else if (role === 'manager') {
      user = await this.managerAuthService.findById(id);
    }
    if (!user) {
      return {
        success: false,
        message: `${role.toUpperCase()} is not found`,
      };
    }
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user?.firstname || user?.firstName,
        lastName: user?.lastname || user?.lastName,
        phone: user?.phonenumber || user?.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        profilePic: user.profilePic,
        address: user.address,
      },
    };
  }
}
