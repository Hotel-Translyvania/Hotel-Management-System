import { Test, TestingModule } from '@nestjs/testing';
import { FoodService } from '../food.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from 'src/common/entities/hotel.entity';
import { Booking } from 'src/common/entities/booking.entity';
import { Order } from 'src/common/entities/order.entity';
import { OrderItem } from 'src/common/entities/order-item.entity';
import { Food } from 'src/common/entities/food.entity';
import { Ingredient } from 'src/common/entities/ingredient.entity';

const mockRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    getRawMany: jest.fn().mockResolvedValue([]),
  })),
});

describe('FoodService', () => {
  let service: FoodService;
  let hotelRepo, foodRepo, ingredientRepo, orderRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodService,
        { provide: getRepositoryToken(Hotel), useFactory: mockRepository },
        { provide: getRepositoryToken(Booking), useFactory: mockRepository },
        { provide: getRepositoryToken(Food), useFactory: mockRepository },
        { provide: getRepositoryToken(Ingredient), useFactory: mockRepository },
        { provide: getRepositoryToken(Order), useFactory: mockRepository },
        { provide: getRepositoryToken(OrderItem), useFactory: mockRepository },
      ],
    }).compile();

    service = module.get<FoodService>(FoodService);
    hotelRepo = module.get(getRepositoryToken(Hotel));
    foodRepo = module.get(getRepositoryToken(Food));
    ingredientRepo = module.get(getRepositoryToken(Ingredient));
    orderRepo = module.get(getRepositoryToken(Order));
  });

  it('should add a food item with new ingredients', async () => {
    hotelRepo.findOne.mockResolvedValue({ id: 1 });
    ingredientRepo.findOne.mockResolvedValue(null);
    ingredientRepo.create.mockImplementation((dto) => dto);
    ingredientRepo.save.mockImplementation((dto) => dto);
    foodRepo.create.mockImplementation((dto) => dto);
    foodRepo.save.mockImplementation((dto) => dto);

    const dto = {
      name: 'Burger',
      ingredients: ['Cheese', 'Bread'],
      timeToMake: 10,
    };

    const result = await service.addFoodItem(dto as any, 1);
    expect(result.name).toBe('Burger');
    expect(result.ingredients.length).toBe(2);
  });

  it('should throw if hotel not found', async () => {
    hotelRepo.findOne.mockResolvedValue(null);
    await expect(service.addFoodItem({ ingredients: [] } as any, 1)).rejects.toThrow('Hotel not found');
  });

  it('should delete a food item', async () => {
    foodRepo.findOne.mockResolvedValue({ id: 'food1' });
    foodRepo.delete.mockResolvedValue(true);

    const result = await service.deleteFoodItem('food1', 1);
    expect(result.success).toBe(true);
  });

  it('should return formatted orders', async () => {
    orderRepo.createQueryBuilder().getRawMany.mockResolvedValue([]);
    const orders = await service.viewAllOrders();
    expect(Array.isArray(orders)).toBe(true);
  });
});