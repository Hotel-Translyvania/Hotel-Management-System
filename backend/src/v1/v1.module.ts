import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HotelsModule } from './hotels/hotels.module';
import { RoomsModule } from './hotels/rooms/rooms.module';
import { BookingsModule } from './bookings/bookings.module';
import { FoodMenuModule } from './food-menu/food-menu.module';
import { StaffModule } from './hms/staff/staff.module';
import { DashboardModule } from './hms/dashboard/dashboard.module';
import { HmsModule } from './hms/hms.module';
import { GuestModule } from './hms/guest/guest.module';
import { PaymentModule } from './payment/payment.module';
// import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [AuthModule, HotelsModule, BookingsModule, FoodMenuModule, HmsModule, GuestModule, PaymentModule]
})
export class V1Module {}
