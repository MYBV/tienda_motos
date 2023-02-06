//############################################################################################
import { ClientProxyTiendaMotos } from './../common/proxy/client-proxy';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PaymentCreateDTO } from './dto/payment-create.dto';
import { CustomerMSG, PaymentMSG } from 'src/constant';
import { Observable } from 'rxjs';
import { IPayment } from 'src/common/interfaces/payment.interface';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
//############################################################################################

//############################################################################################
@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payment')
//############################################################################################

//############################################################################################
export class PaymentController {
  constructor(private readonly clientProxy: ClientProxyTiendaMotos) {}
  private _clientProxyPayment = this.clientProxy.clientProxyPayments();
  private _clientProxyCustomer = this.clientProxy.clientProxyCustomers();

  @Post()
  @ApiOperation({ summary: 'Create a Payment' })
  async create_payment(@Body() paymentDTO: PaymentCreateDTO) {
    let customer = await this._clientProxyCustomer
      .send(CustomerMSG.FIND_CUSTOMER, paymentDTO.customerId)
      .toPromise();

    if (customer.hasOwnProperty('status')) {
      throw new HttpException(customer.msg, customer.status);
    }

    let resultado = await this._clientProxyPayment
      .send(PaymentMSG.CREATE_PAYMENT, { paymentDTO, customer })
      .toPromise();

    await this._clientProxyCustomer.send(CustomerMSG.ADD_PAYMENT, {
      customer,
      resultado,
    }).toPromise()


    return resultado;
  }

  @Get()
  @ApiOperation({ summary: 'List all Payments Actives' })
  find_payments(): Observable<IPayment[]> {
    return this._clientProxyPayment.send(PaymentMSG.FIND_PAYMENTS, '');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Payment with details' })
  find_payment(@Param('id') id: string): Observable<IPayment> {
    return this._clientProxyPayment.send(PaymentMSG.FIND_PAYMENT, id);
  }

  @Get('/customer/:id')
  @ApiOperation({ summary: 'List Payments of a Customer' })
  find_payments_customer(@Param('id') id: string): Observable<any> {
    return this._clientProxyPayment.send(PaymentMSG.FIND_PAYMENTS_CUSTOMER, id);
  }
}
//############################################################################################
