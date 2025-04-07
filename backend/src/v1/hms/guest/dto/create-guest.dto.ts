import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateGuestDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsOptional()
    dateOfBirth?: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    gender: string;

    @IsPhoneNumber()
    phone: string;

    @IsNotEmpty()
    nationality: string;

    @IsNotEmpty()
    identificationType: string;

    @IsNotEmpty()
    identificationNumber: string;

    @IsOptional()
    role: string = 'user';
}
