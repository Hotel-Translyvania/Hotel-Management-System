/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from '../bookings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from 'src/common/entities/booking.entity';
import { Room } from 'src/common/entities/room.entity';
import { Repository } from 'typeorm';
import { CreateBookingDto } from '../dto/create-booking.dto';

const dto: CreateBookingDto = {
    guestId: '1',
    checkIn: new Date(Date.now() + 86400000).toISOString(),       // valid ISO string
    checkOut: new Date(Date.now() + 2 * 86400000).toISOString(),  // valid ISO string
  };
  

describe('BookingService', () => {
  let service: BookingService;
  let bookingRepo: Repository<Booking>;
  let roomRepo: Repository<Room>;

  const mockBookingRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    manager: {
      findOne: jest.fn(),
    },
  };

  const mockRoomRepo = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        { provide: getRepositoryToken(Booking), useValue: mockBookingRepo },
        { provide: getRepositoryToken(Room), useValue: mockRoomRepo },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
    bookingRepo = module.get(getRepositoryToken(Booking));
    roomRepo = module.get(getRepositoryToken(Room));
  });

  it('should return all bookings with mapped data', async () => {
    const mockBooking = {
      id: '1',
      room: {
        type: 'Deluxe',
        occupancy: 2,
        price: 200,
        description: 'Nice room',
      },
      hotel: { name: 'Test Hotel' },
    };
    mockBookingRepo.find.mockResolvedValue([mockBooking]);

    const result = await service.getAllBookings();
    expect(result.success).toBe(true);
    expect(result.data[0].bookingId).toBe('1');
  });

  it('should cancel booking if check-in is more than 1 day ahead', async () => {
    const mockBooking = {
      id: '123',
      checkIn: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      bookingStatus: 'confirmed',
    };
    mockBookingRepo.findOne.mockResolvedValue(mockBooking);
    mockBookingRepo.save.mockResolvedValue({
      ...mockBooking,
      bookingStatus: 'canceled',
    });

    const result = await service.cancelBooking('123');
    expect(result).toBe(true);
  });

  it('should fail cancel if booking not found', async () => {
    mockBookingRepo.findOne.mockResolvedValue(null);
    const result = await service.cancelBooking('not-exist');
    expect(result).toBe(false);
  });

  it('should throw error if check-in date is before today', async () => {
    const mockBooking = {
      id: '123',
      checkIn: new Date(Date.now() - 24 * 60 * 60 * 1000),
      bookingStatus: 'confirmed',
    };
    mockBookingRepo.findOne.mockResolvedValue(mockBooking);
    const result = await service.cancelBooking('123');
    expect(result).toBe(false);
  });

  it('should create a booking and update room status', async () => {
    const dto: CreateBookingDto = {
      guestId: '1',
      checkIn: new Date(Date.now() + 86400000).toISOString(),
      checkOut: new Date(Date.now() + 2 * 86400000).toISOString(),
    };

    mockBookingRepo.manager.findOne.mockResolvedValue({});
    mockBookingRepo.create.mockReturnValue(dto);
    mockBookingRepo.save.mockResolvedValue({
      id: 'new-booking',
      bookingStatus: 'pending',
    });
    mockRoomRepo.findOne.mockResolvedValue({ id: '1', status: 'available' });

    const result = await service.createBooking(1, '1', dto);
    expect(result.success).toBe(true);
    expect(result.data.bookingId).toBe('new-booking');
  });
});
