import { Test, TestingModule } from '@nestjs/testing';
import { HotelService } from './hotels.service'; 
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from 'src/common/entities/hotel.entity'; 
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('HotelService', () => {
  let service: HotelService;
  let hotelRepository: jest.Mocked<Partial<Repository<Hotel>>>;

  beforeEach(async () => {
    hotelRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelService,
        {
          provide: getRepositoryToken(Hotel), // ✅ use actual entity
          useValue: hotelRepository,
        },
      ],
    }).compile();

    service = module.get<HotelService>(HotelService);
  });

  describe('createHotel', () => {
    it('should create and return a hotel', async () => {
      const dto = { name: 'Test', location: 'Addis', description: 'Nice', image: 'img.jpg' };
      const mockHotel = { id: 1, ...dto };

      (hotelRepository.create as jest.Mock).mockReturnValue(mockHotel);
      (hotelRepository.save as jest.Mock).mockResolvedValue(mockHotel);

      const result = await service.createHotel(dto);
      expect(result).toEqual(mockHotel);
      expect(hotelRepository.create).toHaveBeenCalledWith(dto);
      expect(hotelRepository.save).toHaveBeenCalledWith(mockHotel);
    });

    it('should throw InternalServerErrorException on save error', async () => {
      const dto = { name: 'Err', location: '', description: '', image: '' };
    
      (hotelRepository.create as jest.Mock).mockReturnValue(dto);
      (hotelRepository.save as jest.Mock).mockRejectedValue(
        new InternalServerErrorException('Failed to create hotel')
      );
    
      await expect(service.createHotel(dto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getHotels', () => {
    it('should return hotels', async () => {
      const hotels = [{ id: 1, name: 'H1' }, { id: 2, name: 'H2' }];
      (hotelRepository.find as jest.Mock).mockResolvedValue(hotels);

      const result = await service.getHotels();
      expect(result).toEqual(hotels);
    });

    it('should throw NotFoundException if no hotels', async () => {
      (hotelRepository.find as jest.Mock).mockResolvedValue([]);
      await expect(service.getHotels()).rejects.toThrow(NotFoundException);
    });
  });
});




