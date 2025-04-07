import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity'; 
import { Hotel } from './hotel.entity';
import { Booking } from './booking.entity';

@Entity('invoices')
export class Invoice {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (guest) => guest.id, { nullable: false })
    guest: User;

    @ManyToOne(() => Hotel, (hotel) => hotel.id, { nullable: false })
    hotel: Hotel;

    @ManyToOne(() => Booking, (booking) => booking.id, { nullable: false })
    booking: Booking;

    @Column({ type: 'int', nullable: false })
    invoiceNumber: number;

    @Column({ type: 'double', precision: 10, scale: 2, nullable: false })
    totalAmount: number;

    @Column({ type: 'double', precision: 10, scale: 2, nullable: false })
    taxAmount: number;

    @Column({ type: 'double', precision: 10, scale: 2, nullable: false })
    netAmount: number;

    @Column({ type: 'enum', enum: ['paid', 'overdue', 'pending'], default: 'pending' })
    status: 'paid' | 'overdue' | 'pending';
}