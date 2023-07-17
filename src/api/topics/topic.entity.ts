import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('topics')
export class TopicEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar' })
  public image: string;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
