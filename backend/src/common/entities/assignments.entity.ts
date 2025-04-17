
import { Staff } from './staff.entity';
import { Room } from './room.entity';
import { Hotel } from './hotel.entity';

import {Entity,
PrimaryGeneratedColumn,
Column,
ManyToOne,
JoinColumn,
} from 'typeorm';

@Entity('assignments')
export class Assignment {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column({nullable: true})
task: string;

@Column({nullable: true})
description: string;

@Column({nullable: true})
startTime: string;

@Column({nullable: true})
endTime: string;

@ManyToOne(() => Hotel, (hotel) => hotel.assignments, { nullable: false })
@JoinColumn({ name: 'hotel_id' })
hotel: Hotel;

@ManyToOne(() => Staff, (staff) => staff.assignments, { nullable: false })
@JoinColumn({ name: 'staff_id' })
staff: Staff;

@ManyToOne(() => Room, (room) => room.assignments, { nullable: false })
@JoinColumn({ name: 'room_id' })
room: Room;

@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
assignedAt: Date;
}