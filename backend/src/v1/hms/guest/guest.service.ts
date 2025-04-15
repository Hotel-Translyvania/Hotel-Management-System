import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../common/entities/user.entity';
import { Repository } from 'typeorm';
import { UserProfileDto } from './dto/guest-profile.dto';

@Injectable()
export class GuestService {

    constructor(
        @InjectRepository(User)
        private guestRepostiory: Repository<User>
    ) { }
    async createGuest(createGuestDto: CreateGuestDto): Promise<{ success: boolean, guestId: string, message: string }> {

        const date = new Date()
    
        try {
            const guest = this.guestRepostiory.create({
                ...createGuestDto,
                createdAt: date,
            })
            const result = await this.guestRepostiory.save(guest)
            console.log("guest",result)
            return {
                success: true,
                guestId: result.id,
                message: "guest has been added successfully"
            }
        } catch (error) {
            console.log('Error message: ', error)
            throw new InternalServerErrorException(error, 'Unable to Create Guest')
        }


       
    }

    async getAllGuests(): Promise<{ success: boolean, data: any[] }> {
        try {
            const result = await this.guestRepostiory.find();
            const mappedResult = result.map((guest) => ({
                id: guest.id,
                firstName: guest.firstName,
                lastName: guest.lastName,
                gender: guest.gender,
                email: guest.email,
                phone: guest.phone,
                address: guest.address,
                nationality: guest.nationality,
                identificationType: guest.identificationType,
                idNumber: guest.identificationNumber,
            }));

            return {
                success: true,
                data: mappedResult
            };
        } catch (error) {
            console.log('Error message:', error);
            throw new InternalServerErrorException(error, 'Unable to load guests');
        }
    }

    
    async getUserProfile(identificationNumber: string): Promise<UserProfileDto> {
        const user = await this.guestRepostiory.findOne({ where: { id: identificationNumber } });
        
        if (!user) {
          throw new Error('User not found');
        }
    
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          address: user.address,
          dateOfBirth: user.dateOfBirth.toISOString().split('T')[0], // Format as YYYY-MM-DD
          identificationNumber: user.identificationNumber,
          gender: user.gender,
          nationality: user.nationality,
          identificationType: user.identificationType,
          picture: user.picture,
        };
      }
      
    async updateGuest(id: string, updateGuestDto: any): Promise<{ success: boolean, message: string }> {
        try {
            const guest = await this.guestRepostiory.findOne({ where: { id: id } })
            if (!guest) {
                return {
                    success: false,
                    message: "guest not found"
                }
            }
            await this.guestRepostiory.update(id, updateGuestDto)
        } catch (error) {
            console.log('Error message:', error);
            throw new InternalServerErrorException(error, 'Unable to update guest');
        }
        return {
            success: true,
            message: "guest has been updated successfully"
        }
    }
    async deleteGuest(id: string): Promise<{ success: boolean, message: string }> {
        try {
            const guest = await this.guestRepostiory.findOne({ where: { id: id } })
            if (!guest) {
                return {
                    success: false,
                    message: "guest not found"
                }
            }
            await this.guestRepostiory.delete(id)
        } catch (error) {
            console.log('Error message:', error);
            throw new InternalServerErrorException(error, 'Unable to delete guest');
        }
        return {
            success: true,
            message: "guest has been deleted successfully"
        }
    }
}
