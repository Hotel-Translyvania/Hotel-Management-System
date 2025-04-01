import { Module } from '@nestjs/common';
import { FoodMenuController } from './food-menu.controller';
import { FoodMenuService } from './food-menu.service';

@Module({
  controllers: [FoodMenuController],
  providers: [FoodMenuService]
})
export class FoodMenuModule {}
