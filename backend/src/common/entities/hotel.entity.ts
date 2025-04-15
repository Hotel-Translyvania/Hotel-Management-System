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

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    location: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @OneToMany(() => Room, (room) => room.hotel)
    rooms: Room[];

    @OneToOne(() => Manager, (manager) => manager.hotel, { onDelete: "SET NULL" })
    manager: Manager;


    @OneToMany(() => Assignment, (assignment) => assignment.hotel)
    assignments: Assignment[];

    @OneToMany(() => Staff, (staff) => staff.hotel)
    staff: Staff[];

    @Column()
    image: string;
    
    @OneToMany(() => Food, food => food.hotel)
    foods: Food[];

    @OneToMany(() => Booking, (booking) => booking.hotel)
    bookings: Booking[]; 
}