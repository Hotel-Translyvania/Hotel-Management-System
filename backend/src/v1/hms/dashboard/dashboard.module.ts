import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Booking } from './entities/booking.entity';
import { Guest } from './entities/guest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Guest])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
