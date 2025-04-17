import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StaffService } from '../staff.service';
import { Staff } from '../../../../common/entities/staff.entity';
import { Hotel } from '../../../../common/entities/hotel.entity';
import { Repository } from 'typeorm';
import { Manager } from 'src/common/entities/manager.entity';
import { Assignment } from '../../../../common/entities/assignments.entity';
import { Room } from '../../../../common/entities/room.entity';
import { EmailService } from '../../../../common/services/email.service';
import { ImageUploadService } from '../../../../common/services/image-upload.service'; // adjust path if needed


let mockStaff: Staff;
let mockManager: Manager;
let mockHotel: Hotel;


mockHotel = {
  id: 1,
  name: 'Test Hotel',
  description: '',
  location: '',
  isActive: true,
  image: '',
  rooms: [],
  staff: [],
  foods: [],
  bookings: [],
  assignments: [],
manager: null 
};

mockManager = {
  id: 'manager-123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@hms.com',
  password: 'hashedPassword',
  phoneNumber: "1234567890",
  address: "string",
  dateOfBirth: new Date('1990-01-01'),
  registrationDate: new Date('1990-01-01'),
  profilePic: 'profile.jpg',
  hotel: mockHotel
};

mockHotel.manager = mockManager;

mockStaff = {
  id: 'staff-123',
  firstname: 'John',
  lastname: 'Doe',
  password: 'hashedPassword',
  role: 'RECEPTIONIST',
  email: 'john@hms.com',
  status: 'available',
  dateOfBirth: new Date('1990-01-01'),
  isTemporaryPassword: false,
  phonenumber: '+1234567890',
  profilePic: 'profile.jpg',
  salary: 50000,
  employedAt: new Date('2023-01-01'),
  currentTask: "dee3cde3",
  assignedRoomId: "dece3",
  assignments: [],
  hotel: mockHotel
};

describe('StaffService', () => {
  let service: StaffService;
  let staffRepo: Repository<Staff>;
  let hotelRepo: Repository<Hotel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StaffService,
        {
          provide: getRepositoryToken(Staff),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockStaff),
            find: jest.fn().mockResolvedValue([mockStaff]),
            create: jest.fn().mockImplementation(dto => ({
              ...mockStaff,
              ...dto
            })),
            save: jest.fn().mockResolvedValue(mockStaff),
            update: jest.fn().mockResolvedValue({ affected: 1 }),
            remove: jest.fn().mockResolvedValue(mockStaff)
          }
        },
        {
          provide: ImageUploadService,
          useValue: {
            uploadImage: jest.fn().mockResolvedValue('fake-image-url'), // adjust method if yours is different
            deleteImage: jest.fn(), // optional, depending on what you use
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendStaffWelcomeEmail: jest.fn().mockResolvedValue(true),
          },
        },
      
        
        {
          provide: getRepositoryToken(Hotel),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockHotel)
          }
        },
        {
          provide: getRepositoryToken(Assignment),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            remove: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(Room),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            remove: jest.fn()
          }
        }
      ],
    }).compile();
  
    service = module.get<StaffService>(StaffService);
    staffRepo = module.get<Repository<Staff>>(getRepositoryToken(Staff));
    hotelRepo = module.get<Repository<Hotel>>(getRepositoryToken(Hotel));
  });
  

  describe('createStaff', () => {
    it('should create staff with all required fields', async () => {
      const createStaffDto = {
        firstname: 'John',
        lastname: 'Doe',
        password: 'temp@123',
        role: 'RECEPTIONIST',
        email: 'john@hms.com',
        status: 'available',
        dateOfBirth: '1990-01-01',
        phonenumber: '+1234567890',
        profilePic: 'profile.jpg',
        salary: 50000,
        employedAt: '2023-01-01'
      };

      hotelRepo.findOne = jest.fn().mockResolvedValue(mockHotel);
      staffRepo.findOne = jest.fn().mockResolvedValue(null);

      const result = await service.createStaff(createStaffDto, 1);
      expect(result.success).toBe(true);
    });
  });
  
});
