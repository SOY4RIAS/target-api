import * as bcrypt from 'bcrypt';
import { Exclude, instanceToPlain } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { GENDER } from './constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 120 })
  public lastName: string;

  @Column({ type: 'enum', enum: GENDER })
  public gender: GENDER;

  @Column({ type: 'varchar', length: 120 })
  public email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 120 })
  public password: string;

  @Column({ type: 'boolean', default: false })
  public isVerified: boolean;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  public hasValidPass(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  public toPlainObject() {
    return instanceToPlain(this) as Omit<User, 'password'>;
  }
}
