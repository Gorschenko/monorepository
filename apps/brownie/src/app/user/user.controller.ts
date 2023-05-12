import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { GetAllUsers } from '@octus/contracts';

@Controller('users')
export class UserContoller {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUsers(): Promise<GetAllUsers.Response> {
    const users = await this.userService.getAllUsers();
    return { users };
  }
}
