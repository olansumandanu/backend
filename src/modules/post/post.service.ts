import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(data: any): Promise<Post> {
    return this.postRepository.save(data);
  }

  async update(id: number, data: any): Promise<Post> {
    const oldData = await this.postRepository.find({
      where: { id },
    });
    return await this.postRepository.save({
      ...oldData,
      ...data,
    });
  }

  async findOne(condition: any): Promise<Post> {
    return this.postRepository.findOne(condition);
  }

  async searchByKey(keyword: any): Promise<Post[]> {
    const posts = await this.postRepository.find({
      where: { body: ILike(`%${keyword || ''}%`) },
    });
    return posts;
  }
}
