import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { ImageUploadService } from 'src/common/services/image-upload.service';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

describe('RoomsController', () => {
  let controller: RoomsController;
  let roomsService: RoomsService;
  let imageUploadService: ImageUploadService;

  const mockRoomsService = {
    createRoom: jest.fn(),
    updateRoom: jest.fn(),
    deleteRoom: jest.fn(),
  };

  const mockImageUploadService = {
    uploadImage: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        {
          provide: RoomsService,
          useValue: mockRoomsService,
        },
        {
          provide: ImageUploadService,
          useValue: mockImageUploadService,
        },
      ],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
    roomsService = module.get<RoomsService>(RoomsService);
    imageUploadService = module.get<ImageUploadService>(ImageUploadService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addRoom', () => {
    const mockFile = {
      path: '/tmp/test.jpg',
      size: 1024 * 1024, // 1MB
    } as Express.Multer.File;

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

    it('should successfully create a room', async () => {
      const mockUploadResult = 'https://cloudinary.com/image.jpg';
      mockImageUploadService.uploadImage.mockResolvedValue(mockUploadResult);
      mockRoomsService.createRoom.mockResolvedValue({
        id: '1',
        ...mockCreateRoomDto,
      });

      const result = await controller.addRoom(mockFile, mockCreateRoomDto, 1);

      expect(result).toEqual({
        success: true,
        message: 'Room added successfully',
        image: mockUploadResult,
      });
      expect(mockImageUploadService.uploadImage).toHaveBeenCalledWith(
        mockFile.path,
        expect.any(String),
      );
      expect(mockRoomsService.createRoom).toHaveBeenCalledWith(1, {
        ...mockCreateRoomDto,
        image: mockUploadResult,
      });
    });



    it('should throw InternalServerErrorException when image upload fails', async () => {
      mockImageUploadService.uploadImage.mockResolvedValue(null);

      await expect(
        controller.addRoom(mockFile, mockCreateRoomDto, 1),
      ).rejects.toThrow(InternalServerErrorException);
      expect(mockRoomsService.createRoom).not.toHaveBeenCalled();
    });
  });

  describe('updateRoom', () => {
    const mockFile = {
      path: '/tmp/test.jpg',
      size: 1024 * 1024,
    } as Express.Multer.File;

    const mockUpdateRoomDto: UpdateRoomDto = {
      roomNumber: '102',
      type: 'Suite',
      price: 200,
    };

    it('should successfully update a room with new image', async () => {
      const mockUploadResult = 'https://cloudinary.com/new-image.jpg';
      mockImageUploadService.uploadImage.mockResolvedValue(mockUploadResult);
      mockRoomsService.updateRoom.mockResolvedValue({
        id: '1',
        ...mockUpdateRoomDto,
        image: mockUploadResult,
      });

      const result = await controller.updateRoom(
        mockFile,
        mockUpdateRoomDto,
        1,
        '1',
      );

      expect(result).toEqual({
        success: true,
        message: 'Room updated successfully',
      });
      expect(mockImageUploadService.uploadImage).toHaveBeenCalledWith(
        mockFile.path,
        expect.any(String),
      );
      expect(mockRoomsService.updateRoom).toHaveBeenCalledWith('1', {
        ...mockUpdateRoomDto,
        image: mockUploadResult,
      });
    });
  });

  describe('deleteRoom', () => {
    it('should successfully delete a room', async () => {
      mockRoomsService.deleteRoom.mockResolvedValue({
        success: true,
        message: 'Room deleted successfully',
      });

      const result = await controller.deleteRoom(1, '1');

      expect(result).toEqual({
        success: true,
        message: 'Room deleted successfully',
      });
      expect(mockRoomsService.deleteRoom).toHaveBeenCalledWith('1');
    });

    it('should throw InternalServerErrorException when deletion fails', async () => {
      mockRoomsService.deleteRoom.mockRejectedValue(
        new Error('Deletion failed'),
      );

      await expect(controller.deleteRoom(1, '1')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
