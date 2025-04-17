import { Repository } from 'typeorm'; // Correct path
import { Booking } from '../../../common/entities/booking.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transaction } from '../../../common/entities/transaction.entity';
import { Room } from '../../../common/entities/room.entity';
import { DashboardService } from './dashboard.service';
describe('DashboardService', () => {
    let service: DashboardService;
    let bookingRepository: Repository<Booking>;
    let transactionRepository: Repository<Transaction>;
    let roomRepository: Repository<Room>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DashboardService,
                {
                    provide: getRepositoryToken(Booking),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Transaction),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Room),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<DashboardService>(DashboardService);
        bookingRepository = module.get<Repository<Booking>>(getRepositoryToken(Booking));
        transactionRepository = module.get<Repository<Transaction>>(getRepositoryToken(Transaction));
        roomRepository = module.get<Repository<Room>>(getRepositoryToken(Room));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getCountryBookings', () => {
        it('should return booking statistics grouped by country', async () => {
            const hotelId = 1;
            const mockResult = [
                { country: 'USA', count: '10' },
                { country: 'UK', count: '5' },
            ];
            jest.spyOn(bookingRepository, 'createQueryBuilder').mockImplementation(() => ({
                select: jest.fn().mockReturnThis(),
                addSelect: jest.fn().mockReturnThis(),
                innerJoin: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                groupBy: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockResolvedValue(mockResult),
            } as any));

            const result = await service.getCountryBookings(hotelId);
            expect(result).toEqual([{ usa: 10 }, { uk: 5 }]);
        });
    });

    describe('getDemographics', () => {
        it('should return demographic statistics', async () => {
            const hotelId = 1;
            const mockResult = [
                { gender: 'male', count: '10' },
                { gender: 'female', count: '5' },
            ];
            jest.spyOn(bookingRepository, 'createQueryBuilder').mockImplementation(() => ({
                select: jest.fn().mockReturnThis(),
                addSelect: jest.fn().mockReturnThis(),
                innerJoin: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                groupBy: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockResolvedValue(mockResult),
            } as any));

            const result = await service.getDemographics(hotelId);
            expect(result).toEqual({ male: 10, female: 5, other: 0 });
        });
    });

    describe('getTotalBookings', () => {
        it('should return the total number of bookings', async () => {
            const hotelId = 1;
            jest.spyOn(bookingRepository, 'count').mockResolvedValue(15);

            const result = await service.getTotalBookings(hotelId);
            expect(result).toBe(15);
        });
    });

    describe('getTotalRevenue', () => {
        it('should return the total revenue', async () => {
            const hotelId = 1;
            const mockResult = { totalRevenue: 1000 };
            jest.spyOn(transactionRepository, 'createQueryBuilder').mockImplementation(() => ({
                select: jest.fn().mockReturnThis(),
                innerJoin: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                getRawOne: jest.fn().mockResolvedValue(mockResult),
            } as any));

            const result = await service.getTotalRevenue(hotelId);
            expect(result).toEqual({ success: true, revenue: 1000 });
        });
    });

    describe('getRoomTypesWithNumbers', () => {
        it('should return room types with room numbers', async () => {
            const hotelId = 1;
            const mockRooms = [
                {
                    id: '1',
                    roomNumber: '101',
                    type: 'Deluxe',
                    price: 100.0,
                    occupancy: 2,
                    bedType: 'Queen',
                    image: 'room101.jpg',
                    description: 'A deluxe room with a queen-sized bed.',
                    size: 30,
                    status: 'available',
                    hotel: { id: '1', name: 'Test Hotel' },
                    amenities: [
                        { id: '1', name: 'WiFi' },
                        { id: '2', name: 'Air Conditioning' },
                    ],
                    assignments: [],
                    bookings: [],
                },
                {
                    id: '2',
                    roomNumber: '102',
                    type: 'Deluxe',
                    price: 100.0,
                    occupancy: 2,
                    bedType: 'Queen',
                    image: 'room102.jpg',
                    description: 'A deluxe room with a queen-sized bed.',
                    size: 30,
                    status: 'available',
                    hotel: { id: '1', name: 'Test Hotel' },
                    amenities: [
                        { id: '1', name: 'WiFi' },
                        { id: '2', name: 'Air Conditioning' },
                    ],
                    assignments: [],
                    bookings: [],
                },
                {
                    id: '3',
                    roomNumber: '201',
                    type: 'Standard',
                    price: 80.0,
                    occupancy: 2,
                    bedType: 'Double',
                    image: 'room201.jpg',
                    description: 'A standard room with a double bed.',
                    size: 25,
                    status: 'available',
                    hotel: { id: '1', name: 'Test Hotel' },
                    amenities: [{ id: '1', name: 'WiFi' }],
                    assignments: [],
                    bookings: [],
                },
            ];

            jest.spyOn(roomRepository, 'find').mockResolvedValue(mockRooms as any);

            const result = await service.getRoomTypesWithNumbers(hotelId);

            expect(result).toEqual({
                success: true,
                data: {
                    Deluxe: ['101', '102'],
                    Standard: ['201'],
                },
            });

            expect(roomRepository.find).toHaveBeenCalledWith({
                where: { hotel: { id: hotelId } },
                select: ['type', 'roomNumber'], // Include the `select` option in the expectation
            });
        });
    });
});
