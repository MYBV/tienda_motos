//#######################################################################################
import { PAYMENT } from '../common/models/models';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPayment } from '../common/interfaces/payment.interface';
import { PaymentCreateDTO } from './dto/payment-create.dto';
//#######################################################################################

//#######################################################################################
@Injectable()
//#######################################################################################

//#######################################################################################
export class PaymentService {
  constructor(
    @InjectModel(PAYMENT.name)
    private readonly model: Model<IPayment>,
  ) {}

  async calculations(mount: number, actually: number, operationType: string) {
    let mount_after =
      operationType == 'PRESTAMO' ? actually - mount : actually + mount;

    return mount_after;
  }

  async create_payment(paymentDTO: PaymentCreateDTO, customer: object) {

    let mount_after = await this.calculations(
      paymentDTO.mount,
      customer['credit'],
      paymentDTO.operationType,
    );
    let newPayment = new this.model({
      ...paymentDTO,
      mount_before: customer['credit'],
      mount_after: mount_after,
    });
    await newPayment.save();

    return {
      status: HttpStatus.CREATED,
      msg: `Payment Registred ${newPayment._id}`,
      credit: mount_after,
      id: newPayment._id
    };
  }

  async find_payments(): Promise<IPayment[]> {
    return await this.model.find({ state: 'ACTIVO' });
  }

  async find_payments_customer(customerId: string): Promise<IPayment[]> {
    return await this.model
      .find({ customerId: customerId, state: 'ACTIVO' })
  }

  async find_payment(id: string) {
    let resultado = await this.model
      .findOne({ _id: id, state: 'ACTIVO' })

    if (!resultado) {
      return { status: HttpStatus.NOT_FOUND, msg: 'Payment NOT Found' };
    }

    return resultado;
  }
}
//#######################################################################################
