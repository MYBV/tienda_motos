//####################################################################################################
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import { throwError } from 'rxjs';
import { CustomException } from './custom-exception';
//####################################################################################################

//####################################################################################################
@Catch()
//####################################################################################################

//####################################################################################################
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let msg =
      exception instanceof HttpException ? exception.getResponse() : exception;

    switch (exception.constructor) {
      case HttpException:
        status = (exception as HttpException).getStatus();
        break;
      case MongoServerError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        msg = `Error MongoDB ${JSON.stringify(exception)}`;
        break;
    }

    return throwError(
      () =>
        new CustomException({
          status: status,
          error: msg,
        }),
    );
  }
}
//####################################################################################################
