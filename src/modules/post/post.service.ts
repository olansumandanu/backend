import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  async create(data: any): Promise<Post> {
    return this.postRepository.save(data);
  }

  async findOne(condition: any): Promise<Post> {
    return this.postRepository.findOne(condition);
  }
}
