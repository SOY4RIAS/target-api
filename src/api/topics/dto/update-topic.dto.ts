import { PartialType } from '@nestjs/swagger';

import { CreateTopicDto } from '@api/topics/dto/create-topic.dto';

export class UpdateTopicDto extends PartialType(CreateTopicDto) {}
