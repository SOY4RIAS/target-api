import { Column, Entity } from 'typeorm';

import { GenericEntity } from '@shared/entities/generic.entity';

@Entity('topics')
export class TopicEntity extends GenericEntity {
  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar' })
  public image: string;
}
