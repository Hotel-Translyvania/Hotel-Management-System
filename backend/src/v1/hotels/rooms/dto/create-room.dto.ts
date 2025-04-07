import { IsNotEmpty, IsNumber, IsString, IsUUID, IsDecimal, isURL, IsUrl} from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  hotelId: string

  @IsUUID()
  @IsNotEmpty()
  roomId: string



  @IsNumber()
  @IsNotEmpty()
  bed: number;

  @IsNumber()
  @IsNotEmpty()
  size: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  occupancy: number;

  @IsDecimal()
  @IsNotEmpty()
  pricePerDay: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;
}
