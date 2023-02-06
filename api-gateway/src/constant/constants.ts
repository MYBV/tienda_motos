//######################################################
export enum RabbitMQ {
  UserQueue = 'users',
  CustomerQueue = 'customers',
  PaymentQueue = 'payments',
}
//######################################################

//######################################################
export enum UserMSG {
  CREATE_USER = 'CREATE_USER',
  FIND_USERS = 'FIND_USERS',
  FIND_USER = 'FIND_USER',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',
  VALID_USER = 'VALID_USER',
}
//######################################################

//######################################################
export enum CustomerMSG {
  CREATE_CUSTOMER = 'CREATE_CUSTOMER',
  FIND_CUSTOMERS = 'FIND_CUSTOMERS',
  FIND_CUSTOMER = 'FIND_CUSTOMER',
  UPDATE_CUSTOMER = 'UPDATE_CUSTOMER',
  DELETE_CUSTOMER = 'DELETE_CUSTOMER',
  ADD_PAYMENT = 'ADD_PAYMENT',
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
