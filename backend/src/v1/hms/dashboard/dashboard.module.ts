import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Booking } from '../../../common/entities/booking.entity';
import { Transaction } from '../../../common/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Transaction])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
