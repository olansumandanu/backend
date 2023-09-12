import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import configuration from './config/configuration';
import { User } from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { AuthModule } from './modules/auth/auth.module';
import { Post } from './modules/post/post.entity';

@Module({
  exports: [JwtModule],
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: configuration().database.host,
      port: configuration().database.port,
      username: configuration().database.user,
      password: configuration().database.password,
      database: configuration().database.database,
      entities: [User, Post],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Post]),
    JwtModule.register({
      secret: configuration().jwt.secret,
      signOptions: { expiresIn: '1d' },
      global: true,
    }),
    AuthModule,
    UserModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
