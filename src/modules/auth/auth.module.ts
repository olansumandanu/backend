import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule } from '@nestjs/config';

// import configuration from 'src/config/configuration';
import { AuthController } from './auth.controller';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [
    // ConfigModule.forRoot({
    //   load: [configuration],
    //   isGlobal: true,
    // }),
    TypeOrmModule.forFeature([User]),
    // JwtModule.register({
    //   secret: configuration().jwt.secret,
    //   signOptions: { expiresIn: '1d' },
    // }),
    AuthModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
