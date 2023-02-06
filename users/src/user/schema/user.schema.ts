//######################################################################################
import * as mongoose from 'mongoose';
//######################################################################################

//######################################################################################
export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 8, maxlength: 50 },
    username: { type: String, required: true, minlength: 8, maxlength: 100 },
    email: { type: String, required: true, minlength: 6, maxlength: 255 },
    password: { type: String, required: true, minlength: 6, maxlength: 255 },
    state: { type: String, required: true, default: 'ACTIVO', min: 6, maxlength: 8 },
  },
  { timestamps: true },
);
//######################################################################################

//######################################################################################
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });
//######################################################################################
