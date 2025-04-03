import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/common/entities/booking.entity';
import { Food } from 'src/common/entities/food.entity';
import { OrderItem } from 'src/common/entities/order-item.entity';
import { Order } from 'src/common/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class FoodMenuService {

    constructor(
        @InjectRepository(Food) 
        private foodRepository: Repository<Food>,
        @InjectRepository(Booking) 
        private bookingRepository: Repository<Booking>,
        
        @InjectRepository(Order) 
        private orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,
    ){}
    async createOrder(createOrderDto: CreateOrderDto): Promise<{ orderId: string; totalPrice: number; message: string }> {
        const { bookingId, items } = createOrderDto;
    
        // Check if booking exists
        const booking = await this.bookingRepository.findOne({ where: { id: bookingId } });
        if (!booking) {
          throw new NotFoundException('Booking not found.');
        }
    
        // Process food items
        let totalPrice = 0;
        const orderItems: OrderItem[] = [];
    
        for (const item of items) {
          const food = await this.foodRepository.findOne({ where: { id: item.foodId, status: 'Available' } });
    
          if (!food) {
            throw new NotFoundException(`Food item with ID ${item.foodId} not found or unavailable.`);
          }
    
          const itemTotal = food.price * item.quantity;
          totalPrice += itemTotal;
    
          const orderItem = this.orderItemRepository.create({
            food,
            quantity: item.quantity,
            price: itemTotal,
          });
    
          orderItems.push(orderItem);
        }
    
        // Create order
        const order = this.orderRepository.create({
          booking,
          items: orderItems,
          totalPrice,
          status: 'pending',
        });
    
        const savedOrder = await this.orderRepository.save(order);
    
        // Save order items
        for (const orderItem of orderItems) {
          orderItem.order = savedOrder;
          await this.orderItemRepository.save(orderItem);
        }
    
        return {
          orderId: savedOrder.id,
          totalPrice,
          message: 'Food order placed successfully',
        };
      }

      async getAllFood(): Promise<Food[]> {
        const foods = await this.foodRepository.find();  
        if (foods.length == 0) {
            throw new NotFoundException(`Foods not found`);  // Throws 'Foods not Found exception if there no hotel inside the database 
          }
          return foods ;  //Returns all Foods
        }
}
