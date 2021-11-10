import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  public catch(exception: Error | HttpException | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let responseBody = {
      statusCode: status,
      message: exception?.message || 'Internal server error',
    };
    if (exception?.response) {
      if (exception.response instanceof Object) {
        if (exception.response.data) {
          responseBody.message = exception.response.data;
        } else {
          responseBody = exception.response;
        }
        if (exception.response?.status) {
          responseBody.statusCode = exception.response.status;
        }
      } else {
        responseBody.message = exception.response;
      }
    }

    if (typeof exception.toJSON === 'function') {
      this.logger.error(JSON.stringify(exception));
    } else {
      this.logger.error(exception, exception.stack);
    }

    response.status(status).json(responseBody);
  }
}
