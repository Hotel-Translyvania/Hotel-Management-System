import { Test, TestingModule } from '@nestjs/testing';
import { FoodController } from '../food.controller';
import { FoodService } from '../food.service';
import { ImageUploadService } from 'src/common/services/image-upload.service';

const mockFoodService = {
  addFoodItem: jest.fn(),
  viewAllOrders: jest.fn(),
  deleteFoodItem: jest.fn(),
};

const mockImageService = {
  uploadImage: jest.fn().mockResolvedValue('image-url'),
};

describe('FoodController', () => {
  let controller: FoodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodController],
      providers: [
        { provide: FoodService, useValue: mockFoodService },
        { provide: ImageUploadService, useValue: mockImageService },
      ],
    }).compile();

    controller = module.get<FoodController>(FoodController);
  });

  it('should create a food item', async () => {
    const dto = { ingredients: ['Tomato'], timeToMake: 5 };
    const file = { path: 'fake-path' } as any;
    mockFoodService.addFoodItem.mockResolvedValue(true);

    const result = await controller.addFoodItem(file, 1, dto as any);
    expect(result.success).toBe(true);
  });

  it('should view all orders', async () => {
    mockFoodService.viewAllOrders.mockResolvedValue([]);
    const result = await controller.viewAllOrders();
    expect(result).toEqual([]);
  });

  it('should delete food item', async () => {
    mockFoodService.deleteFoodItem.mockResolvedValue({ success: true });
    const result = await controller.deleteFoodItem(1, 'f1');
    expect(result.success).toBe(true);
  });
});