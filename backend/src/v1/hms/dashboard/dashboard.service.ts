import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { Guest } from './entities/guest.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Guest)
    private guestRepository: Repository<Guest>,
  ) {}

  async getCountryBookings(
    hotelId: string,
  ): Promise<Array<Record<string, number>>> {
    const result = await this.bookingRepository
      .createQueryBuilder('booking')
      .select('guest.country', 'country')
      .addSelect('COUNT(*)', 'count')
      .innerJoin('booking.guest', 'guest')
      .where('booking.hotelId = :hotelId', { hotelId })
      .groupBy('guest.country')
      .getRawMany();

    return result.map((stat) => ({
      [stat.country.toLowerCase()]: parseInt(stat.count),
    }));
  }

  async getDemographics(
    hotelId: string,
  ): Promise<{ male: number; female: number }> {
    const result = await this.bookingRepository
      .createQueryBuilder('booking')
      .select('guest.gender', 'gender')
      .addSelect('COUNT(*)', 'count')
      .innerJoin('booking.guest', 'guest')
      .where('booking.hotelId = :hotelId', { hotelId })
      .groupBy('guest.gender')
      .getRawMany();

    const stats = { male: 0, female: 0 };
    result.forEach((stat) => {
      if (stat.gender.toLowerCase() === 'male')
        stats.male = parseInt(stat.count);
      if (stat.gender.toLowerCase() === 'female')
        stats.female = parseInt(stat.count);
    });

    return stats;
  }

  async getTotalBookings(hotelId: string): Promise<number> {
    return this.bookingRepository.count({
      where: { hotelId },
    });
  }
}
