import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Guest } from './guest.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hotelId: string;

  @ManyToOne(() => Guest, (guest) => guest.bookings)
  @JoinColumn({ name: 'guestId' })
  guest: Guest;

  @Column()
  checkInDate: Date;

  @Column()
  checkOutDate: Date;

  // Add other booking properties as needed
}
