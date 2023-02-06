//#####################################################
import { IPayment } from './payment.interface';
//#####################################################

//#####################################################
export interface ICustomer extends Document {
  name: string;
  dni: string;
  email: string;
  credit: number;
  payments: IPayment[];
}
//#####################################################
