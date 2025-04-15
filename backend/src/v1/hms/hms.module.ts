import { Module } from '@nestjs/common';
import { HmsService } from './hms.service';
import { HmsController } from './hms.controller';
import { DashboardModule } from './dashboard/dashboard.module';
import { RoomsModule } from './rooms/rooms.module';
import { BookingsModule } from './bookings/booking.module';
import { FoodModule } from './food-menu/food.module';
import { StaffModule } from './staff/staff.module';
import { ManagerModule } from './manager/manager.module';
@Module({
  imports: [DashboardModule,RoomsModule,BookingsModule, FoodModule, StaffModule, ManagerModule],
  providers: [HmsService],
  controllers: [HmsController]
})
export class HmsModule {}
