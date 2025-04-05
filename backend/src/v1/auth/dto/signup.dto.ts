import { IsAlpha, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
  
  @IsString()
  phonenumber: string;

  // makes sure the field IS a valid email address

  @IsString()
  addresss: string;

  @IsString()
  identificationType: string;

  @IsString()
  identificationNumber: string;
  
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsString()
  nationality: string;

  @IsString()
  gender: string;
}
