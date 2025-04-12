// src/hms/staff/dto/create-staff.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPhoneNumber,
  IsUrl,
  IsDateString,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Role } from 'src/common/enums/role.enum';

export class CreateStaffDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(['available', 'working'])
  status: string;

  @IsString()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phonenumber: string;

  @IsString()
  @IsOptional()
  profilePic: string;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  salary: number;

  @IsNotEmpty()
  @IsDateString()
  employedAt: string;
}
