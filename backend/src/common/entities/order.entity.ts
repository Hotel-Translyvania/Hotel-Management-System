import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Booking } from './booking.entity';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Booking, (booking) => booking.id, { nullable: false, onDelete: 'CASCADE' })
  booking: Booking;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @Column({ type: 'double', nullable: false })
  totalPrice: number;

  @Column({ type: 'enum', enum: ['pending', 'completed', 'canceled'], default: 'pending' })
  status: 'pending' | 'completed' | 'canceled';

  
  @Column({ type: 'text', nullable: true })
  specialRequest?: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP', // No (6) here
  })
  createdAt: Date;

}

