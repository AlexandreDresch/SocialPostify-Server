import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthSigninDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
