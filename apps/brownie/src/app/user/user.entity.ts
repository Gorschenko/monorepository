import { IPublicUser, IUser } from '@octus/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';

export class UserEntity implements IUser {
  _id?: string;
  flatNumber: string;
  passwordHash: string;

  constructor(user: IUser) {
    this._id = user._id;
    this.flatNumber = user.flatNumber;
    this.passwordHash = user.passwordHash;
    console.log(this);
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async validatePassword(password: string) {
    return await compare(password, this.passwordHash);
  }

  public getPublicEntity(): IPublicUser {
    return {
      _id: this._id,
      flatNumber: this.flatNumber,
    };
  }
}
