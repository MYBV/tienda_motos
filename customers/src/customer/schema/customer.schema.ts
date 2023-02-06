//######################################################################################
import * as mongoose from 'mongoose';
//######################################################################################

//######################################################################################
export const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 8, max: 50 },
    dni: { type: String, required: true, minlength: 8, max: 25 },
    email: { type: String, required: true, minlength: 6, max: 255 },
    credit: { type: Number, required: true, default: 0 },
    state: { type: String, required: true, default: 'ACTIVO', min: 6, max: 8 },
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'payments' }],
  },
  { timestamps: true },
);
//######################################################################################

//######################################################################################
CustomerSchema.index({ dni: 1 }, { unique: true });
CustomerSchema.index({ email: 1 }, { unique: true });
//######################################################################################
