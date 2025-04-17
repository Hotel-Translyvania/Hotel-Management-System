import { Test, TestingModule } from '@nestjs/testing';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';

describe('BookingsController', () => {
  let controller: BookingsController;
  let bookingsService: BookingsService;

  const mockBookingsService = {
    getAllBookings: jest.fn(),
  };

  const mockBookingResponse = {
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [
        {
          provide: BookingsService,
          useValue: mockBookingsService,
        },
      ],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
    bookingsService = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllBookings', () => {
    it('should return all bookings for a hotel', async () => {
      const hotelId = 1;
      mockBookingsService.getAllBookings.mockResolvedValue(mockBookingResponse);

      const result = await controller.getAllBookings(hotelId);

      expect(result).toEqual(mockBookingResponse);
      expect(bookingsService.getAllBookings).toHaveBeenCalledWith(hotelId);
    });
  });
});