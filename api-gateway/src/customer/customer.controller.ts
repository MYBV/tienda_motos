//############################################################################################
import { ClientProxyTiendaMotos } from '../common/proxy/client-proxy';
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CustomerCreateDTO } from './dto/customer-create.dto';
import { ICustomer } from 'src/common/interfaces/customer.interface';
import { CustomerMSG } from 'src/constant/constants';
import { Observable } from 'rxjs';
import { CustomerUpdateDTO } from './dto/customer-update.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
//############################################################################################

//############################################################################################
@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('customer')
//############################################################################################

//############################################################################################
export class CustomerController {
  constructor(private readonly clientProxy: ClientProxyTiendaMotos) {}
  private _clientProxyCustomer = this.clientProxy.clientProxyCustomers();

  @Post()
  @ApiOperation({ summary: 'Create a Customer' })
  create_customer(
    @Body() customerDTO: CustomerCreateDTO,
  ): Observable<ICustomer> {
    return this._clientProxyCustomer.send(
      CustomerMSG.CREATE_CUSTOMER,
      customerDTO,
    );
  }

  @Get()
  @ApiOperation({ summary: 'List all Customers Actives' })
  find_customers(): Observable<ICustomer[]> {
    return this._clientProxyCustomer.send(CustomerMSG.FIND_CUSTOMERS, '');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Customer with details' })
  find_customer(@Param('id') id: string): Observable<ICustomer> {
    return this._clientProxyCustomer.send(CustomerMSG.FIND_CUSTOMER, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Customer' })
  update_customer(
    @Param('id') id: string,
    @Body() customerDTO: CustomerUpdateDTO,
  ): Observable<ICustomer> {
    return this._clientProxyCustomer.send(CustomerMSG.UPDATE_CUSTOMER, {
      id,
      customerDTO,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete (inactive) a Customer' })
  delete_customer(@Param('id') id: string): Observable<any> {
    return this._clientProxyCustomer.send(CustomerMSG.DELETE_CUSTOMER, id);
  }
}
//############################################################################################
