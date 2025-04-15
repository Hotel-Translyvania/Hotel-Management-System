import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./booking.entity";
import * as bcrypt from 'bcrypt';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;
    
    @Column()
    lastName: string;
    
    @Column({ nullable: true})
    picture: string ;

    @Column({ unique: true })
    email: string;

    @Column()
    phone: string;
    
    @Column({nullable: true, default: ''})
    password: string;

    @Column()
    address: string;

    @Column()
    identificationType: string;

    @Column()
    identificationNumber: string;

    @Column()
    gender: string;

    @Column()
    dateOfBirth: Date;

    @Column()
    nationality: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    // usefule for payloading the jwt
    @Column()
    role: String;

    @OneToMany(() => Booking, (booking) => booking.guest)
    bookings: Booking[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if(this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
}