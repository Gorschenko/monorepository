export type IPublicUser = Omit<IUser, 'passwordHash'>;

export interface IUser {
  _id?: string;
  flatNumber: string;
  passwordHash: string;
}
