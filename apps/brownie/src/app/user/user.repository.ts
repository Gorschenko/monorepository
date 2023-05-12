import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@octus/database';
import { Model } from 'mongoose';
import { IPublicUser, IUser } from '@octus/interfaces';
import { Query } from 'mongoose';
import { DeleteResult } from 'mongodb';

type userAlias = Pick<IUser, '_id' | 'flatNumber'>;

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async findAllUsers(): Promise<IPublicUser[]> {
    return await this.userModel.find().exec();
  }

  async createUser(user: IUser): Promise<IUser> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async findUserByAlias(alias: userAlias): Promise<IUser | null> {
    return await this.userModel.findOne(alias).exec();
  }

  async deleteUserByAlias(
    alias: userAlias
  ): Promise<Query<DeleteResult, IUser>> {
    return await this.userModel.deleteOne(alias).exec();
  }
}
