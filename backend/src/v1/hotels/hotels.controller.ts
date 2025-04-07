/* eslint-disable prettier/prettier */
import { Controller, InternalServerErrorException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { HotelService } from './hotels.service';
import { Post, Body, Get, Param } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/common/services/image-upload.service';



@Controller('hotels')
export class HotelsController {

   constructor(
      private hotelService: HotelService,
      private cloudinaryService: ImageUploadService,
   ) { }

   @Get()
   async getHotels() {
      const hotel = await this.hotelService.getHotels();
      return {
         Sucess: true,
         data: hotel
      }
   }
   @Post()
   @UseInterceptors(FileInterceptor('image', { dest: './uploads/' }))
   async addHotel(
      @UploadedFile() file: Express.Multer.File,
      @Body() createHotelDto: CreateHotelDto,
   ) {

      const publicId = `hotels-${Date.now()}`;
      const uploadResult = await this.cloudinaryService.uploadImage(file.path, publicId);

      createHotelDto.image = uploadResult;
      return await this.hotelService.createHotel(createHotelDto);
   }
}
