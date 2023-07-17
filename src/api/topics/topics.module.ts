import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TopicEntity } from './topic.entity';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';

@Module({
  imports: [TypeOrmModule.forFeature([TopicEntity])],
  controllers: [TopicsController],
  providers: [TopicsService],
})
export class TopicsModule {}
