import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Hotel } from "./hotel.entity";

@Entity()
export class Manager{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: string;

    @Column()
    address: string;

    @Column()
    dateOfBirth: Date;

    @Column()
    registrationDate: Date;

    @Column({nullable: true})
    profilePic: string;

    @OneToOne(() => Hotel, (hotel) => hotel.manager, { cascade: true, eager: true })
    @JoinColumn() // This decorator specifies that this side owns the relationship
    hotel: Hotel;
}