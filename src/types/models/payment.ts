import mongoose, { Types } from "mongoose";
import { PaymentMethod, PaymentStatus, SubscriptionType } from "../utils";

/**
 * Payment
 */
export interface PaymentInterface extends mongoose.Document {
  // Ref to Customer Model
  customer: Types.ObjectId;
  accountId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  transactionId?: string;
  paymentMethod?: PaymentMethod; // Can be "card" or "wallet"
  isSubscribed?: boolean;
  description?: string;
  subscriptionPlan?: SubscriptionType; // Can be "monthly" or "yearly"
}
