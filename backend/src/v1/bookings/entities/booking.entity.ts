/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
// import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Hotel,Guest,Room

 } from './mock-bookings';
// import { Room } from 'src/rooms/entities/room.entity';
// import { Guest } from 'src/guests/entities/guest.entity';





export enum BookingType {
  GROUP = 'Group',
  INDIVIDUAL = 'Individual',
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled',
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Hotel)
  hotel: Hotel;

  @ManyToOne(() => Room)
  room: Room;

  @ManyToOne(() => Guest)
  guest: Guest;

  @Column({ type: 'enum', enum: BookingType })
  booking_type: BookingType;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
  booking_status: BookingStatus;

  @Column({ type: 'varchar', length: 50 })
  booking_via: string;

  @Column({ type: 'date' })
  check_in: Date;

  @Column({ type: 'date' })
  check_out: Date;

  @CreateDateColumn()
  created_at: Date;
}
