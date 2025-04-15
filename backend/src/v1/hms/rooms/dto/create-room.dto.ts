
import { IsString, IsNumber, IsUrl, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';

class AmenityDto {
  @IsString()
  amenityName: string;
}

export class CreateRoomDto {

  @IsString()
  roomNumber: string;

  @IsString()
  type: string;

  @Transform(({ value }) => Number(value))
  price: number;

  @Transform(({ value }) => Number(value))
  occupancy: number;

  @IsString()
  bedType: string;

  @IsUrl({ protocols: ['https'], require_protocol: true })
  @IsOptional() 
  image?: string;

  @IsString()
  description: string;

  @Transform(({ value }) => Number(value))
  size: number;

  @IsString()
  @IsOptional()
  status?: string;

  @Transform(({ value }) => JSON.parse(value))
  @ValidateNested({ each: true })
  @Type(() => AmenityDto)
  @IsOptional()
  amenities?: AmenityDto[];

}