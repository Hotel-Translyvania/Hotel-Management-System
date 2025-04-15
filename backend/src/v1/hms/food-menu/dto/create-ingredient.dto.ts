import { IsString } from "class-validator";

export class CreateIngredientDto {
    @IsString()
    name: string;
}