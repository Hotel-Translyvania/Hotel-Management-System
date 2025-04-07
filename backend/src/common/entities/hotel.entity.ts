import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Room } from './room.entity';
import { Manager } from './manager.entity';
import { Assignment } from './assignments.entity';
import { Staff } from './staff.entity';
import { Food } from './food.entity';
import { Booking } from './booking.entity';

@Entity('hotels')
export class Hotel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    city: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    country: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    pricePerNight: number;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @OneToMany(() => Room, (room) => room.hotel)
    rooms: Room[];

    @OneToOne(() => Manager, (manager) => manager.hotel, { onDelete: "SET NULL" })
    manager: Manager;

    @Column()
    location: string;

    @OneToMany(() => Assignment, (assignment) => assignment.hotel)
    assignments: Assignment[];

    @OneToMany(() => Staff, (staff) => staff.hotel)
    staff: Staff[];

    @Column({ type: 'varchar', length: 255, nullable: true })
    image: string;
    
    @OneToMany(() => Food, food => food.hotel)
    foods: Food[];

    @OneToMany(() => Booking, (booking) => booking.hotel)
    bookings: Booking[]; 
}