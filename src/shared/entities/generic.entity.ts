import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class GenericEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
