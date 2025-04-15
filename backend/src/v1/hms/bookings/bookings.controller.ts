
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
// import { AuthGuard } from '../../auth/auth.guard';

@Controller('hms/hotels/:hotelId')
// @UseGuards(AuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get('reservations/bookings')
  async getAllBookings(@Param('hotelId') hotelId: number) {
    const bookings = await this.bookingsService.getAllBookings(hotelId);
    return bookings;
  }
}