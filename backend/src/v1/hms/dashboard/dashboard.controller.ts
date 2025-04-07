import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import {
  CountryBookingResponse,
  DemographicsResponse,
  TotalBookingsResponse,
} from './dto/dashboard-response.dto';

@Controller('hms/hotels/:hotelId/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('countries')
  async getCountryBookings(
    @Param('hotelId') hotelId: number, // Changed from string to number
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
    @Param('hotelId') hotelId: number, // Changed from string to number
  ): Promise<DemographicsResponse> {
    const { male, female, other } = // Added 'other' to match service response
      await this.dashboardService.getDemographics(hotelId);
    return {
      success: true,
      male,
      female, // Added 'other' to response
    };
  }

  @Get('bookings')
  async getTotalBookings(
    @Param('hotelId') hotelId: number, // Changed from string to number
  ): Promise<TotalBookingsResponse> {
    const booked = await this.dashboardService.getTotalBookings(hotelId);
    return {
      success: true,
      booked,
    };
  }

  @Get('revenue')
  async getTotalRevenue(
    @Param('hotelId') hotelId: number, // Changed from string to number
  ): Promise<{ success: boolean; revenue: number }> {
    return await this.dashboardService.getTotalRevenue(hotelId);
  }
}
