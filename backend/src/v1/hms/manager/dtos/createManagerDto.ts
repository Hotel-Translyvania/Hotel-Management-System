import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateManagerDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsString()
    @IsOptional()
    profilePic: string;
    
    @IsString()
    lastName: string;
    
    @IsString()
    address: string;
    
    @IsString()
    dateOfBirth: string;

    @IsString()
    registrationDate: string;
    
    @IsEmail()
    email: string;
    
    @IsString()
    @IsOptional()
    password: string;
    
    @IsString()
    phoneNumber: string;

    @Transform(({ value }) => Number(value))
    hotelId: number;
}