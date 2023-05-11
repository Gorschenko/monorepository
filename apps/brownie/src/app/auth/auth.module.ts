import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../configs/jwt.config';

@Module({
  imports: [JwtModule.registerAsync(getJwtConfig())],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
