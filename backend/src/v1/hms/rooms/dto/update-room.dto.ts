import { IsString, IsNumber, IsUrl, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
class AmenityDto {
    @IsString()
    amenityName: string;
}
export class UpdateRoomDto {
    @IsString()
    @IsOptional()
    roomNumber?: string;
    @IsString()
    @IsOptional()
    type?: string;
    @Transform(({ value }) => Number(value))
    @IsOptional()
    price?: number;
    @Transform(({ value }) => Number(value))
    @IsOptional()
    occupancy?: number;
    @IsString()
    @IsOptional()
    bedType?: string;
    @IsUrl({ protocols: ['https'], require_protocol: true })
    @IsOptional()
    image?: string;
    @IsString()
    @IsOptional()
    description?: string;
    @Transform(({ value }) => Number(value))
    @IsOptional()
    size?: number;
    @IsString()
    @IsOptional()
    status?: string;
    @Transform(({ value }) => JSON.parse(value))
    @ValidateNested({ each: true })
    @Type(() => AmenityDto)
    @IsOptional()
    amenities?: AmenityDto[];
}