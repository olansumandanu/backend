import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './post.entity';

@Module({
  controllers: [PostController],
  imports: [TypeOrmModule.forFeature([Post]), PostModule],
  providers: [PostService],
})
export class PostModule {}
