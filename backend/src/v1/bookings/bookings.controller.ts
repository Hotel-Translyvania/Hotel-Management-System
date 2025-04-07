/* eslint-disable prettier/prettier */
import { Controller, Get, Delete, Patch, Param, UseGuards, HttpException, HttpStatus, Post, Body } from '@nestjs/common';
import { BookingService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
// import { AuthGuard } from '../auth/auth.guard';

@Controller('hotels/:hotelId')
// @UseGuards(AuthGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Get('bookings')
  async getAllBookings() {
    return this.bookingService.getAllBookings();
  }

  @Delete('bookings/:bookingId')
  async cancelBooking(@Param('bookingId') bookingId: string) {
    const success = await this.bookingService.cancelBooking(bookingId);
    if (!success) {
      throw new HttpException('Cancellation not allowed', HttpStatus.BAD_REQUEST);
    }
    return { success: true, message: 'Booking canceled successfully' };
  }

  @Patch('bookings/:bookingId/check-in')
  async requestCheckIn(@Param('bookingId') bookingId: string) {
    await this.bookingService.requestCheckIn(bookingId);
    return { success: true, message: 'Check-in requested, pending staff validation' };
  }

  @Patch('bookings/:bookingId/check-out')
  async checkOut(@Param('bookingId') bookingId: string) {
    const totalAmount = await this.bookingService.checkOut(bookingId);
    return { success: true, message: 'Check-out successful', totalAmount };
  }

  @Post('rooms/:roomId/bookings')
  async createBooking(
    @Param('hotelId') hotelId: number,
    @Param('roomId') roomId: string,
    @Body() createBookingDto: CreateBookingDto) {
    return await this.bookingService.createBooking(hotelId, roomId,createBookingDto);
  }
}
