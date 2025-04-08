import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Manager } from 'src/common/entities/manager.entity';
import { Repository } from 'typeorm';
import { CreateManagerDto } from './dtos/createManagerDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from 'src/common/entities/hotel.entity';
import { ImageUploadService } from 'src/common/services/image-upload.service';

@Injectable()
export class ManagerService {

    constructor(
        @InjectRepository(Manager)
        private readonly managerRepository: Repository<Manager>,
        @InjectRepository(Hotel)
        private hotelRepository: Repository<Hotel>,

        private readonly imageUploadService: ImageUploadService,
    ) { }

    async createManager(createManagerDto: CreateManagerDto) {

        try {
            const { hotelId, ...managerData } = createManagerDto;

            // Fetch the hotel entity using the hotelId
            const hotel = await this.hotelRepository.findOne({ where: { id: hotelId } });
            if (!hotel) {
                throw new NotFoundException('Hotel not found');
            }

            // upload image to cloudinary
            const publicId = `manager/${hotelId}/${Date.now()}`;
            const imageUrl = await this.imageUploadService.uploadImage(createManagerDto.profilePic, publicId);
            managerData.profilePic = imageUrl;

            // Create the manager entity and assign the hotel
            const newManager = this.managerRepository.create({ ...managerData, hotel });
            await this.managerRepository.save(newManager);

            return { message: 'Manager created successfully', managerId: newManager.id };
        } catch (error) {
            throw new InternalServerErrorException('Error creating manager: ' + error.message);
        }
    }

    async getAllManagers() {
        try {
            const managers = await this.managerRepository.find({
                relations: ['hotel'], // Assuming 'hotel' is the relation name in the Manager entity
            });

            if (!managers || managers.length === 0) {
                throw new NotFoundException('No managers found');
            }

            const managersWithHotelDetails = managers.map(manager => ({
                id: manager.id,
                firstName: manager.firstName,
                lastName: manager.lastName,
                email: manager.email,
                phoneNumber: manager.phoneNumber,
                address: manager.address,
                dateOfBirth: manager.dateOfBirth,
                registrationDate: manager.registrationDate,
                hotelName: manager.hotel?.name || null,
                profielPic: manager.profilePic || null,
            }));

            return {
                message: 'All managers retrieved successfully',
                data: managersWithHotelDetails,
            };
        } catch (error) {
            throw new Error('Error retrieving managers: ' + error.message);
        }
    }
    async deleteManager(id: string) {
        try {
            const manager = await this.managerRepository.findOne({ where: { id } });
            if (!manager) {
                throw new Error('Manager not found');
            }
            await this.managerRepository.remove(manager);
            return { message: 'Manager deleted successfully' };
        } catch (error) {
            throw new NotFoundException('Manager not found');
        }
    }
}
