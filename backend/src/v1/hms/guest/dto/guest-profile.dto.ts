export class UserProfileDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  nationality: string;
  dateOfBirth: string;
  identificationType: string;
  identificationNumber: string;
  picture: string;
  }
  
  export class UserProfileResponseDto {
    success: boolean;
    data: UserProfileDto;
  }