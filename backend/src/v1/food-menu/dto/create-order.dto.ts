import { IsNotEmpty, IsUUID, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsNotEmpty()
  foodId: string;

  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  bookingId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}


  