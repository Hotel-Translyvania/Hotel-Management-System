import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class Amenity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Room, (room) => room.amenities)
  rooms: Room[];
}