//####################################################################
import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { CustomerController } from './customer.controller';
//####################################################################

//####################################################################
@Module({
  imports: [ProxyModule],
  controllers: [CustomerController],
})
//####################################################################

//####################################################################
export class CustomerModule {}
//####################################################################
