import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { Food } from './food.entity';

@Entity('ingredients')
export class Ingredient {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => Food, (food) => food.ingredients)
    @JoinTable()
    foods: Food[];
}