/* eslint-disable prettier/prettier */
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Amenity } from 'src/common/entities/amenities.entity';
import { Assignment } from 'src/common/entities/assignments.entity';
import { Booking } from 'src/common/entities/booking.entity';
import { Food } from 'src/common/entities/food.entity';
import { Hotel } from 'src/common/entities/hotel.entity';
import { Invoice } from 'src/common/entities/invoice.entity';
import { Manager } from 'src/common/entities/manager.entity';
import { Room } from 'src/common/entities/room.entity';
import { Staff } from 'src/common/entities/staff.entity';
import { User } from 'src/common/entities/user.entity';

export default registerAs('database', (): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    connectorPackage: 'mysql2',
    port: parseInt(process.env.DATABASE_PORT || '3306'),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
      User,
      Room,
      Hotel,
      Amenity,
      Assignment,
      Booking,
      Food,
      Invoice,
      Manager,
      Staff,
    ],
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
  };
});
