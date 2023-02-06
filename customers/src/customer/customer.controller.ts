//#########################################################################################
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerMSG } from '../constant';
import { CustomerService } from './customer.service';
import { CustomerCreateDTO } from './dto/customer-create.dto';
//#########################################################################################

//#########################################################################################
@Controller()
//#########################################################################################

//#########################################################################################
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @MessagePattern(CustomerMSG.CREATE_CUSTOMER)
  create_customer(@Payload() customerDTO: CustomerCreateDTO) {
    return this.customerService.create_customer(customerDTO);
  }

  @MessagePattern(CustomerMSG.FIND_CUSTOMERS)
  find_customers() {
    return this.customerService.find_customers();
  }

  @MessagePattern(CustomerMSG.FIND_CUSTOMER)
  find_customer(@Payload() id: string) {
    return this.customerService.find_customer(id);
  }

  @MessagePattern(CustomerMSG.UPDATE_CUSTOMER)
  update_customer(@Payload() payLoad: any) {
    return this.customerService.update_customer(
      payLoad.id,
      payLoad.customerDTO,
    );
  }

  @MessagePattern(CustomerMSG.ADD_PAYMENT)
  update_credit(@Payload() payLoad: any) {
    return this.customerService.update_credit(
      payLoad.customer,
      payLoad.resultado,
    );
  }

  @MessagePattern(CustomerMSG.DELETE_CUSTOMER)
  delete_customer(@Payload() id: string) {
    return this.customerService.delete_customer(id);
  }
}
//#########################################################################################
