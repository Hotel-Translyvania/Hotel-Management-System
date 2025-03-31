import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from './booking.entity';

@Entity()
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  country: string;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'] })
  gender: string;

  @OneToMany(() => Booking, (booking) => booking.guest)
  bookings: Booking[];

  // Add other guest properties as needed
}
