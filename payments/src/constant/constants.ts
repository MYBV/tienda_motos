//######################################################
export enum RabbitMQ {
  PaymentQueue = 'payments',
}
//######################################################

//######################################################
export enum PaymentMSG {
  CREATE_PAYMENT = 'CREATE_PAYMENT',
  FIND_PAYMENTS = 'FIND_PAYMENTS',
  FIND_PAYMENT = 'FIND_PAYMENT',
  FIND_PAYMENTS_CUSTOMER = 'FIND_PAYMENTS_CUSTOMER',
}
//######################################################

//######################################################
export enum PaymentTypes {
  PRESTAMO = 'PRESTAMO',
  ABONO = 'ABONO'
}
//######################################################
