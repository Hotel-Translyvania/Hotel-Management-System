
import { Controller, Get, Post, Param, Body, UseGuards,Query } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomsService } from './rooms.service';

@Controller('hotels/:hotelId')
export class RoomsController {
  constructor(private readonly roomService: RoomsService){}

  @Get('rooms')
  async getRoomsByHotelId(@Param('hotelId') hotelId: number) {
    const rooms = await this.roomService.getRoomsByHotelId(hotelId); //Fetches all rooms by hotel id 
    return {
      success: true,
      rooms,
    };
  }


  @Get('rooms')
  //@UseGuards(JwtAuthGuard) // Ensure the user is authenticated
  async getAvailableRooms(
    @Param('hotelId') hotelId: number,
    @Query('check_in') checkIn: Date,
    @Query('check_out') checkOut: Date,

  ) {
    // Ensure check-in and check-out dates are provided in the query parameters
    if (!checkIn || !checkOut) {
      throw new Error('Missing required query parameters');
    }

    // Get available rooms from the service
    const availableRooms = await this.roomService.getAvailableRooms(
      hotelId,
      checkIn,
      checkOut,
    );

    return {
      success: true,
      data: availableRooms,
    };
  }
}





 



