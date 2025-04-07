
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  InternalServerErrorException,
  UseGuards,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoomsService } from './rooms.service';;
import { CreateRoomDto } from './dto/create-room.dto';
import { ImageUploadService } from 'src/common/services/image-upload.service';
// import { AuthGuard } from '../../auth/auth.guard';

@Controller('hms/hotels/:hotelId')
// @UseGuards(AuthGuard)
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly cloudinaryService: ImageUploadService,
  ) { }

  @Post('rooms')
  @UseInterceptors(FileInterceptor('image', { dest: './uploads/' }))
  async addRoom(
    @UploadedFile() file: Express.Multer.File,
    @Body() createRoomDto: CreateRoomDto,
    @Param('hotelId') hotelId: number,
  ) {
    console.log('File Path:', file.path);
    console.log(createRoomDto.amenities);
    if (typeof createRoomDto.amenities === 'string') {
      createRoomDto.amenities = JSON.parse(createRoomDto.amenities);
    }
    try {
      if (file.size > 2 * 1024 * 1024) {
        throw new BadRequestException('Image file too large (max 2MB allowed)');
      }

      const publicId = `room-${Date.now()}`;
      const uploadResult = await this.cloudinaryService.uploadImage(file.path, publicId);
      if (!uploadResult) {
        throw new InternalServerErrorException('Failed to upload image');
      }

      createRoomDto.image = uploadResult;
      await this.roomsService.createRoom(hotelId, createRoomDto);

      return {
        success: true,
        message: 'Room added successfully',
        image: createRoomDto.image,
      };
    } catch (error) {
      console.error('Error:', error.message);
      throw new InternalServerErrorException('Failed to add room', { cause: error.message });
    }
  }

}