import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UserController],
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: configuration().jwt.secret,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  providers: [UserService],
})
export class UserModule {}
