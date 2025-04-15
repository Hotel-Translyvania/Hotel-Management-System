import { IsAlpha, IsEmail, IsNotEmpty, IsString, MinLength, IsPhoneNumber} from 'class-validator';

export class SignupDto {
  
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
  
  @IsNotEmpty()
  phone: string;  

  // makes sure the field IS a valid email address

  @IsString()
  address: string;

  @IsString()
  identificationType: string;

  @IsString()
  identificationNumber: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  role: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsString()
  nationality: string;

  @IsString()
  gender: string;
}
