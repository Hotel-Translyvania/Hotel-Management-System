import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelService } from './hotels.service';
import { RoomsModule } from './rooms/rooms.module';
import { ImageUploadService } from '../../common/services/image-upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from 'src/common/entities/hotel.entity';
import { Booking } from 'src/common/entities/booking.entity';
import { Food } from 'src/common/entities/food.entity';
import { Order } from 'src/common/entities/order.entity';
import { OrderItem } from 'src/common/entities/order-item.entity';

@Module({
  imports: [RoomsModule,TypeOrmModule.forFeature([Hotel,Booking,Food,Order,OrderItem]),],
  controllers: [HotelsController],
  providers: [HotelService,ImageUploadService]
})
export class HotelsModule {}
