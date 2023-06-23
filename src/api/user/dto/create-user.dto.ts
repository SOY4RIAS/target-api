import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';

import { Match } from '@shared/decorators/match.decorator';
import { GENDER } from '@api/user/constants';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsString()
  public lastName: string;

  @ApiProperty({
    enum: GENDER,
  })
  @IsEnum(GENDER, {
    message: `gender should be one of these values ${Object.values(GENDER)}`,
  })
  public gender: GENDER;

  @ApiProperty({
    format: 'email',
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    minLength: 8,
  })
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minSymbols: 1,
  })
  public password: string;

  @ApiProperty()
  @IsString()
  @Match('password')
  public confirmPassword: string;
}
