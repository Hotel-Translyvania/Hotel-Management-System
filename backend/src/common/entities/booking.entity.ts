/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Hotel } from './hotel.entity';
import { Room } from './room.entity';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({type: 'varchar', length:50, nullable: false, default: 'pending'})
  bookingStatus: string;

  @Column({ type: 'varchar', length: 50, nullable: false, default: 'online' })
  bookingVia: string;

  @Column({ type: 'date', nullable: false })
  checkIn: Date;

  @Column({ type: 'date', nullable: false })
  checkOut: Date;

  @ManyToOne(() => Hotel, (hotel) => hotel.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'hotelId' }) // Explicitly set the foreign key column name
  hotel: Hotel;

  @ManyToOne(() => Room, (room) => room.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'roomId' }) // Explicitly set the foreign key column name
  room: Room;

  @ManyToOne(() => User, (user) => user.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'guestId' }) // Explicitly set the foreign key column name
  guest: User;

  @OneToMany(() => Transaction, (transaction) => transaction.booking) // Define the inverse relationship
  transactions: Transaction[];

  @Column({type: 'date', nullable: false})
  createdAt: Date;
}