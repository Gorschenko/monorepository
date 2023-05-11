import { IsString } from 'class-validator';

export namespace UserLogin {
  export const topic = 'login';

  export class Request {
    @IsString()
    flatNumber: string;

    @IsString()
    password: string;
  }

  export class Response {
    token: string;
  }
}
