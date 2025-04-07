import { Amenity } from "./amenities.entity";
import {
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    Entity,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from "typeorm";
import { Hotel } from "./hotel.entity";
import { Assignment } from "./assignments.entity";
import { Booking } from "./booking.entity";

@Entity()
export class Room {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    roomNumber: string;

    @Column()
    type: string; // single, double, suite

    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    @Column()
    occupancy: number;

    @Column()
    bedType: string;

    @Column()
    image: string;

    @Column("text")
    description: string;

    @Column()
    size: number;

    @Column({ default: "available" })
    status: string; // available, booked, under maintenance

    @ManyToOne(() => Hotel, (hotel) => hotel.rooms, { onDelete: "CASCADE" })
    @JoinColumn({ name: "hotel_id" })
    hotel: Hotel;

    @ManyToMany(() => Amenity, (amenity) => amenity.rooms, { cascade: true })
    @JoinTable()
    amenities: Amenity[];

    @OneToMany(() => Assignment, (assignment) => assignment.room)
    assignments: Assignment[];

    @OneToMany(() => Booking, (booking) => booking.room)
    bookings: Booking[]; 
}
