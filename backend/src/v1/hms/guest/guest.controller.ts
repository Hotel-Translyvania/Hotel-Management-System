import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { GuestService } from './guest.service';
import { UpdateGuestDto } from './dto/update-guest.dto';

@Controller('hotels/:hotelId')
export class GuestController {

    constructor(
        private guestService: GuestService
    ) { }

    @Post('guest')
    async createGuest(
        @Body() createGuestDto: CreateGuestDto,
    ) {
        return await this.guestService.createGuest(createGuestDto);
    }

    @Get('guests')
    async getAllGuests(
    ){
        return await this.guestService.getAllGuests();
    }

    @Patch('guest/:id')
    async updateGuest(
        @Param('id') id: string,
        @Body() updateGuestDto: UpdateGuestDto,
    ) {
        console.log("id is: ", id);
        console.log("updateGuestDto is: ", updateGuestDto);
        return await this.guestService.updateGuest(id, updateGuestDto);
    }

    @Delete('guest/:id')
    async deleteGuest(
        @Param('id') id: string,
    ){
        return await this.guestService.deleteGuest(id);
    }


}
