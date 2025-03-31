/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

// Minimal mock classes for testing
@Entity()
export class Guest {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  desception;
}

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

