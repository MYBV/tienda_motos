//###########################################################################
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerSchema } from './schema/customer.schema';
import { CUSTOMER, PAYMENT } from '../common/models/models';
import { PaymentSchema } from './schema/payment.schema';
//###########################################################################

//###########################################################################
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: CUSTOMER.name,
        useFactory: () =>
          CustomerSchema.plugin(require('mongoose-autopopulate')),
      },
      {
        name: PAYMENT.name,
        useFactory: () => PaymentSchema,
      },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
//###########################################################################

//###########################################################################
export class CustomerModule {}
//###########################################################################
