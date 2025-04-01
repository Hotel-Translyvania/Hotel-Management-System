/* eslint-disable prettier/prettier */
// bookings/bookings.controller.ts
import { Controller, Get, Delete, Patch, Param, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
// import { AuthGuard } from '../auth/auth.guard';

@Controller('bookings')
// @UseGuards(AuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Delete(':bookingId')
  cancelBooking(@Param('bookingId') bookingId: string) {
    return this.bookingsService.cancelBooking(bookingId);
  }

  @Patch(':bookingId/check-in')
  checkIn(@Param('bookingId') bookingId: string) {
    return this.bookingsService.checkIn(bookingId);
  }

  @Patch(':bookingId/check-out')
  checkOut(@Param('bookingId') bookingId: string) {
    return this.bookingsService.checkOut(bookingId);
  }
}