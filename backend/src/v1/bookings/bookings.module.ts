/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
// import { Room } from '../rooms/entities/room.entity';
// import { Hotel } from '../hotels/entities/hotel.entity';
// import { Guest } from '../guests/entities/guest.entity';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Column,PrimaryGeneratedColumn,Entity } from 'typeorm';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // ... other columns
}
@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ... other columns
}
@Entity()
export class Guest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  

 
}

@Module({
  // imports: [TypeOrmModule.forFeature([Booking])],
  imports: [TypeOrmModule.forFeature([Booking, Room, Hotel, Guest])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
