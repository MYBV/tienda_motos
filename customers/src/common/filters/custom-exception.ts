//##########################################################################################
import { HttpException, HttpStatus } from '@nestjs/common';
//##########################################################################################

//##########################################################################################
export class CustomException extends HttpException {
  constructor(options: { status: HttpStatus; error: string | object }) {
    super(options.error, options.status);
  }
}
//##########################################################################################
