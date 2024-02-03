import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TopicEntity } from '@api/topics/topic.entity';
import { TopicsController } from '@api/topics/topics.controller';
import { TopicsService } from '@api/topics/topics.service';

@Module({
  imports: [TypeOrmModule.forFeature([TopicEntity])],
  controllers: [TopicsController],
  providers: [TopicsService],
})
export class TopicsModule {}
