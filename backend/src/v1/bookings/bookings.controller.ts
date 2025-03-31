/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('api/v1/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  async getAllBookings() {
    const data = await this.bookingsService.findAll();
    return { success: true, data };
  }

  @Delete(':bookingId')
  async cancelBooking(@Param('bookingId') id: string) {
    return await this.bookingsService.cancelBooking(id);
  }

  @Patch(':bookingId/check-in')
  async checkIn(@Param('bookingId') id: string) {
    return await this.bookingsService.requestCheckIn(id);
  }

  @Patch(':bookingId/check-out')
  async checkOut(@Param('bookingId') id: string) {
    return await this.bookingsService.checkOut(id);
  }
}
