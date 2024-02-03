import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TOKEN_TYPE } from './constants';

@Entity('auth')
export class AuthEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'integer' })
  public userId: number;

  @Column({ unique: true, type: 'uuid' })
  @Generated('uuid')
  public tokenId: string;

  @Column({
    type: 'enum',
    enum: Object.values(TOKEN_TYPE),
  })
  public tokenType: TOKEN_TYPE;

  @Column({ type: 'timestamp', nullable: true })
  public expiresAt: Date | null;

  @Column({ type: 'boolean', default: false })
  public revoked: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
