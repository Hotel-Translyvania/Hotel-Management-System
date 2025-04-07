import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { NotFoundException } from '@nestjs/common';
import { Hotel } from 'src/common/entities/hotel.entity';


@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,

  ) { }

  //only works with hotel image in the web
  async createHotel(createHotelDto: CreateHotelDto): Promise<Hotel> {
    try {
      const hotel = this.hotelRepository.create(createHotelDto);
      return this.hotelRepository.save(hotel);      //Saves the hotel data in the database
    } catch (error) {
      console.error('Error:', error.message);
      throw new InternalServerErrorException('Failed to add hotel', { cause: error.message });

    }
  }

  async getHotels(): Promise<Hotel[]> {
    const hotels = await this.hotelRepository.find();
    if (hotels.length == 0) {
      throw new NotFoundException(`Hotel not found`);  // Throws 'Hotel not Found exception if there no hotel inside the database 
    }
    return hotels;  //Returns all hotels 
  }
}


