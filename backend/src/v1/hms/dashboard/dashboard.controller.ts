import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import {
  CountryBookingResponse,
  DemographicsResponse,
  TotalBookingsResponse,
} from './dto/dashboard-response.dto';

@Controller('/hms/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('countries')
  async getCountryBookings(
    @Query('hotelId') hotelId: string,
  ): Promise<CountryBookingResponse> {
    const countryStats =
      await this.dashboardService.getCountryBookings(hotelId);
    return {
      success: true,
      country: countryStats,
    };
  }

  @Get('demographics')
  async getDemographics(
    @Query('hotelId') hotelId: string,
  ): Promise<DemographicsResponse> {
    const { male, female } =
      await this.dashboardService.getDemographics(hotelId);
    return {
      success: true,
      male,
      female,
    };
  }

  @Get('bookings')
  async getTotalBookings(
    @Query('hotelId') hotelId: string,
  ): Promise<TotalBookingsResponse> {
    const booked = await this.dashboardService.getTotalBookings(hotelId);
    return {
      success: true,
      booked,
    };
  }
}
