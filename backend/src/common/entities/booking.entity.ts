/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Hotel } from './hotel.entity';
import { Room } from './room.entity';
import { User } from './user.entity';

@Entity('bookings')
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Hotel, (hotel) => hotel.id, { nullable: false })
    hotelId: Hotel;

    @ManyToOne(() => Room, (room) => room.id, { nullable: false })
    roomId: Room;

    @ManyToOne(() => User, (user) => user.id, { nullable: false })
    guestId: User;

    @Column({ type: 'enum', enum: ['Group', 'Individual'] })
    bookingType: 'Group' | 'Individual';

    @Column({ type: 'enum', enum: ['pending', 'confirmed', 'canceled'], nullable: false })
    bookingStatus: 'pending' | 'confirmed' | 'canceled';

    @Column({ type: 'varchar', length: 50, nullable: false, default: 'online' })
    bookingVia: string;

    @Column({ type: 'date', nullable: false })
    checkIn: Date;

    @Column({ type: 'date', nullable: false })
    checkOut: Date;
}