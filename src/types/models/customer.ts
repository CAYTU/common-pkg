import mongoose, { Types } from "mongoose";

/**
 * Customer:
 */

export interface CustomerInterface extends mongoose.Document {
  user: Types.ObjectId;
  loyaltyPoint?: number;
  wallet?: number;
}
