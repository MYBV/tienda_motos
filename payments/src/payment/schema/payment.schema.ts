//####################################################################################
import * as mongoose from 'mongoose';
import { PaymentTypes } from '../../constant';
//####################################################################################

//####################################################################################
export const PaymentSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, min: 10, max: 255 },
    operationType: {
      type: String,
      required: true,
      enum: PaymentTypes,
      min: 6,
      max: 7,
    },
    mount_before: { type: Number, required: true },
    mount: { type: Number, required: true },
    mount_after: { type: Number, required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'customers' },
    state: { type: String, required: true, default: 'ACTIVO', min: 6, max: 8 },
    paymentDate: { type: Date, required: true },
  },
  { timestamps: true },
);
//####################################################################################

//####################################################################################
PaymentSchema.index({ customerId: 1 }, { unique: false });
//####################################################################################
