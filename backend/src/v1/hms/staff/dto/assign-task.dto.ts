// src/hms/staff/dto/assign-task.dto.ts
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AssignTaskDto {
  @IsNotEmpty()
  roomId: string;

  @IsNotEmpty()
  @IsString()
  task: string;
}