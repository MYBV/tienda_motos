import { Payload } from '@nestjs/microservices';
//#########################################################################################
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PaymentMSG } from 'src/constant';
import { PaymentCreateDTO } from './dto/payment-create.dto';
import { PaymentService } from './payment.service';
//#########################################################################################

//#########################################################################################
@Controller()
//#########################################################################################

//#########################################################################################
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern(PaymentMSG.CREATE_PAYMENT)
  create_payment(@Payload() payLoad: any) {
    return this.paymentService.create_payment(payLoad.paymentDTO, payLoad.customer);
  }

  @MessagePattern(PaymentMSG.FIND_PAYMENTS)
  find_payments() {
    return this.paymentService.find_payments();
  }

  @MessagePattern(PaymentMSG.FIND_PAYMENT)
  find_payment(@Payload() id: string) {
    return this.paymentService.find_payment(id);
  }

  @MessagePattern(PaymentMSG.FIND_PAYMENTS_CUSTOMER)
  find_payments_customer(@Payload() id: string) {
    return this.paymentService.find_payments_customer(id);
  }
}
//#########################################################################################
