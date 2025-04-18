import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingsService } from './bookings.service';
import { Booking } from 'src/common/entities/booking.entity';

describe('BookingsService', () => {
  let service: BookingsService;
  let bookingRepository: Repository<Booking>;

  const mockBooking = {
    id: '1',
    bookingStatus: 'confirmed',
    bookingVia: 'online',
    checkIn: new Date('2025-01-01'),
    checkOut: new Date('2025-01-05'),
    createdAt: new Date('2024-12-01'),
    hotel: { id: 1 },
    room: {
      id: 'room1',
      roomNumber: '101',
      type: 'Deluxe',
    },
    guest: {
      id: 'guest1',
      firstName: 'John',
      lastName: 'Doe',
    },
    transactions: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: getRepositoryToken(Booking),
          useValue: {
            find: jest.fn().mockResolvedValue([mockBooking]),
          },
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    bookingRepository = module.get<Repository<Booking>>(getRepositoryToken(Booking));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllBookings', () => {
    it('should return all bookings for a hotel', async () => {
      const hotelId = 1;
      const expectedResponse = {
        success: true,
        data: [
          {
            bookingId: '1',
            guestId: 'guest1',
            guestFirstName: 'John',
            guestLastName: 'Doe',
            roomNum: '101',
            roomType: 'Deluxe',
            checkIn: new Date('2025-01-01'),
            checkOut: new Date('2025-01-05'),
            bookingStatus: 'confirmed',
            createdAt: new Date('2024-12-01'),
          },
        ],
      };

      const result = await service.getAllBookings(hotelId);

      expect(result).toEqual(expectedResponse);
      expect(bookingRepository.find).toHaveBeenCalledWith({
        where: { hotel: { id: hotelId } },
        relations: ['room', 'guest'],
      });
    });

    it('should return empty data if no bookings are found', async () => {
      const hotelId = 2;
      jest.spyOn(bookingRepository, 'find').mockResolvedValue([]);
      const expectedResponse = {
        success: true,
        data: [],
      };

      const result = await service.getAllBookings(hotelId);

      expect(result).toEqual(expectedResponse);
      expect(bookingRepository.find).toHaveBeenCalledWith({
        where: { hotel: { id: hotelId } },
        relations: ['room', 'guest'],
      });
    });

    it('should throw an error if the repository query fails', async () => {
      const hotelId = 1;
      jest.spyOn(bookingRepository, 'find').mockRejectedValue(new Error('DB Error'));

      await expect(service.getAllBookings(hotelId)).rejects.toThrow('DB Error');
    });
  });
});