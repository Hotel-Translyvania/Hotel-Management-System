// src/hms/staff/entities/staff.entity.ts
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { Hotel } from '../../../hotels/entities/hotel.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  role: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isTemporaryPassword: boolean;

  @Column({ 
    type: 'enum',
    enum: ['available', 'working'],
    default: 'available'
  })
  status: string;

  @Column()
  phonenumber: string;

  @Column({ nullable: true })
  profilePic: string;

  @Column('decimal', { precision: 10, scale: 2 })
  salary: number;

  @Column({ type: 'date' })
  employedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Hotel, (hotel) => hotel.staff)
  hotel: Hotel;

  @Column({ nullable: true })
  currentTask: string;

  @Column({ nullable: true })
  assignedRoomId: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  get fullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }
}