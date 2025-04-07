import { Module } from '@nestjs/common';
import { FoodMenuController } from './food-menu.controller';
import { FoodMenuService } from './food-menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from 'src/common/entities/food.entity';
import { Order } from 'src/common/entities/order.entity';
import { OrderItem } from 'src/common/entities/order-item.entity';
import { Booking } from 'src/common/entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Food,Order,OrderItem,Booking])],
  controllers: [FoodMenuController],
  providers: [FoodMenuService]
})
export class FoodMenuModule {}
