import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { Environment } from '@shared/types';

import { CreateUserDto } from './dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private rounds: number;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    config: ConfigService<Environment>,
  ) {
    this.rounds = Number(config.get<string>('SALT_ROUNDS'));
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const password = await bcrypt.hash(user.password, this.rounds);
    return this.userRepository.save({ ...user, password });
  }

  async verifyUser(id: number): Promise<boolean> {
    const result = await this.userRepository.update(id, { isVerified: true });
    return !!result.affected;
  }
}
