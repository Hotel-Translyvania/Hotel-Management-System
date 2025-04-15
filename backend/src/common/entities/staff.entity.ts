// src/hms/staff/entities/staff.entity.ts
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne,
    OneToMany
  } from 'typeorm';
import { Hotel } from '../../common/entities/hotel.entity';
import { Assignment } from './assignments.entity';
import { Role } from '../../common/enums/role.enum';
  
  @Entity()
  export class Staff {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    firstname: string;
  
    @Column()
    lastname: string;
    
    @Column({default: Role.MANAGER})
    role: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;
    
    @Column()
    dateOfBirth: Date;
    
    
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
  
    // @CreateDateColumn({ name: 'created_at' })
    // createdAt: Date;
  
    // @UpdateDateColumn({ name: 'updated_at' })
    // updatedAt: Date;
  
    @ManyToOne(() => Hotel, (hotel) => hotel.staff)
    hotel: Hotel;
  
    @Column({ nullable: true })
    currentTask: string;
  
    @Column({ nullable: true })
    assignedRoomId: string;


    @OneToMany(() => Assignment, (assignment) => assignment.staff)
    assignments: Assignment[]; //currently not being used
    
    // @BeforeInsert()
    // @BeforeUpdate()
    // async hashPassword() {
    //   if (this.password) {
    //     this.password = await bcrypt.hash(this.password, 10);
    //   }
    // }
  
    // async validatePassword(password: string): Promise<boolean> {
    //   return bcrypt.compare(password, this.password);
    // }
  
    // get fullName(): string {
    //   return `${this.firstname} ${this.lastname}`;
    // }
  }