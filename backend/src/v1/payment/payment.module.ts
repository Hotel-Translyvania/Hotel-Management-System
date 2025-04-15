import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/common/entities/transaction.entity';
import { Booking } from 'src/common/entities/booking.entity';
import { EmailService } from 'src/common/services/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction,Booking])], // Add your entities here
  providers: [PaymentService, EmailService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
