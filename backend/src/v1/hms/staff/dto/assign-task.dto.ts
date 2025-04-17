// src/hms/staff/dto/assign-task.dto.ts
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AssignTaskDto {
  @IsNotEmpty()
  roomNumber: string;

  @IsNotEmpty()
  @IsString()
  task: string;

  @IsString()
  description: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string; 
}