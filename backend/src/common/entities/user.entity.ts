import { Column, Entity, PrimaryGeneratedColumn,ManyToOne } from "typeorm";
import { Hotel } from './hotel.entity';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @Column()
    picture: string;

    @Column()
    email: string;

    @Column()
    phone: string;
    
    @Column()
    password: string;

    @Column()
    address: string;

    @Column()
    identificationType: string;

    @Column()
    identificationNumber: string;
    
    @Column()
    createdAt: Date;

    @Column()
    gender: string;

    @Column()
    dateOfBirth: Date;

    @Column()
    nationality: string;
    
    // usefule for payloading the jwt
    @Column()
    role: String;

    @ManyToOne(() => Hotel, hotel => hotel.guests)
    hotel: Hotel;
}