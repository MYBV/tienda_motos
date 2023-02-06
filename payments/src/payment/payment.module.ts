//#############################################################################
import { PAYMENT } from '../common/models/models';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentSchema } from './schema/payment.schema';
import { PaymentService } from './payment.service';
//#############################################################################

//#############################################################################
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PAYMENT.name,
        useFactory: () => PaymentSchema,
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
//#############################################################################

//#############################################################################
export class PaymentModule {}
//#############################################################################
