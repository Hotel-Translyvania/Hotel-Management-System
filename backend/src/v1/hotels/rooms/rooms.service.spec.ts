import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Room } from 'src/common/entities/room.entity';
import { Hotel } from 'src/common/entities/hotel.entity';
import { Booking } from 'src/common/entities/booking.entity';
import { NotFoundException } from '@nestjs/common';





describe('RoomsService', () => {
    let service: RoomsService;
    let roomRepository: Repository<Room>;
    let hotelRepository: Repository<Hotel>;
    let bookingRepository: Repository<Booking>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RoomsService,
                {
                    provide: getRepositoryToken(Room),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Hotel),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Booking),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<RoomsService>(RoomsService);
        roomRepository = module.get<Repository<Room>>(getRepositoryToken(Room));
        hotelRepository = module.get<Repository<Hotel>>(getRepositoryToken(Hotel));
        bookingRepository = module.get<Repository<Booking>>(getRepositoryToken(Booking));
    });

    describe('getRoomsByHotelId', () => {
        it('should return rooms with amenities for a valid hotel ID', async () => {
            const mockHotel = {
                id: 1,
                rooms: [
                    {
                        id: 1,
                        amenities: [{ name: 'WiFi' }, { name: 'TV' }],
                    },
                ],
            };
            jest.spyOn(hotelRepository, 'findOne').mockResolvedValue(mockHotel as any);

            const result = await service.getRoomsByHotelId(1);

            expect(result).toEqual({
                data: [
                    {
                        id: 1,
                        amenities: ['WiFi', 'TV'],
                    },
                ],
            });
        });

        it('should throw NotFoundException if hotel is not found', async () => {
            jest.spyOn(hotelRepository, 'findOne').mockResolvedValue(null);

            await expect(service.getRoomsByHotelId(1)).rejects.toThrow(NotFoundException);
        });
    });

    describe('getAvailableRooms', () => {
        it('should return available rooms for valid inputs', async () => {
            const mockHotel = {
                id: 1,
                rooms: [
                    { id: 1, status: 'available' },
                    { id: 2, status: 'occupied' },
                ],
            };
            jest.spyOn(hotelRepository, 'findOne').mockResolvedValue(mockHotel as any);
            jest.spyOn(bookingRepository, 'count').mockResolvedValue(0);

            const result = await service.getAvailableRooms(1, new Date('2023-01-01'), new Date('2023-01-05'));

            expect(result).toEqual([{ id: 1, status: 'available' }]);
        });

        it('should return an empty array if no rooms are available', async () => {
            const mockHotel = {
                id: 1,
                rooms: [
                    { id: 1, status: 'occupied' },
                ],
            };
            jest.spyOn(hotelRepository, 'findOne').mockResolvedValue(mockHotel as any);
            jest.spyOn(bookingRepository, 'count').mockResolvedValue(1);

            const result = await service.getAvailableRooms(1, new Date('2023-01-01'), new Date('2023-01-05'));

            expect(result).toEqual([]);
        });

        it('should throw an error if hotel is not found', async () => {
            jest.spyOn(hotelRepository, 'findOne').mockResolvedValue(null);

            await expect(service.getAvailableRooms(1, new Date('2023-01-01'), new Date('2023-01-05'))).rejects.toThrow('Hotel not found');
        });
    });
});