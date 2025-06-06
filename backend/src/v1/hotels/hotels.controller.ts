/* eslint-disable prettier/prettier */
import { Controller, InternalServerErrorException, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { HotelService } from './hotels.service';
import { Post, Body, Get, Param } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/common/services/image-upload.service';
import { UpdateHotelDto } from './dto/update-hotel.dto';



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
         Success: true,
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
      try{
         const uploadResult = await this.cloudinaryService.uploadImage(file.path, publicId);

         createHotelDto.image = uploadResult;
      } catch (e){
         throw new InternalServerErrorException(e.message)
      }
      return await this.hotelService.createHotel(createHotelDto);
   }

   @Patch('/:id')
     async updateHotel(
       @Param('id') id: string,
       @Body()UpdateHotelDto: UpdateHotelDto,
     ){
   
       return this.hotelService.updateHotel(id,UpdateHotelDto)
     }
}
