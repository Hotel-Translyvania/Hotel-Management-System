// transaction.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { Booking } from './booking.entity';
import { forwardRef } from '@nestjs/common';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Booking, (booking) => booking.transactions, { nullable: false })
    booking: Booking;
    
    @Column('int')
    amount: number;

    @Column()
    currency: string;

    @Column()
    status: string;

    @Column()
    paymentIntentId: string;

  // Other details can be added as needed.
}
