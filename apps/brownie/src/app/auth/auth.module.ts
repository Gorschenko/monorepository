import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../configs/jwt.config';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  imports: [JwtModule.registerAsync(getJwtConfig()), UserModule],
  providers: [AuthService],
})
export class AuthModule {}
