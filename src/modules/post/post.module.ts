import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { Post } from './post.entity';

@Module({
  controllers: [PostController],
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Post]),
    JwtModule.register({
      secret: configuration().jwt.secret,
      signOptions: { expiresIn: '1d' },
    }),
    PostModule,
  ],
  providers: [PostService],
})
export class PostModule {}
