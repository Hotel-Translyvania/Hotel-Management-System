import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageUploadService } from '../../../common/services/image-upload.service';
import { Booking } from 'src/common/entities/booking.entity';
import { Hotel } from 'src/common/entities/hotel.entity';
import { Room } from 'src/common/entities/room.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Room, Hotel,Booking])],
  controllers: [RoomsController],
  providers: [RoomsService, ImageUploadService],
  exports:[RoomsService]
})
export class RoomsModule {}
