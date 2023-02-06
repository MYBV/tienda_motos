//#####################################################
import { IPayment } from './payment.interface';
//#####################################################

//#####################################################
export interface ICustomer {
  name: string;
  dni: string;
  email: string;
  credit: number;
  payments: IPayment[];
}
//#####################################################
