import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { FoodMenuService } from './food-menu.service';

@Controller('hotels/:hotelId')
export class FoodMenuController {

    constructor(private readonly foodMenuService: FoodMenuService) {}

    @Get('Menu')
    async getAllFood(
        @Param('hotelId') hotelId: number,
    ) {
     return await this.foodMenuService.getAllFood(hotelId);
    }
    
    @Post('orders')
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        console.log('Received createOrderDto:', createOrderDto); // Debug log
        return this.foodMenuService.createOrder(createOrderDto);
    }
}
