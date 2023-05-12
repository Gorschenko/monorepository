import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCreate } from '@octus/contracts';
import { UserEntity } from './user.entity';
import { IPublicUser } from '@octus/interfaces';
import { HttpError } from '@octus/services';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(): Promise<IPublicUser[]> {
    return await this.userRepository.findAllUsers();
  }

  async createUser(user: UserCreate.Request): Promise<IPublicUser> {
    const existedUser = await this.userRepository.findUserByAlias({
      flatNumber: user.flatNumber,
    });
    if (existedUser) {
      throw new HttpError(409, 'Такой пользователь уже создан');
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
    const existedUser = await this.userRepository.findUserByAlias({
      flatNumber,
    });
    if (!existedUser) {
      throw new HttpError(401, 'Неверный логин');
    }
    const userEntity = new UserEntity(existedUser);
    const isCorrectPassword = await userEntity.validatePassword(password);
    if (!isCorrectPassword) {
      throw new HttpError(401, 'Неверный пароль');
    }
    return { _id: existedUser._id };
  }
}
