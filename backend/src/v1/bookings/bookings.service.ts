/* eslint-disable prettier/prettier */
// bookings/bookings.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../../common/entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  findAll() {
    return this.bookingRepository.find({
      relations: ['hotelId', 'roomId', 'guestId'],
    });
  }

  async cancelBooking(
    id: string,
  ): Promise<{ success: boolean; message: string }> {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    if (!booking) throw new Error('Booking not found');

    const today = new Date();
    const checkInDate = new Date(booking.checkIn);
    if (checkInDate <= today)
      throw new Error('Cancellation not allowed on check-in day');

    booking.bookingStatus = 'canceled';
    await this.bookingRepository.save(booking);
    return { success: true, message: 'Booking canceled successfully' };
  }

  async checkIn(id: string): Promise<{ success: boolean; message: string }> {
    return {
      success: true,
      message: 'Check-in requested, pending staff validation',
    };
  }

  async checkOut(
    id: string,
  ): Promise<{ success: boolean; message: string; totalAmount: number }> {
    return {
      success: true,
      message: 'Check-out successful',
      totalAmount: 140.0,
    };
  }
}
