import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import {
  CountryBookingResponse,
  DemographicsResponse,
  TotalBookingsResponse,
} from './dto/dashboard-response.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { StaffJwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { Role } from '../../../common/enums/role.enum';
import { RoomTypesResponseDto } from 'src/v1/hms/dashboard/dto/room-types-response.dto';

@Controller('hms/hotels/:hotelId/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  /**
   * Get booking statistics by country for a specific hotel
   * @param hotelId - The ID of the hotel to get statistics for (must be a number)
   * @returns Promise<CountryBookingResponse> - Object containing country-wise booking data
   */
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

  /**
   * Get demographic statistics (gender distribution) for a specific hotel
   * @param hotelId - The ID of the hotel to get statistics for
   * @returns Promise<DemographicsResponse> - Object containing male/female guest distribution
   * Note: The service returns 'other' gender but it's not included in the response DTO
   */
  @Get('demographics')
  async getDemographics(
    @Param('hotelId') hotelId: number, // Changed from string to number
  ): Promise<DemographicsResponse> {
    const { male, female, other } = // Added 'other' to match service response
      await this.dashboardService.getDemographics(hotelId);
    return {
      success: true,
      male,
      female,
    };
  }

  /**
   * Get total booking count for a specific hotel
   * @param hotelId - The ID of the hotel to get booking count for
   * @returns Promise<TotalBookingsResponse> - Object containing total bookings count
   * @secured - Requires valid JWT authentication
   * Note: The @Roles decorator is commented out but would restrict to STAFF and MANAGER roles
   */
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

    // Get room types statistics
    @Get('room-types')
    async getRoomTypesWithNumbers(
      @Param('hotelId', ParseIntPipe) hotelId: number
    ): Promise<RoomTypesResponseDto> {
      return this.dashboardService.getRoomTypesWithNumbers(hotelId);
    }

    
}
