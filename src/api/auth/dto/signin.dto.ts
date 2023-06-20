import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class SigninDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;
}
