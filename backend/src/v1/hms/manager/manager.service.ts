import { Injectable } from '@nestjs/common';
import { Manager } from 'src/common/entities/manager.entity';
import { Repository } from 'typeorm';
import { CreateManagerDto } from './dtos/createManagerDto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ManagerService {

    constructor(
        @InjectRepository(Manager)
        private readonly managerRepository: Repository<Manager>,
    ) { }

    async createManager(createManagerDto: CreateManagerDto) {

        try {
            const newManager = this.managerRepository.create(createManagerDto);
            await this.managerRepository.save(newManager);
            return { message: 'Manager created successfully', managerId: newManager.id };
        } catch (error) {
            throw new Error('Error creating manager: ' + error.message);
        }
    }

    async getAllManagers() {
        try {
            const managers = await this.managerRepository.find();
            return {
                message: 'All managers retrieved successfully',
                data: managers,
            };
        } catch (error) {
            throw new Error('Error retrieving managers: ' + error.message);
        }

    }
}
