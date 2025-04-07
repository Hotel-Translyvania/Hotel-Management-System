
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { ImageUploadService } from 'src/common/services/image-upload.service';
import { Room } from 'src/common/entities/room.entity';
import { Amenity } from 'src/common/entities/amenities.entity';
// import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Amenity]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService,ImageUploadService],
})
export class RoomsModule {}