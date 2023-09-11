import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { PostService } from './post.service';
import { JwtService } from '@nestjs/jwt';

@Controller('api')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private jwtService: JwtService,
  ) {}

  @Post('post')
  async register(@Body('name') name: string, @Body('email') email: string) {
    const user = await this.postService.create({
      name,
      email,
    });

    return user;
  }

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.headers.cookie.replace('jwt=', '');

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.postService.findOne({
        where: { id: data['id'] },
      });

      const { ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }
}
