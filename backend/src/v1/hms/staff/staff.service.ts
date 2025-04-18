// src/hms/staff/staff.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';
import { CreateStaffDto } from './dto/create-staff.dto';
import { AssignTaskDto } from './dto/assign-task.dto';
import { GetStaffDto } from './dto/get-staff.dto';
import { Hotel } from 'src/common/entities/hotel.entity';
import { Staff } from 'src/common/entities/staff.entity';
import { EmailService } from '../../../common/services/email.service';
import * as bcrypt from 'bcrypt';
import { create } from 'domain';
import { ImageUploadService } from 'src/common/services/image-upload.service';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Assignment } from 'src/common/entities/assignments.entity';
import { Room } from 'src/common/entities/room.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private readonly emailService: EmailService,
    private imageUploadService: ImageUploadService,
  ) { }

  async createStaff(createStaffDto: CreateStaffDto, hotelId: number): Promise<{ success: boolean; message: string }> {
    // Check if email already exists

    const targetHotel = await this.hotelRepository.findOne({ where: { id: hotelId } });
    if (!targetHotel) {
      throw new NotFoundException('Hotel not found');
    }
    const existingStaff = await this.staffRepository.findOne({
      where: {
        email: createStaffDto.email,
        hotel: { id: hotelId }, // Only check the hotel ID
      },
      relations: ['hotel'], // Ensure the hotel relation is loaded
    });
    if (existingStaff) {
      throw new ConflictException('Email already in use');
    }
    // 3. Generate and hash password


    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    const temporaryPassword = Array.from(crypto.getRandomValues(new Uint32Array(12)))
      .map((x) => charset[x % charset.length])
      .join('');
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    createStaffDto.password = hashedPassword;


    //upload image
    const imageUrl = await this.imageUploadService.uploadImage(createStaffDto.profilePic, `staff-${Date.now()}`);
    createStaffDto.profilePic = imageUrl;
    const staff = this.staffRepository.create({
      ...createStaffDto,
      hotel: targetHotel,
      isTemporaryPassword: true,
      // role : createStaffDto.role
    });
    try {
      await this.staffRepository.save(staff);

    } catch (error) {
      console.error('Error saving staff:', error);
      throw new InternalServerErrorException('Failed to save staff member');
    }

    try {
      const emailResponse = await this.emailService.sendStaffWelcomeEmail(
        createStaffDto.email,
        `${createStaffDto.firstname} ${createStaffDto.lastname}`,
        temporaryPassword
      );
      console.log('Email sent successfully:', emailResponse);
    } catch (error) {
      console.error('Error sending email:', error);
    }

    // Send email with temporary password
    return {
      success: true,
      message: 'Staff member invited successfully. Temporary password sent via email.',

    };
  }

  async assignTask(
    id: string,
    assignTaskDto: AssignTaskDto
  ): Promise<{ success: boolean; message: string }> {
    const staff = await this.staffRepository.findOne({ where: { id }, relations: ['hotel'] });
    

    if (!staff) {
      throw new NotFoundException('Staff member not found');
    }
    const room = await this.roomRepository.findOne({
      where: { roomNumber: assignTaskDto.roomNumber },
      relations: ['hotel'],
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const assignment = new Assignment();
    assignment.task = assignTaskDto.task;
    assignment.description = assignTaskDto.description;
    assignment.startTime = assignTaskDto.startTime 
    assignment.endTime = assignTaskDto.endTime;
    assignment.hotel = staff.hotel;
    assignment.staff = staff;
    assignment.assignedAt = new Date(); // Set the assignedAt timestamp
    assignment.room = room;
    await this.assignmentRepository.save(assignment);

    staff.assignedRoomId = assignTaskDto.roomNumber;
    staff.currentTask = assignTaskDto.task;

    await this.staffRepository.save(staff);

    return {
      success: true,
      message: `Task ${assignTaskDto.task} assigned to ${staff.firstname} ${staff.lastname}. Room: ${assignTaskDto.roomNumber}`,
    };
  }

  async getAllStaff(getStaffDto: GetStaffDto): Promise<{
    success: boolean;
    data: any[]
  }> {
    const staffMembers = await this.staffRepository.find({
      where: { hotel: { id: Number(getStaffDto.hotelId) } },
      relations: ['hotel'],
    });

    const formattedStaff = staffMembers.map(staff => ({
      staffId: staff.id,
      staffName: `${staff.firstname} ${staff.lastname}`,
      staffRole: staff.role,
      staffSalary: staff.salary,
      status: staff.status,
      employedAt: staff.employedAt,
      profilePic: staff.profilePic,
      phonenumber: staff.phonenumber,
      email: staff.email,
      assignedRoomId: staff.assignedRoomId,
      currentTask: staff.currentTask,
    }));

    return {
      success: true,
      data: formattedStaff,
    };
  }
  async deleteStaff(id: string, hotelId: number): Promise<{ success: boolean; message: string }> {
    const staff = await this.staffRepository.findOne({
      where: { id, hotel: { id: hotelId } },
      relations: ['hotel'],
    });

    if (!staff) {
      throw new NotFoundException('Staff member not found');
    }

    await this.staffRepository.remove(staff);

    return {
      success: true,
      message: 'Staff member deleted successfully',
    };

  }

  async updateStaff(id:string,hotelId:number, updateStaffDto:UpdateStaffDto): Promise<{ success:boolean,message:string}>{
    const staff = await this.staffRepository.findOne({
      where: {id, hotel: {id:hotelId}},
      relations: ['hotel']
    })

    if(!staff){
      throw new NotFoundException('Staff member not found')
    }
    try{
      await this.staffRepository.update(
        { id, hotel: { id: hotelId } },
        { 
          ...updateStaffDto, 
          role: updateStaffDto.role ? { name: updateStaffDto.role } as any : undefined 
        }
      );
        
    } catch (error){
      throw new InternalServerErrorException('Staff update failed')
    }
    
    return {
      success: true,
      message:"staff memeber successfuly updated"
    };
  }

  async getAllAssignments(): Promise<{
    success: boolean;
    data: {
      assignmentId: string;
      task: string;
      description: string;
      startTime: string;
      endTime: string;
      staffName: string;
      roomNumber: string;
      assignedAt: Date;
    }[];
  }> {


    const assignments = await this.assignmentRepository.find({
      relations: ['staff', 'room', 'hotel'],
    });
    const formattedAssignments = assignments.map(assignment => ({
      assignmentId: assignment.id,
      task: assignment.task,
      description: assignment.description,
      startTime: assignment.startTime,
      endTime: assignment.endTime,
      staffName: `${assignment.staff.firstname} ${assignment.staff.lastname}`,
      roomNumber: assignment.room.roomNumber,
      assignedAt: assignment.assignedAt,
    }));

    return {
      success: true,
      data: formattedAssignments,
    };

  }

  async deleteAssignment(id: string): Promise<{ 
    success: boolean; message: string 
  }> {
    console.log(id)
    const assignment = await this.assignmentRepository.findOne(
      
      { where: { id }, relations: ['staff', 'room', 'hotel'] }
    );
    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }
    
    const staff = await this.staffRepository.findOne({ where: { id: assignment.staff.id } });
    if (!staff) {
      throw new NotFoundException('Staff member not found');
    }
    staff.currentTask = "";
    staff.assignedRoomId = "";
    await this.staffRepository.save(staff);
    await this.assignmentRepository.remove(assignment);
    return {
      success: true,
      message: 'Assignment deleted successfully',
    };
    
}
}