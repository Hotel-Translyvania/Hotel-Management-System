import { IsDateString, IsString } from "class-validator";

export class CreateBookingDto {

    @IsString()
    guestId: string;
    
    @IsDateString({}, { message: 'checkIn must be a valid ISO 8601 date string' })
    checkIn: string; // Use string to match the expected input format

    @IsDateString({}, { message: 'checkOut must be a valid ISO 8601 date string' })
    checkOut: string; // Use string to match the expected input format
}