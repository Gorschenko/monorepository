import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@octus/database';
import { Model } from 'mongoose';
import { IUser } from '@octus/interfaces';
import { Query } from 'mongoose';
import { DeleteResult } from 'mongodb';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async createUser(user: IUser): Promise<IUser> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async findUserByAlias(alias: any): Promise<IUser | null> {
    return await this.userModel.findOne({ alias }).exec();
  }

  async deleteUserByAlias(alias: any): Promise<Query<DeleteResult, IUser>> {
    return await this.userModel.deleteOne({ alias }).exec();
  }
}
