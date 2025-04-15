import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dtos/createManagerDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { create } from 'domain';

@Controller('manager')
export class ManagerController {

    constructor(
        private readonly managerService: ManagerService,
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('profilePic', {dest: './uploads'}))
    async createManager(
        @UploadedFile() file: Express.Multer.File,
        @Body() createManagerDto: CreateManagerDto
    ) {
        createManagerDto.profilePic = file.path;
        console.log('file', file.path);
        return await this.managerService.createManager(createManagerDto);
    }

    @Get()
    async getAllManagers() {
        return await this.managerService.getAllManagers();
    }

    @Delete(':id')
    async deleteManager(@Param('id') id: string) {
        return await this.managerService.deleteManager(id);
    }
}
