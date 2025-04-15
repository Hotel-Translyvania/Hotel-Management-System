// src/hms/staff/dto/get-staff.dto.ts
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetStaffDto {
  @IsNotEmpty()
  @IsUUID()
  hotelId: string;
}