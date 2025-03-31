/* eslint-disable prettier/prettier */
import { IsOptional, IsEnum } from 'class-validator';
import { BookingStatus } from '../entities/booking.entity';

export class UpdateBookingDto {
  @IsOptional()
  @IsEnum(BookingStatus)
  booking_status?: BookingStatus;
}