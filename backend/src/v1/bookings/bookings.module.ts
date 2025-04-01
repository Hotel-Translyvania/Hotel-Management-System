/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../../common/entities/booking.entity';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]), // This makes BookingRepository available
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService], // If other modules need to use this service
})
export class BookingsModule {}
