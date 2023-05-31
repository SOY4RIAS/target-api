import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { GENDER } from '../constants';
import { User } from '../user.entity';

export class UserDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsString()
  public lastName: string;

  @ApiProperty({
    enum: GENDER,
  })
  @IsEnum(GENDER)
  public gender: GENDER;

  @ApiProperty({
    format: 'email',
  })
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
