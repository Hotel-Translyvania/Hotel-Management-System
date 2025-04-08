
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from 'src/common/entities/room.entity';
import { Amenity } from 'src/common/entities/amenities.entity';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Amenity)
    private readonly amenityRepository: Repository<Amenity>,
  ) { }

  async createRoom(hotelId: number, createRoomDto: CreateRoomDto) {
    const amenities: Amenity[] = [];

    console.log('Create Room DTO:', createRoomDto);
    console.log('Hotel ID:', hotelId);
    if (createRoomDto.amenities) {
      for (const amenityDto of createRoomDto.amenities) {
        console.log('Amenity DTO:', amenityDto);
        let amenity = await this.amenityRepository.findOne({
          where: { name: amenityDto.amenityName }, // ✅ Search by name
        });
        if (!amenity) {
          amenity = this.amenityRepository.create({
            name: amenityDto.amenityName, // ✅ Let DB generate ID
          });
          await this.amenityRepository.save(amenity);
        }
        amenities.push(amenity);
      }
    }
    // Check if hotel exists
    const hotel = await this.roomRepository.manager.findOne('Hotel', {
      where: { id: hotelId },
    });

    if (!hotel) {
      throw new Error(`Hotel with ID ${hotelId} not found`);
    }

    const room = this.roomRepository.create({
      ...createRoomDto,
      hotel: hotel, // Assign the hotel entity directly
      amenities,
      status: createRoomDto.status || 'available',
    });

    return this.roomRepository.save(room);
  }
  async updateRoom(roomId: string, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      relations: ['amenities'],
    });

    if (!room) {
      throw new Error(`Room with ID ${roomId} not found`);
    }

    // Update amenities if provided
    // if (updateRoomDto.amenities) {
    //   const amenities: Amenity[] = [];
    //   for (const amenityDto of updateRoomDto.amenities) {
    //     let amenity = await this.amenityRepository.findOne({
    //       where: { name: amenityDto.amenityName },
    //     });
    //     if (!amenity) {
    //       amenity = this.amenityRepository.create({
    //         name: amenityDto.amenityName,
    //       });
    //       await this.amenityRepository.save(amenity);
    //     }
    //     amenities.push(amenity);
    //   }
    //   room.amenities = amenities;
    // }

    // Update other fields
    Object.assign(room, updateRoomDto);

    return this.roomRepository.save(room);
  }

  async deleteRoom(roomId: string) {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
    });

    if (!room) {
      throw new Error(`Room with ID ${ roomId } not found`);
    }

    await this.roomRepository.remove(room);
    return { success: true, message: 'Room deleted successfully' };
  }
}