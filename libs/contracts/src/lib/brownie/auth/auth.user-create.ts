import { IsString } from 'class-validator';
import { IPublicUser } from '@octus/interfaces';

export namespace UserCreate {
  export const topic = 'create';

  export class Request {
    @IsString()
    flatNumber: string;

    @IsString()
    password: string;
  }

  export class Response {
    user: IPublicUser;
  }
}
