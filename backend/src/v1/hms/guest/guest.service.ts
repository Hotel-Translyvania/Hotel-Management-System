import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/common/entities/user.entity';
import { UpdateGuestDto } from './dto/update-guest.dto';

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllGuests(hotelId: string): Promise<User[]> {
    const guests = await this.userRepository.find({
      where: { hotel: { id: hotelId }, role: 'guest' },
      relations: ['hotel']
    });

    if (!guests.length) {
      throw new NotFoundException('No guests found for this hotel');
    }
    return guests;
  }

  async updateGuest(
    hotelId: string,
    guestId: string,
    updateData: UpdateGuestDto,
  ): Promise<User> {
    const guest = await this.userRepository.findOne({
      where: { id: guestId, hotel: { id: hotelId } }
    });

    if (!guest) {
      throw new NotFoundException('Guest not found');
    }

    Object.assign(guest, updateData);
    return this.userRepository.save(guest);
  }
}