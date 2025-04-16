import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Room } from 'src/common/entities/room.entity';
import { Amenity } from 'src/common/entities/amenities.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

describe('RoomsService', () => {
  let service: RoomsService;
  let roomRepository: Repository<Room>;
  let amenityRepository: Repository<Amenity>;

  const mockRoomRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    manager: {
      findOne: jest.fn(),
    },
  };

  const mockAmenityRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        {
          provide: getRepositoryToken(Room),
          useValue: mockRoomRepository,
        },
        {
          provide: getRepositoryToken(Amenity),
          useValue: mockAmenityRepository,
        },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
    roomRepository = module.get<Repository<Room>>(getRepositoryToken(Room));
    amenityRepository = module.get<Repository<Amenity>>(getRepositoryToken(Amenity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createRoom', () => {
    const mockHotelId = 1;
    const mockCreateRoomDto: CreateRoomDto = {
      roomNumber: '101',
      type: 'Deluxe',
      price: 100,
      occupancy: 2,
      bedType: 'King',
      description: 'Luxury room',
      size: 30,
      amenities: [{ amenityName: 'WiFi' }],
    };

    const mockHotel = { id: 1, name: 'Test Hotel' };
    const mockAmenity = { id: 1, name: 'WiFi' };
    const mockRoom = { id: '1', ...mockCreateRoomDto, hotel: mockHotel, amenities: [mockAmenity] };

    it('should successfully create a room with amenities', async () => {
      mockRoomRepository.manager.findOne.mockResolvedValue(mockHotel);
      mockAmenityRepository.findOne.mockResolvedValue(mockAmenity);
      mockRoomRepository.create.mockReturnValue(mockRoom);
      mockRoomRepository.save.mockResolvedValue(mockRoom);

      const result = await service.createRoom(mockHotelId, mockCreateRoomDto);

      expect(result).toEqual(mockRoom);
      expect(mockRoomRepository.manager.findOne).toHaveBeenCalledWith('Hotel', {
        where: { id: mockHotelId },
      });
      expect(mockAmenityRepository.findOne).toHaveBeenCalledWith({
        where: { name: 'WiFi' },
      });
      expect(mockRoomRepository.create).toHaveBeenCalledWith({
        ...mockCreateRoomDto,
        hotel: mockHotel,
        amenities: [mockAmenity],
        status: 'available',
      });
      expect(mockRoomRepository.save).toHaveBeenCalledWith(mockRoom);
    });

    it('should create a new amenity if it does not exist', async () => {
      mockRoomRepository.manager.findOne.mockResolvedValue(mockHotel);
      mockAmenityRepository.findOne.mockResolvedValue(null);
      mockAmenityRepository.create.mockReturnValue(mockAmenity);
      mockAmenityRepository.save.mockResolvedValue(mockAmenity);
      mockRoomRepository.create.mockReturnValue(mockRoom);
      mockRoomRepository.save.mockResolvedValue(mockRoom);

      const result = await service.createRoom(mockHotelId, mockCreateRoomDto);

      expect(result).toEqual(mockRoom);
      expect(mockAmenityRepository.create).toHaveBeenCalledWith({
        name: 'WiFi',
      });
      expect(mockAmenityRepository.save).toHaveBeenCalledWith(mockAmenity);
    });

    it('should throw an error if hotel is not found', async () => {
      mockRoomRepository.manager.findOne.mockResolvedValue(null);

      await expect(service.createRoom(mockHotelId, mockCreateRoomDto)).rejects.toThrow(
        `Hotel with ID ${mockHotelId} not found`,
      );
    });
  });

  describe('updateRoom', () => {
    const mockRoomId = '1';
    const mockUpdateRoomDto: UpdateRoomDto = {
      roomNumber: '102',
      type: 'Suite',
      price: 200,
    };

    const mockExistingRoom = {
      id: mockRoomId,
      roomNumber: '101',
      type: 'Standard',
      price: 100,
      amenities: [],
    };

    it('should successfully update a room', async () => {
      mockRoomRepository.findOne.mockResolvedValue(mockExistingRoom);
      mockRoomRepository.save.mockResolvedValue({
        ...mockExistingRoom,
        ...mockUpdateRoomDto,
      });

      const result = await service.updateRoom(mockRoomId, mockUpdateRoomDto);

      expect(result).toEqual({
        ...mockExistingRoom,
        ...mockUpdateRoomDto,
      });
      expect(mockRoomRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockRoomId },
        relations: ['amenities'],
      });
      expect(mockRoomRepository.save).toHaveBeenCalled();
    });

    it('should throw an error if room is not found', async () => {
      mockRoomRepository.findOne.mockResolvedValue(null);

      await expect(service.updateRoom(mockRoomId, mockUpdateRoomDto)).rejects.toThrow(
        `Room with ID ${mockRoomId} not found`,
      );
    });
  });

  describe('deleteRoom', () => {
    const mockRoomId = '1';
    const mockRoom = { id: mockRoomId, roomNumber: '101' };

    it('should successfully delete a room', async () => {
      mockRoomRepository.findOne.mockResolvedValue(mockRoom);
      mockRoomRepository.remove.mockResolvedValue(mockRoom);

      const result = await service.deleteRoom(mockRoomId);

      expect(result).toEqual({
        success: true,
        message: 'Room deleted successfully',
      });
      expect(mockRoomRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockRoomId },
      });
      expect(mockRoomRepository.remove).toHaveBeenCalledWith(mockRoom);
    });

    it('should throw an error if room is not found', async () => {
      mockRoomRepository.findOne.mockResolvedValue(null);

      await expect(service.deleteRoom(mockRoomId)).rejects.toThrow(
        `Room with ID ${mockRoomId} not found`,
      );
    });
  });
});
