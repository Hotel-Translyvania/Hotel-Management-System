import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsUrl({ protocols: ['https'], require_protocol: true })
  @IsOptional() 
  image?: string; 
}