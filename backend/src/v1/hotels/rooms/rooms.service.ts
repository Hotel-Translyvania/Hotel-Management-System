import { Injectable } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { ImageUploadService } from '../../../common/services/image-upload.service';
import { Repository,LessThan,MoreThan } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from '../entities/hotel.entity';
import { Booking } from 'src/common/entities/booking.entity';



@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private imageUploadService: ImageUploadService,
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking> 
    
  ) {}

  async getRoomsByHotelId(hotelId: string) {
    const hotel = await this.hotelRepository.findOne({
      where: { hotelId },
      relations: ['rooms'], 
    });      // Find the hotel by id and retreives the hotel includes the rooms from the database 

    if (!hotel) {
      throw new Error('Hotel not found');         
    }

    return hotel.rooms;  // Fetches all rooms in the hotel 
  }  


  async createRoom(hotelId: string, createRoomDto: CreateRoomDto): Promise<Room> {
    const hotel = await this.hotelRepository.findOne({ where: { hotelId } }); // Festches the hotel by hotel id 

    if (!hotel) {
      throw new Error('Hotel not found');
    }
    if (createRoomDto.image) {
    
        const publicId = `hotel-${Date.now()}`;      //Generate publici id 
        
  
        
        const imageUrl = await this.imageUploadService.uploadImage(createRoomDto.image, publicId); // Gets the the URL for the image which is stored on Cloudnary 
  
        
        createRoomDto.image = imageUrl; // Swaps the the new url for the original 
      }

    const room = this.roomRepository.create({
      ...createRoomDto,
      hotel, 
    });


    return await this.roomRepository.save(room); // Saves the room in the database 
  } 



  async getAvailableRooms(
    hotelId: string,
    checkInDate: Date,
    checkOutDate: Date,
    occupancy: number
  ): Promise<Room[]> {
    // Fetch the hotel with its rooms
    const hotel = await this.hotelRepository.findOne({
      where: { hotelId },
      relations: ['rooms'],
    });
  
    if (!hotel) {
      throw new Error('Hotel not found');
    }
  
    // Filter rooms based on occupancy
    let availableRooms = hotel.rooms.filter(
      (room) => room.occupancy >= occupancy && room.status !== 'occupied'
    );
  
    // Check room availability by filtering out booked rooms
    const filteredRooms = await Promise.all(
      availableRooms.map(async (room) => {
        const overlappingBookings = await this.bookingRepository.count({
          where: {
            // roomId: { id: room.roomId },
            checkIn: LessThan(checkOutDate) ,
            checkOut: MoreThan(checkInDate) ,
          },
        });
  
        return overlappingBookings === 0 ? room : null;
      })
    );
  
    
    availableRooms = filteredRooms.filter((room): room is Room => room !== null);  //Filters out the null values 
  
    return availableRooms;
  }
  



  
  








  





  
}















