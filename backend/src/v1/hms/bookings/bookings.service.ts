import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/common/entities/booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async getAllBookings(hotelId: number) {
    try {
      const bookings = await this.bookingRepository.find({
        where: { hotel: { id: hotelId } },
        relations: ['room', 'guest'],
      });
      return {
        success: true,
        data: bookings.map(booking => ({
          bookingId: booking.id,
          guestId: booking.guest.id,
          guestFirstName: booking.guest.firstName,
          guestLastName: booking.guest.lastName,
          roomNum: booking.room.roomNumber,
          roomType: booking.room.type,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          bookingStatus: booking.bookingStatus,
          createdAt: booking.createdAt,
        })),
      };
    } catch (error) {
      throw new Error(`Failed to fetch bookings: ${error.message}`);
    }
  }}