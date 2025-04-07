import { Body, Controller, Get, Post } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dtos/createManagerDto';

@Controller('manager')
export class ManagerController {

    constructor(
        private managerService: ManagerService,
    ) { }

    @Post()
    async createManager(
        @Body() createManagerDto: CreateManagerDto
    ) {
        return await this.managerService.createManager(createManagerDto);
    }

    @Get()
    async getAllManagers() {
        return await this.managerService.getAllManagers();
    }

}
