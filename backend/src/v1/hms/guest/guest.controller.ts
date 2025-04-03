import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { GuestService } from './guest.service';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { User } from 'src/common/entities/user.entity';

@Controller('api/v1/hms/hotels/:hotelId/guests')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Get()
  async getAllGuests(@Param('hotelId') hotelId: string) {
    const guests = await this.guestService.getAllGuests(hotelId);
    return {
      success: true,
      data: guests.map(guest => ({
        guestId: guest.id,
        name: guest.name,
        email: guest.email,
        phone: guest.phone,
        gender: guest.gender,
        address: guest.address,
        nationality: guest.nationality,
        idType: guest.identificationType,
        idNumber: guest.identificationNumber
      }))
    };
  }

  @Put(':id')
  async updateGuest(
    @Param('hotelId') hotelId: string,
    @Param('id') guestId: string,
    @Body() updateGuestDto: UpdateGuestDto,
  ) {
    const updatedGuest = await this.guestService.updateGuest(
      hotelId,
      guestId,
      updateGuestDto
    );

    return {
      success: true,
      data: {
        guestId: updatedGuest.id,
        name: updatedGuest.name,
        phone: updatedGuest.phone,
        address: updatedGuest.address,
        idType: updatedGuest.identificationType,
        idNumber: updatedGuest.identificationNumber
      }
    };
  }
}