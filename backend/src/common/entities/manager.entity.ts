import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Hotel } from "./hotel.entity";

@Entity()
export class Manager{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Hotel, (hotel) => hotel.manager, { cascade: true })
    @JoinColumn() // This decorator specifies that this side owns the relationship
    hotel: Hotel;
}