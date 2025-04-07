import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Booking } from 'src/common/entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking,])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}