import { IsOptional, IsString, IsPhoneNumber } from 'class-validator';

export class UpdateGuestDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  identificationType?: string;

  @IsOptional()
  @IsString()
  identificationNumber?: string;
}