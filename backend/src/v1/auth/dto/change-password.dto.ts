import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  oldPassword: string;

  // makes sure that the new password is not empty and has a minimum length of 8 characters
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
