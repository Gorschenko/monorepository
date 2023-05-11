import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  token: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(id: string): Promise<JwtPayload> {
    return {
      token: await this.jwtService.signAsync({ id }),
    };
  }
}
