import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateTopicDto } from '@api/topics/dto/create-topic.dto';
import { UpdateTopicDto } from '@api/topics/dto/update-topic.dto';
import { TopicEntity } from '@api/topics/topic.entity';
import { TopicsService } from '@api/topics/topics.service';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicsService.create(createTopicDto);
  }

  @Get()
  findAll(): Promise<TopicEntity[]> {
    return this.topicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TopicEntity | null> {
    return this.topicsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    this.topicsService.update(+id, updateTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.topicsService.remove(+id);
  }
}
