/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from '../bookings.controller';
import { BookingService } from '../bookings.service';
import { CreateBookingDto } from '../dto/create-booking.dto';



const dto: CreateBookingDto = {
    guestId: '1',
    checkIn: new Date().toISOString(),       // valid ISO string
    checkOut: new Date(Date.now() + 86400000).toISOString(), // valid ISO string
  };
  
describe('BookingController', () => {
  let controller: BookingController;
  let service: BookingService;

  const mockBookingService = {
    getAllBookings: jest.fn(),
    getUserBookings: jest.fn(),
    cancelBooking: jest.fn(),
    requestCheckIn: jest.fn(),
    checkOut: jest.fn(),
    createBooking: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        { provide: BookingService, useValue: mockBookingService },
      ],
    }).compile();

    controller = module.get<BookingController>(BookingController);
    service = module.get<BookingService>(BookingService);
  });

  it('should get all bookings', async () => {
    mockBookingService.getAllBookings.mockResolvedValue({ success: true, data: [] });
    const result = await controller.getAllBookings();
    expect(result.success).toBe(true);
  });

  it('should get user bookings', async () => {
    mockBookingService.getUserBookings.mockResolvedValue([
      {
        id: '1',
        bookingStatus: 'confirmed',
        checkIn: new Date(),
        checkOut: new Date(),
        hotel: { id: 1, name: 'Test Hotel' },
        room: { id: 'r1', roomNumber: '101' },
        createdAt: new Date(),
      },
    ]);

    const result = await controller.getMyBookings({ user: { email: 'test@example.com' } });
    expect(result[0].hotel.name).toBe('Test Hotel');
  });

  it('should cancel a booking', async () => {
    mockBookingService.cancelBooking.mockResolvedValue(true);
    const result = await controller.cancelBooking('1');
    expect(result.success).toBe(true);
  });

  it('should throw error on invalid cancel', async () => {
    mockBookingService.cancelBooking.mockResolvedValue(false);
    await expect(controller.cancelBooking('bad-id')).rejects.toThrow();
  });

  it('should request check-in', async () => {
    const result = await controller.requestCheckIn('1');
    expect(result.success).toBe(true);
  });

  it('should check out and return total', async () => {
    mockBookingService.checkOut.mockResolvedValue(100);
    const result = await controller.checkOut('1');
    expect(result.totalAmount).toBe(100);
  });

  it('should create booking', async () => {
    const dto: CreateBookingDto = {
        guestId: '1',
        checkIn: new Date().toISOString(),
        checkOut: new Date(Date.now() + 86400000).toISOString(),
      };

    mockBookingService.createBooking.mockResolvedValue({
      success: true,
      data: { bookingId: '123', status: 'pending' },
    });

    const result = await controller.createBooking(1, 'room1', dto);
    expect(result.success).toBe(true);
  });
});
