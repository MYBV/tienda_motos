//#################################################################
import { Module } from '@nestjs/common';
import { ClientProxyTiendaMotos } from './client-proxy';
//#################################################################

//#################################################################
@Module({
  providers: [ClientProxyTiendaMotos],
  exports: [ClientProxyTiendaMotos],
})
//#################################################################

//#################################################################
export class ProxyModule {}
//#################################################################