import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateTopicDto {
  @ApiProperty({
    type: String,
    description: 'The name of the topic',
    example: 'NestJS',
  })
  @IsString()
  public name: string;

  @ApiProperty({
    type: String,
    description: 'The image of the topic',
    example: 'https://nestjs.com/img/logo_text.svg',
  })
  @IsUrl()
  public image: string;
}
