//#################################################################
import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { PaymentController } from './payment.controller';
//#################################################################

//#################################################################
@Module({
  imports: [ProxyModule],
  controllers: [PaymentController],
})
//#################################################################

//#################################################################
export class PaymentModule {}
//#################################################################
