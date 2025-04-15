
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
  Patch,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoomsService } from './rooms.service';;
import { CreateRoomDto } from './dto/create-room.dto';
import { ImageUploadService } from 'src/common/services/image-upload.service';
import { UpdateRoomDto } from './dto/update-room.dto';
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
  @Patch('rooms/:roomId')
  @UseInterceptors(FileInterceptor('image', { dest: './uploads/' }))
  async updateRoom(
    @UploadedFile() file: Express.Multer.File,
    @Body() updateRoomDto: UpdateRoomDto,
    @Param('hotelId') hotelId: number,
    @Param('roomId') roomId: string,
  ) {
    try {
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          throw new BadRequestException('Image file too large (max 2MB allowed)');
        }
        const publicId = `room - ${Date.now()}`;
        const uploadResult = await this.cloudinaryService.uploadImage(file.path, publicId);
        if (!uploadResult) {
          throw new InternalServerErrorException('Failed to upload image');
        }
        updateRoomDto.image = uploadResult;
      }

      await this.roomsService.updateRoom(roomId, updateRoomDto);

      return {
        success: true,
        message: 'Room updated successfully',
      };
    } catch (error) {
      console.error('Error:', error.message);
      throw new InternalServerErrorException('Failed to update room', { cause: error.message });
    }
  }

  @Delete('rooms/:roomId')
  async deleteRoom(
    @Param('hotelId') hotelId: number,
    @Param('roomId') roomId: string,
  ) {
    try {
      await this.roomsService.deleteRoom(roomId); // Call the service method
      return {
        success: true,
        message: 'Room deleted successfully',
      };
    } catch (error) {
      console.error('Error:', error.message);
      throw new InternalServerErrorException('Failed to delete room', { cause: error.message });
    }
  }

}