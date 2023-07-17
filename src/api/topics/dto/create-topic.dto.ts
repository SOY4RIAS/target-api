import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateTopicDto {
  @ApiProperty({
    description: 'The name of the topic',
    example: 'NestJS',
  })
  @IsString()
  public name: string;

  @ApiProperty({
    description: 'The image of the topic',
    example: 'https://nestjs.com/img/logo_text.svg',
  })
  @IsUrl()
  public image: string;
}
