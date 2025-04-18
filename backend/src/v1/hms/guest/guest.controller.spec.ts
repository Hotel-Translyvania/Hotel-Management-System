import { Test, TestingModule } from '@nestjs/testing';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { UserProfileDto, UserProfileResponseDto } from './dto/guest-profile.dto';
import { JwtAuthGuard } from 'src/v1/auth/guards/jwt-auth.guard';

describe('GuestController', () => {
  let controller: GuestController;
  let guestService: GuestService;

  const mockGuestService = {
    createGuest: jest.fn(),
    getAllGuests: jest.fn(),
    getUserProfile: jest.fn(),
    updateGuest: jest.fn(),
    deleteGuest: jest.fn(),
  };

  const mockUserProfile: UserProfileDto = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '1234567890',
    gender: 'male',
    address: '123 Main St',
    nationality: 'US',
    dateOfBirth: '1990-01-01',
    identificationType: 'passport',
    identificationNumber: 'ABC123',
    picture: 'profile.jpg',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuestController],
      providers: [
        {
          provide: GuestService,
          useValue: mockGuestService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) }) // Mock JwtAuthGuard to always allow access
      .compile();

    controller = module.get<GuestController>(GuestController);
    guestService = module.get<GuestService>(GuestService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createGuest', () => {
    it('should create a guest and return the result', async () => {
      const createGuestDto: CreateGuestDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        gender: 'male',
        address: '123 Main St',
        nationality: 'US',
        dateOfBirth: '1990-01-01',
        identificationType: 'passport',
        identificationNumber: 'ABC123',
        role: 'user',
      };
      const result = { success: true, guestId: '1', message: 'guest has been added successfully' };
      mockGuestService.createGuest.mockResolvedValue(result);

      expect(await controller.createGuest(createGuestDto)).toEqual(result);
      expect(guestService.createGuest).toHaveBeenCalledWith(createGuestDto);
    });
  });

  describe('getAllGuests', () => {
    it('should return all guests', async () => {
      const result = {
        success: true,
        data: [
          {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            gender: 'male',
            email: 'john@example.com',
            phone: '1234567890',
            address: '123 Main St',
            nationality: 'US',
            identificationType: 'passport',
            idNumber: 'ABC123',
          },
        ],
      };
      mockGuestService.getAllGuests.mockResolvedValue(result);

      expect(await controller.getAllGuests()).toEqual(result);
      expect(guestService.getAllGuests).toHaveBeenCalled();
    });
  });

  describe('getProfile', () => {
    it('should return the user profile for the authenticated user', async () => {
      const req = { user: { userId: '1' } };
      mockGuestService.getUserProfile.mockResolvedValue(mockUserProfile);

      const result: UserProfileResponseDto = {
        success: true,
        data: mockUserProfile,
      };

      expect(await controller.getProfile(req)).toEqual(result);
      expect(guestService.getUserProfile).toHaveBeenCalledWith('1');
    });
  });

  describe('updateGuest', () => {
    it('should update a guest and return the result', async () => {
      const updateGuestDto: UpdateGuestDto = { firstName: 'John Updated' };
      const result = { success: true, message: 'guest has been updated successfully' };
      mockGuestService.updateGuest.mockResolvedValue(result);

      expect(await controller.updateGuest('1', updateGuestDto)).toEqual(result);
      expect(guestService.updateGuest).toHaveBeenCalledWith('1', updateGuestDto);
    });
  });

  describe('deleteGuest', () => {
    it('should delete a guest and return the result', async () => {
      const result = { success: true, message: 'guest has been deleted successfully' };
      mockGuestService.deleteGuest.mockResolvedValue(result);

      expect(await controller.deleteGuest('1')).toEqual(result);
      expect(guestService.deleteGuest).toHaveBeenCalledWith('1');
    });
  });
});