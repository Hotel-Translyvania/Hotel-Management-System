

import { HotelService } from 'src/v1/hotels/hotels.service';
import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/common/services/image-upload.service';
import { Ingredient } from 'src/common/entities/ingredient.entity';
// import { AuthGuard } from 'src/auth/auth.guard';

@Controller('hms/hotels/:hotelId')
// @UseGuards(AuthGuard)
export class FoodController {
  constructor
    (
      private readonly foodService: FoodService,
      private imageUploadService: ImageUploadService
    ) { }

  @Post('food')
  @UseInterceptors(FileInterceptor('image', { dest: './uploads/' }))
  async addFoodItem(
    @UploadedFile() file: Express.Multer.File,
    @Param('hotelId') hotelId: number,
    @Body() createFoodDto: CreateFoodDto) {


    console.log("before", createFoodDto.ingredients);
    const uploadedImage = await this.imageUploadService.uploadImage(file.path, `food-${Date.now()}`);
    createFoodDto.image = uploadedImage;


    await this.foodService.addFoodItem(createFoodDto, hotelId);
    return { success: true, message: 'Food item added successfully', image: createFoodDto.image };
  }

  @Get('orders')
  async viewAllOrders() {
    return this.foodService.viewAllOrders();
  }

  @Delete('food/:id')
  async deleteFoodItem(
    @Param('hotelId') hotelId: number,
    @Param('id') id: string,
  ) {
    return await this.foodService.deleteFoodItem(id, hotelId);
  }


}