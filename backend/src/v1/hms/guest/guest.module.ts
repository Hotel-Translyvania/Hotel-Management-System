import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([User])],
  providers: [GuestService],
  controllers: [GuestController]
})
export class GuestModule {}
