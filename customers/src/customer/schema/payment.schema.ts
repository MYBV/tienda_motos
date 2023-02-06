//#############################################################################
import * as mongoose from 'mongoose';
//#############################################################################

//#############################################################################
export const PaymentSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, min: 10, max: 255 },
    operationType: { type: String, required: true, min: 6, max: 10 },
    mount: { type: Number, required: true },
    customerId: { type: Number, required: true },
    paymentDate: { type: Date, required: true },
  },
  { timestamps: true },
);
//#############################################################################

//#############################################################################
PaymentSchema.index({ customerId: 1 }, { unique: false });
//#############################################################################
