/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
  ) {}

  async findAll() {
    const bookings = await this.bookingRepo.find({
      relations: ['room', 'hotel'],
    });
    // return bookings.map((b) => ({
    //   bookingId: b.id,
    //   roomType: b.room?.type,
    //   occupancy: b.room?.occupancy,
    //   price: b.room?.price,
    //   hotel: b.hotel?.name,
    //   roomDescription: b.room?.description,
    // }));
  }

  async cancelBooking(id: string) {
    const booking = await this.bookingRepo.findOne({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');

    const today = new Date();
    const checkInDate = new Date(booking.check_in);
    const diff = (checkInDate.getTime() - today.getTime()) / (1000 * 3600 * 24);

    if (diff < 1)
      throw new BadRequestException(
        'Cancellation only allowed at least 1 day before check-in',
      );

    booking.booking_status = BookingStatus.CANCELED;
    await this.bookingRepo.save(booking);
    return { success: true, message: 'Booking canceled successfully' };
  }

  async requestCheckIn(id: string) {
    const booking = await this.bookingRepo.findOne({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');

    // Assume status change is handled by HMS
    return {
      success: true,
      message: 'Check-in requested, pending staff validation',
    };
  }

  async checkOut(id: string) {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: ['room'],
    });
    if (!booking) throw new NotFoundException('Booking not found');

    // Mark room as not clean (assume such logic exists in RoomService)
    // roomService.markAsNotClean(booking.room.id);

    return {
      success: true,
      message: 'Check-out successful',
      totalAmount: 140.0, // Normally calculated from stay duration and price
    };
  }
}
