import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';

import { GENDER } from '../constants';
import { User } from '../user.entity';

export class UserDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  public name: string;

  @IsString()
  public lastName: string;

  @IsEnum(GENDER)
  public gender: GENDER;

  @IsEmail()
  public email: string;

  static fromEntity({ id, name, lastName, gender, email }: User): UserDto {
    return {
      id,
      name,
      lastName,
      gender,
      email,
    };
  }
}
