import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateManagerDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;
    
    @IsString()
    LastName: string;
    
    @IsString()
    address: string;
    
    @IsString()
    dateOfBirth: string;

    @IsString()
    registrationDate: string;
    
    @IsEmail()
    email: string;
    
    @IsString()
    password: string;
    
    @IsString()
    phone: string;

    @Transform(({ value }) => Number(value))
    hotelId: number;
}