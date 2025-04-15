/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from 'src/common/entities/booking.entity';
import { Room } from 'src/common/entities/room.entity';
import * as dayjs from 'dayjs';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ResponseCreateBookingDto } from './dto/response-create-booking.dto';
import { Hotel } from 'src/common/entities/hotel.entity';
import { User } from 'src/common/entities/user.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async getAllBookings() {
    const bookings = await this.bookingRepository.find({ relations: ['room', 'hotel'] });
    return {
      success: true,
      data: bookings.map(booking => ({
        bookingId: booking.id,
        roomType: booking.room.type,
        occupancy: booking.room.occupancy,
        price: booking.room.price,
        hotel: booking.hotel.name,
        roomDescription: booking.room.description,
      })),
    };
  }
  async getUserBookings(email: string) {
    return this.bookingRepository.find({
      where: { guest: { email } },
      relations: ['hotel', 'room'],
    });
  }

  async cancelBooking(bookingId: string): Promise<boolean> {
    const booking = await this.bookingRepository.findOne({ where: { id: bookingId } });
    if (!booking) return false;

    const today = dayjs();
    const checkInDate = dayjs(booking.checkIn);
    if (checkInDate.diff(today, 'day') < 1) return false;

    booking.bookingStatus = 'canceled';
    await this.bookingRepository.save(booking);
    return true;
  }

  async requestCheckIn(bookingId: string) {
    const booking = await this.bookingRepository.findOne({ where: { id: bookingId } });
    if (!booking) throw new Error('Booking not found');
    // Logic for handling check-in request
  }

  async checkOut(bookingId: string): Promise<number> {
    const booking = await this.bookingRepository.findOne({ where: { id: bookingId }, relations: ['room'] });
    if (!booking) throw new Error('Booking not found');

    booking.bookingStatus = 'confirmed';
    await this.bookingRepository.save(booking);

    const room = booking.room;
    room.status = 'not clean';
    await this.roomRepository.save(room);

    return booking.room.price;
  }


    async createBooking(
        hotelId: number,
        roomId: string,
        createBookingDto: CreateBookingDto
    ): Promise<any> {
        try {
            const checkInDate = new Date(createBookingDto.checkIn);
            const checkOutDate = new Date(createBookingDto.checkOut);
    
            console.log('Check-in:', checkInDate);
            console.log('Check-out:', checkOutDate);
    
            // Ensure checkIn is before checkOut
            if (checkInDate >= checkOutDate) {
                throw new BadRequestException('checkIn must be before checkOut');
            }
    
            // Ensure dates are not in the past
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize to midnight for accurate comparison
    
            if (checkInDate < today || checkOutDate < today) {
                throw new BadRequestException('Dates cannot be in the past');
            }
    
            // Fetch related entities
            const hotel = await this.bookingRepository.manager.findOne(Hotel, { where: { id: hotelId } });
            const room = await this.bookingRepository.manager.findOne(Room, { where: { id: roomId } });
            const guest = await this.bookingRepository.manager.findOne(User, { where: { id: createBookingDto.guestId } });
            if (!hotel || !room || !guest) {
                throw new Error('Invalid hotel, room, or guest ID');
            }
  

            const booking = this.bookingRepository.create({
                ...createBookingDto,
                createdAt: new Date(),
                hotel,
                room,
                guest,
            });
    
            // Save to database
            const savedBooking = await this.bookingRepository.save(booking);
    
            // Map the saved booking to ResponseCreateBookingDto
            const response: ResponseCreateBookingDto = {
                bookingId: savedBooking.id,
                status: savedBooking.bookingStatus,
            };

            const roomToUpdate = await this.roomRepository.findOne({ where: { id: roomId } });
            if (roomToUpdate) {
                roomToUpdate.status = 'occupied';
                await this.roomRepository.save(roomToUpdate);
            }
    
            return {
                success: true,
                data: response,
            };
        } catch (error) {
            throw new Error(`Failed to create booking: ${error.message}`);
        }
    }   
    
}
