import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Booking } from '../../../common/entities/booking.entity';
import { Transaction } from '../../../common/entities/transaction.entity';
import { Room } from 'src/common/entities/room.entity';

/**
 * Dashboard Module - Provides hotel analytics and reporting functionality
 * 
 * This module handles:
 * - Hotel booking statistics
 * - Guest demographics
 * - Country-wise booking data
 * - Other hotel performance metrics
 * 
 * Requires TypeORM entities: Booking and User
 */
@Module({
  imports: [TypeOrmModule.forFeature([Booking, Transaction, Room])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
