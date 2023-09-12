import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { PostService } from './post.service';
import { JwtService } from '@nestjs/jwt';

@Controller('api/post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private jwtService: JwtService,
  ) {}

  @Post('new')
  async newPost(
    @Body('title') title: string,
    @Body('body') body: string,
    @Req() request: Request,
  ) {
    try {
      const cookie = request.headers.cookie.replace('jwt=', '');

      const _data = await this.jwtService.verifyAsync(cookie);

      if (!_data) {
        throw new UnauthorizedException();
      }

      const post = await this.postService.create({
        title,
        body,
        postedBy: _data['id'],
      });

      return post;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('comment')
  async comment(
    @Body('postId') postId: number,
    @Body('comment') comment: string,
    @Req() request: Request,
  ) {
    try {
      const cookie = request.headers.cookie.replace('jwt=', '');

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const oldData = await this.postService.findOne({
        where: { id: postId },
      });

      const comments: { userId: number; comment: string }[] = oldData.comments
        ? JSON.parse(oldData.comments)
        : [];

      comments.push({ userId: data['id'], comment });

      const post = await this.postService.update(postId, {
        comments: JSON.stringify(comments),
      });

      return post;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('like')
  async like(@Body('postId') postId: number, @Req() request: Request) {
    try {
      const cookie = request.headers.cookie.replace('jwt=', '');

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const oldData = await this.postService.findOne({
        where: { id: postId },
      });

      const likes: { userId: number }[] = oldData.likes
        ? JSON.parse(oldData.likes)
        : [];

      if (!likes.includes({ userId: data['id'] }))
        likes.push({ userId: data['id'] });

      await this.postService.update(postId, {
        likes: JSON.stringify(likes),
      });

      return 'like';
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('unlike')
  async unlike(@Body('postId') postId: number, @Req() request: Request) {
    try {
      const cookie = request.headers.cookie.replace('jwt=', '');

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const oldData = await this.postService.findOne({
        where: { id: postId },
      });

      const likes: { userId: number }[] = oldData.likes
        ? JSON.parse(oldData.likes)
        : [];

      const newLikes: { userId: number }[] = likes.filter(function (item) {
        return item.userId != data['id'];
      });

      await this.postService.update(postId, {
        likes: JSON.stringify(newLikes),
      });

      return 'unlike';
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Get('search')
  async search(@Query('keyword') keyword: string, @Req() request: Request) {
    try {
      const cookie = request.headers.cookie.replace('jwt=', '');

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const posts = await this.postService.searchByKey(keyword);
      console.log('posts : ', posts, keyword);
      return posts;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
