import {
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get('me')
  async user(@Req() request: Request) {
    try {
      const cookie = request.headers.cookie.replace('jwt=', '');

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.userService.findOne({
        where: { id: data['id'] },
      });

      const { password, ...result } = user;
      console.log(password);

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadFile(file);
  }
}
