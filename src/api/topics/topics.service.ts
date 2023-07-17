import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicEntity } from './topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(TopicEntity)
    private topicRepository: Repository<TopicEntity>,
  ) {}

  create(createTopicDto: CreateTopicDto) {
    return this.topicRepository.save(createTopicDto);
  }

  findAll() {
    return this.topicRepository.find();
  }

  findOne(id: number) {
    return this.topicRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateTopicDto: UpdateTopicDto) {
    const topic = this.findOne(id);
    if (!topic) {
      return new NotFoundException(`Topic #${id} not found`);
    }
    return this.topicRepository.update({ id }, updateTopicDto);
  }

  remove(id: number) {
    return this.topicRepository.update({ id }, { isDeleted: true });
  }
}
