import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Environment } from '@/shared/types';

import { User } from './user.entity';
import { CreateUserDto } from './dto';

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

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const password = await bcrypt.hash(user.password, this.rounds);
    return this.userRepository.save({ ...user, password });
  }
}
