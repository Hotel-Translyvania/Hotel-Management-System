/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { HotelService } from './hotels.service';
import {Post, Body, Get, Param } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';




@Controller('hotels')
export class HotelsController {

    constructor(private hotelService : HotelService){}


    @Get()
     async getHotel() {
    const hotel = this.hotelService.getHotel();

    return { Sucess : true ,
      data : hotel 
     }
  }

  
  @Post()
  async CreateHotel(@Body() createhoteldto:CreateHotelDto) {
     const hotel = await this.hotelService.createHotel(createhoteldto);
     return { Sucess : true ,
      data : hotel 
     }
  }







}
