import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from 'src/common/entities/manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])], // Add your entities here
  providers: [ManagerService],
  controllers: [ManagerController]
})
export class ManagerModule {}
