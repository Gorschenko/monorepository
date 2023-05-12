import { IPublicUser } from '@octus/interfaces';

export namespace GetAllUsers {
  export const topic = '';

  export class Request {}

  export class Response {
    users: IPublicUser[];
  }
}
