import mongoose, { Types } from "mongoose";
import { PaymentStatus, SubscriptionType } from "../utils";

/**
 * Payment
 */
export interface PaymentRepInterface extends mongoose.Document {
  id: string;
  // Ref to Customer Model
  customer: Types.ObjectId;
  status: PaymentStatus;
  description?: string;
  subscriptionPlan?: SubscriptionType; // Can be "monthly" or "yearly"
}

export interface PaymentEventInterface extends PaymentRepInterface {
  version: number;
}
