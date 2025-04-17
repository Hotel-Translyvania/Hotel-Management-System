// src/hms/staff/staff.controller.ts
import { 
  Controller, 
  Post, 
  Patch, 
  Get, 
  Body, 
  Param, 
  Headers, 
  UseGuards, 
  UsePipes,
  ValidationPipe,
  Query,
  UseInterceptors,
  UploadedFile,
  Delete
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { AssignTaskDto } from './dto/assign-task.dto';
import { GetStaffDto } from './dto/get-staff.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Controller('hms/hotels/:hotelId')
@UsePipes(new ValidationPipe())
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post('staff')
  @UseInterceptors(FileInterceptor('image', { dest: './uploads/' }))
  async addStaff(
    @Body() createStaffDto: CreateStaffDto,
    @Param('hotelId') hotelId: number,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    createStaffDto.profilePic = file.path;
    return this.staffService.createStaff(createStaffDto, hotelId);
  }

  @Patch('staff/:id')
  async assignStaffToRoom(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
    @Body() assignTaskDto: AssignTaskDto,
  ) {
    return this.staffService.assignTask(id, assignTaskDto);
  }

  @Get('staff')
  async getAllStaff(
    @Param('hotelId') hotelId: string,
  ) {
    return this.staffService.getAllStaff({hotelId});
  }

  @Delete('staff/:id')
  async deleteStaff(
    @Param('hotelId') hotelId: number,
    @Param('id') id: string,
  ) {
    return this.staffService.deleteStaff(id, hotelId);
  }

  @Patch('staff/update/:id')
  async updateStaff(
    @Param('id') id: string,
    @Param('hotelId') hotelId: number,
    @Body()updateStafDto: UpdateStaffDto,
  ){

    return this.staffService.updateStaff(id,hotelId,updateStafDto)
  }

  @Get('assignments')
  async getAssignments(
  ) {
    return this.staffService.getAllAssignments();
  }

  @Delete('assignments/:id')
  async deleteAssignment(
    @Param('id') id: string,
  ) {
    return this.staffService.deleteAssignment(id);
  }
}