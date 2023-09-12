import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
  ) {}
  async create(data: any): Promise<User> {
    return this.authRepository.save(data);
  }

  async findOne(condition: any): Promise<User> {
    return this.authRepository.findOne(condition);
  }
}
