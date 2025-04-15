import { FoodMenuService } from './food-menu.service';
import { NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

describe('FoodMenuService', () => {
  let service: FoodMenuService;

  // Mock repositories
  const mockFoodRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
  };
  const mockBookingRepository = {
    findOne: jest.fn(),
  };
  const mockOrderRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };
  const mockOrderItemRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks(); // reset mocks to avoid test bleed
    service = new FoodMenuService(
      mockFoodRepository as any,
      mockBookingRepository as any,
      mockOrderRepository as any,
      mockOrderItemRepository as any,
    );
  });

  describe('createOrder', () => {
    it('should create an order successfully', async () => {
      const createOrderDto: CreateOrderDto = {
        bookingId: 'booking123',
        items: [
          { foodId: 'food1', quantity: 2 },
          { foodId: 'food2', quantity: 1 },
        ],
      };

      const mockBooking = { id: 'booking123' };
      const mockFood1 = { id: 'food1', price: 10, status: 'Available' };
      const mockFood2 = { id: 'food2', price: 20, status: 'Available' };
      const mockOrder = {
        id: 'order123',
        totalPrice: 40,
        status: 'pending',
        booking: mockBooking,
        items: [],
      };

      mockBookingRepository.findOne.mockResolvedValue(mockBooking);
      mockFoodRepository.findOne
        .mockResolvedValueOnce(mockFood1)
        .mockResolvedValueOnce(mockFood2);
      mockOrderItemRepository.create.mockImplementation((item) => item);
      mockOrderItemRepository.save.mockImplementation((item) => Promise.resolve(item));
      mockOrderRepository.create.mockReturnValue(mockOrder);
      mockOrderRepository.save.mockResolvedValue(mockOrder);

      const result = await service.createOrder(createOrderDto);

      expect(mockBookingRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'booking123' },
      });

      expect(mockFoodRepository.findOne).toHaveBeenCalledTimes(2);
      expect(mockFoodRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'food1', status: 'Available' },
      });
      expect(mockFoodRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'food2', status: 'Available' },
      });

      expect(mockOrderItemRepository.create).toHaveBeenCalledTimes(2);
      expect(mockOrderItemRepository.save).toHaveBeenCalledTimes(2);

      expect(mockOrderRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          booking: mockBooking,
          totalPrice: 40,
          status: 'pending',
        }),
      );

      expect(mockOrderRepository.save).toHaveBeenCalledWith(mockOrder);

      expect(result).toEqual({
        orderId: 'order123',
        totalPrice: 40,
        message: 'Food order placed successfully',
      });
    });

    it('should throw NotFoundException if booking is not found', async () => {
      const createOrderDto: CreateOrderDto = {
        bookingId: 'invalidBooking',
        items: [],
      };

      mockBookingRepository.findOne.mockResolvedValue(null);

      await expect(service.createOrder(createOrderDto)).rejects.toThrow(NotFoundException);
      expect(mockBookingRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'invalidBooking' },
      });
    });

    it('should throw NotFoundException if food item is not found', async () => {
      const createOrderDto: CreateOrderDto = {
        bookingId: 'booking123',
        items: [{ foodId: 'invalidFood', quantity: 1 }],
      };

      const mockBooking = { id: 'booking123' };
      mockBookingRepository.findOne.mockResolvedValue(mockBooking);
      mockFoodRepository.findOne.mockResolvedValue(null);

      await expect(service.createOrder(createOrderDto)).rejects.toThrow(NotFoundException);
      expect(mockFoodRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'invalidFood', status: 'Available' },
      });
    });
  });

  describe('getAllFood', () => {
    it('should return all available foods for a hotel', async () => {
      const mockFoods = [
        {
          id: 'food1',
          name: 'Pizza',
          category: 'Main',
          price: 10,
          status: 'Available',
          image: 'pizza.jpg',
          ingredients: [{ name: 'Cheese' }, { name: 'Tomato' }],
          timeToMake: 15,
        },
        {
          id: 'food2',
          name: 'Burger',
          category: 'Main',
          price: 8,
          status: 'Available',
          image: 'burger.jpg',
          ingredients: [{ name: 'Beef' }, { name: 'Lettuce' }],
          timeToMake: 10,
        },
      ];

      mockFoodRepository.find.mockResolvedValue(mockFoods);

      const result = await service.getAllFood(1);

      expect(mockFoodRepository.find).toHaveBeenCalledWith({
        where: { hotel: { id: 1 }, status: 'Available' },
        relations: ['ingredients'],
        order: { name: 'ASC' },
      });

      expect(result).toEqual([
        {
          id: 'food1',
          name: 'Pizza',
          category: 'Main',
          price: 10,
          status: 'Available',
          image: 'pizza.jpg',
          ingredients: ['Cheese', 'Tomato'],
          timeToMake: 15,
        },
        {
          id: 'food2',
          name: 'Burger',
          category: 'Main',
          price: 8,
          status: 'Available',
          image: 'burger.jpg',
          ingredients: ['Beef', 'Lettuce'],
          timeToMake: 10,
        },
      ]);
    });

    it('should throw NotFoundException if no foods are found', async () => {
      mockFoodRepository.find.mockResolvedValue([]);

      await expect(service.getAllFood(1)).rejects.toThrow(NotFoundException);

      expect(mockFoodRepository.find).toHaveBeenCalledWith({
        where: { hotel: { id: 1 }, status: 'Available' },
        relations: ['ingredients'],
        order: { name: 'ASC' },
      });
    });
  });
});

