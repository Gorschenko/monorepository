import { Body, Controller, Post } from '@nestjs/common';
import { UserCreate, UserLogin } from '@octus/contracts';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post(UserCreate.topic)
  async createUser(
    @Body() dto: UserCreate.Request
  ): Promise<UserCreate.Response> {
    const newUser = await this.userService.createUser(dto);
    return { user: newUser };
  }

  @Post(UserLogin.topic)
  async login(
    @Body() { flatNumber, password }: UserLogin.Request
  ): Promise<UserLogin.Response> {
    const { _id } = await this.userService.validateUser(flatNumber, password);
    return await this.authService.login(_id);
  }
}
