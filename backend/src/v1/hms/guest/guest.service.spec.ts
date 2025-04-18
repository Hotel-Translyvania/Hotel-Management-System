import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuestService } from './guest.service';
import { User } from '../../../common/entities/user.entity';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('GuestService', () => {
  let service: GuestService;
  let guestRepository: Repository<User>;

  const mockUser = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '1234567890',
    gender: 'male',
    address: '123 Main St',
    nationality: 'US',
    dateOfBirth: new Date('1990-01-01'),
    identificationType: 'passport',
    identificationNumber: 'ABC123',
    picture: 'profile.jpg',
    role: 'user',
    createdAt: new Date(),
    password: '',
    bookings: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuestService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockImplementation(dto => ({
              ...dto,
              id: '1',
            })),
            save: jest.fn().mockImplementation(user => Promise.resolve(user)),
            find: jest.fn().mockResolvedValue([mockUser]),
            findOne: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn().mockResolvedValue({ affected: 1 }),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<GuestService>(GuestService);
    guestRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createGuest', () => {
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

    it('should create a guest successfully', async () => {
      const result = await service.createGuest(createGuestDto);

      expect(result).toEqual({
        success: true,
        guestId: '1',
        message: 'guest has been added successfully',
      });
      expect(guestRepository.create).toHaveBeenCalledWith({
        ...createGuestDto,
        dateOfBirth: new Date(createGuestDto.dateOfBirth ?? ''), // Expect a Date object
        createdAt: expect.any(Date),
      });
      expect(guestRepository.save).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException if creation fails', async () => {
      jest.spyOn(guestRepository, 'save').mockRejectedValue(new Error('DB Error'));
      await expect(service.createGuest(createGuestDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getAllGuests', () => {
    it('should return all guests', async () => {
      const result = await service.getAllGuests();
      expect(result).toEqual({
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
      });
      expect(guestRepository.find).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException if fetch fails', async () => {
      jest.spyOn(guestRepository, 'find').mockRejectedValue(new Error('DB Error'));
      await expect(service.getAllGuests()).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getUserProfile', () => {
    it('should return the user profile', async () => {
      const result = await service.getUserProfile('1');
      expect(result).toEqual({
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
      });
      expect(guestRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(guestRepository, 'findOne').mockResolvedValue(null);
      await expect(service.getUserProfile('1')).rejects.toThrow('User not found');
    });
  });

  describe('updateGuest', () => {
    const updateGuestDto: UpdateGuestDto = { firstName: 'John Updated' };

    it('should update a guest successfully', async () => {
      const result = await service.updateGuest('1', updateGuestDto);
      expect(result).toEqual({
        success: true,
        message: 'guest has been updated successfully',
      });
      expect(guestRepository.update).toHaveBeenCalledWith('1', updateGuestDto);
    });

    it('should return failure if guest is not found', async () => {
      jest.spyOn(guestRepository, 'findOne').mockResolvedValue(null);
      const result = await service.updateGuest('1', updateGuestDto);
      expect(result).toEqual({
        success: false,
        message: 'guest not found',
      });
    });

    it('should throw InternalServerErrorException if update fails', async () => {
      jest.spyOn(guestRepository, 'update').mockRejectedValue(new Error('DB Error'));
      await expect(service.updateGuest('1', updateGuestDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('deleteGuest', () => {
    it('should delete a guest successfully', async () => {
      const result = await service.deleteGuest('1');
      expect(result).toEqual({
        success: true,
        message: 'guest has been deleted successfully',
      });
      expect(guestRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should return failure if guest is not found', async () => {
      jest.spyOn(guestRepository, 'findOne').mockResolvedValue(null);
      const result = await service.deleteGuest('1');
      expect(result).toEqual({
        success: false,
        message: 'guest not found',
      });
    });

    it('should throw InternalServerErrorException if delete fails', async () => {
      jest.spyOn(guestRepository, 'delete').mockRejectedValue(new Error('DB Error'));
      await expect(service.deleteGuest('1')).rejects.toThrow(InternalServerErrorException);
    });
  });
});