//#############################################################
import { Injectable } from '@nestjs/common';
//#############################################################

//#############################################################
@Injectable()
//#############################################################

//#############################################################
export class AppService {
  getDefault() {
    return { msg: 'API Tienda Motos V1' };
  }
}
//#############################################################
