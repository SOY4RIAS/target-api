import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';

import { Match } from '@/shared/decorators/match.decorator';

import { GENDER } from '../constants';

export class CreateUserDto {
  @IsString()
  public name: string;

  @IsString()
  public lastName: string;

  @IsEnum(GENDER, {
    message: `gender should be one of these values ${Object.values(GENDER)}`,
  })
  public gender: GENDER;

  @IsEmail()
  public email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minSymbols: 1,
  })
  public password: string;

  @IsString()
  @Match('password')
  public confirmPassword: string;
}
