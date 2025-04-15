import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsArray } from 'class-validator';
import { Ingredient } from 'src/common/entities/ingredient.entity';

export class CreateFoodDto {
  @IsString()
  name: string;

  @Transform(({ value }) => Number(value))
  price: number;

  @IsString()
  category: string;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'object' && value.path ? value.path : value)) // Extract file path if it's a file
  @IsString()
  image: string;

  @IsString()
  status: string;

  @Transform(({ value }) => Number(value))
  timeToMake: string;

  @Transform(({ value }) => Array.isArray(value) ? value : JSON.parse(value))
  @IsArray()
  ingredients: Ingredient[];

}