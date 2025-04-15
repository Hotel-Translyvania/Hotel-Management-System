/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { Booking } from 'src/common/entities/booking.entity';
import { User } from 'src/common/entities/user.entity';
import { Hotel } from 'src/common/entities/hotel.entity';
import { Room } from 'src/common/entities/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './bookings.controller';
import { BookingService } from './bookings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User, Hotel, Room])],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingsModule {}