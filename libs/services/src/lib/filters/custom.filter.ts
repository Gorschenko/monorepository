import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { HttpError } from './http-error.class';

@Catch(Error)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(error: Error | HttpError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const statusCode = error instanceof HttpError ? error.statusCode : 500;
    res.status(statusCode).send({
      ok: true,
      error: error.message,
      payload: null,
    });
  }
}
