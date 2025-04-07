import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Hotel } from './hotel.entity';
import { Ingredient } from './ingredient.entity';
import { ManyToMany, JoinTable } from 'typeorm';
import { Transform } from 'class-transformer';
import { OrderItem } from './order-item.entity';

@Entity('foods')
export class Food {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    category: string;

    @Transform(({ value }) => Number(value))
    @Column({ nullable: false })
    price: number;

    @Column({ nullable: false })
    status: string;

    @Column({ nullable: false })
    image: string;

    @ManyToMany(() => Ingredient, ingredient => ingredient.foods, { eager: true, cascade: true })
    @JoinTable()
    ingredients: Ingredient[];

    @Column({ nullable: true })
    timeToMake: string;

    @ManyToOne(() => Hotel, hotel => hotel.foods)
    hotel: Hotel;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.food)
    orderItems: OrderItem[];
}
