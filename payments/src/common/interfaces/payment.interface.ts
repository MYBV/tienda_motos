//####################################################
export interface IPayment extends Document{
  description: string;
  operationType: string;
  mount: number;
  customerId: number;
  paymentDate: Date;
}
//####################################################

