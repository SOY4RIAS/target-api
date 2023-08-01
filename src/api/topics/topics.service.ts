import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { CreateTopicDto } from '@api/topics/dto/create-topic.dto';
import { UpdateTopicDto } from '@api/topics/dto/update-topic.dto';
import { TopicEntity } from '@api/topics/topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(TopicEntity)
    private topicRepository: Repository<TopicEntity>,
  ) {}

  create(createTopicDto: CreateTopicDto): Promise<TopicEntity> {
    return this.topicRepository.save(createTopicDto);
  }

  findAll(): Promise<TopicEntity[]> {
    return this.topicRepository.find();
  }

  findOne(id: number): Promise<TopicEntity | null> {
    return this.topicRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateTopicDto: UpdateTopicDto): Promise<UpdateResult> {
    const topic = this.findOne(id);
    if (!topic) {
      throw new NotFoundException(`Topic #${id} not found`);
    }
    return this.topicRepository.update({ id }, updateTopicDto);
  }

  remove(id: number): Promise<UpdateResult> {
    return this.topicRepository.update({ id }, { isDeleted: true });
  }
}
