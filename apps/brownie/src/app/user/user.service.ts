import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCreate } from '@octus/contracts';
import { UserEntity } from './user.entity';
import { IPublicUser } from '@octus/interfaces';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: UserCreate.Request): Promise<IPublicUser> {
    const existedUser = this.userRepository.findUserByAlias(user.flatNumber);
    if (existedUser) {
      throw new Error('Такой пользователь уже создан');
    }
    const userEntity = await new UserEntity({
      ...user,
      passwordHash: '',
    }).setPassword(user.password);
    const newUser = await this.userRepository.createUser(userEntity);
    return new UserEntity(newUser).getPublicEntity();
  }

  async validateUser(
    flatNumber: string,
    password: string
  ): Promise<{ _id: string }> {
    const existedUser = await this.userRepository.findUserByAlias(flatNumber);
    if (!existedUser) {
      throw new Error('Неверный логин');
    }
    const userEntity = new UserEntity(existedUser);
    const isCorrectPassword = await userEntity.validatePassword(password);
    if (!isCorrectPassword) {
      throw new Error('Неверный пароль');
    }
    return { _id: existedUser._id };
  }
}
