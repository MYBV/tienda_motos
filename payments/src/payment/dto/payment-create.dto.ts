//######################################################
export class PaymentCreateDTO {
  readonly description: string;
  readonly operationType: string;
  readonly mount: number;
  readonly customerId: number;
  readonly paymentDate: Date;
}
//####################################################
