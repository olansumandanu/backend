import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  providers: [UserService],
})
export class UserModule {}
