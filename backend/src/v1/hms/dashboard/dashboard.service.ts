import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../../../common/entities/booking.entity';
import { User } from '../../../common/entities/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getCountryBookings(
    hotelId: number, // Changed from string to number to match Hotel entity
  ): Promise<Array<Record<string, number>>> {
    const result = await this.bookingRepository
      .createQueryBuilder('booking')
      .select('user.nationality', 'country')
      .addSelect('COUNT(*)', 'count')
      .innerJoin('booking.guest', 'user')
      .where('booking.hotelId = :hotelId', { hotelId })
      .groupBy('user.nationality')
      .getRawMany();

    return result.map((stat) => ({
      [stat.country.toLowerCase()]: parseInt(stat.count),
    }));
  }

  async getDemographics(
    hotelId: number, // Changed from string to number to match Hotel entity
  ): Promise<{ male: number; female: number; other: number }> {
    const result = await this.bookingRepository
      .createQueryBuilder('booking')
      .select('user.gender', 'gender')
      .addSelect('COUNT(*)', 'count')
      .innerJoin('booking.guest', 'user')
      .where('booking.hotelId = :hotelId', { hotelId })
      .groupBy('user.gender')
      .getRawMany();

    const stats = { male: 0, female: 0, other: 0 };
    result.forEach((stat) => {
      const gender = stat.gender.toLowerCase();
      if (gender === 'male') stats.male = parseInt(stat.count);
      else if (gender === 'female') stats.female = parseInt(stat.count);
      else stats.other = parseInt(stat.count);
    });

    return stats;
  }

  // async getTotalBookings(hotelId: number): Promise<number> {
  //   return this.bookingRepository.count({
  //     where: { hotel: { id: hotelId } }, // Updated to use relation
  //   });
  // }
}