import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import {
  CountryBookingResponse,
  DemographicsResponse,
  TotalBookingsResponse,
} from './dto/dashboard-response.dto';
import { RoomTypesResponseDto } from 'src/v1/hms/dashboard/dto/room-types-response.dto';

describe('DashboardController', () => {
    let controller: DashboardController;
    let service: DashboardService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DashboardController],
            providers: [
                {
                    provide: DashboardService,
                    useValue: {
                        getCountryBookings: jest.fn(),
                        getDemographics: jest.fn(),
                        getTotalBookings: jest.fn(),
                        getTotalRevenue: jest.fn(),
                        getRoomTypesWithNumbers: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<DashboardController>(DashboardController);
        service = module.get<DashboardService>(DashboardService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getCountryBookings', () => {
        it('should return country booking statistics', async () => {
            const mockResponse: CountryBookingResponse = { success: true, country: [] };
            jest.spyOn(service, 'getCountryBookings').mockResolvedValue(mockResponse.country);

            const result = await controller.getCountryBookings(1);
            expect(result).toEqual(mockResponse);
            expect(service.getCountryBookings).toHaveBeenCalledWith(1);
        });
    });

    describe('getDemographics', () => {
        it('should return demographic statistics', async () => {
            const mockResponse: DemographicsResponse = { success: true, male: 50, female: 50 };
            jest.spyOn(service, 'getDemographics').mockResolvedValue({ male: 50, female: 50, other: 0 });

            const result = await controller.getDemographics(1);
            expect(result).toEqual(mockResponse);
            expect(service.getDemographics).toHaveBeenCalledWith(1);
        });
    });

    describe('getTotalBookings', () => {
        it('should return total bookings count', async () => {
            const mockResponse: TotalBookingsResponse = { success: true, booked: 100 };
            jest.spyOn(service, 'getTotalBookings').mockResolvedValue(mockResponse.booked);

            const result = await controller.getTotalBookings(1);
            expect(result).toEqual(mockResponse);
            expect(service.getTotalBookings).toHaveBeenCalledWith(1);
        });
    });

    describe('getTotalRevenue', () => {
        it('should return total revenue', async () => {
            const mockResponse = { success: true, revenue: 10000 };
            jest.spyOn(service, 'getTotalRevenue').mockResolvedValue(mockResponse);

            const result = await controller.getTotalRevenue(1);
            expect(result).toEqual(mockResponse);
            expect(service.getTotalRevenue).toHaveBeenCalledWith(1);
        });
    });

    describe('getRoomTypesWithNumbers', () => {
        it('should return room types statistics', async () => {
            const mockResponse: RoomTypesResponseDto = {
                success: true,
                data: {
                    single: ['101', '102'],
                    double: ['201', '202'],
                    suite: ['301'],
                },
            };

            jest.spyOn(service, 'getRoomTypesWithNumbers').mockResolvedValue(mockResponse);

            const result = await controller.getRoomTypesWithNumbers(1);

            expect(result).toEqual(mockResponse);
            expect(service.getRoomTypesWithNumbers).toHaveBeenCalledWith(1);
        });
    });
});
