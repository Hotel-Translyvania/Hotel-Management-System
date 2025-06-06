// src/hms/staff/staff.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { Hotel } from 'src/common/entities/hotel.entity';
import { Staff } from 'src/common/entities/staff.entity';
import { Assignment } from 'src/common/entities/assignments.entity';
import { Room } from 'src/common/entities/room.entity';
import { EmailService } from 'src/common/services/email.service';
import { ImageUploadService } from 'src/common/services/image-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, Hotel, Assignment, Room])],
  controllers: [StaffController],
  providers: [StaffService,EmailService,ImageUploadService],
  exports: [StaffService],
})
export class StaffModule {}