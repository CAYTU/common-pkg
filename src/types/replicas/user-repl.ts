import mongoose from "mongoose";
import { SubscriptionType, UserRole } from "../utils";

/**
 * User:
 * This is the user model that will be used in others services.
 */

export interface UserRepInterface extends mongoose.Document {
  id: string;
  username: string;
  firstName: string;
  email: string;
  image?: string;
  roles?: UserRole[];
  lastName: string;
  fcmToken?: string;
  isVerified?: boolean;
  subscriptionType?: SubscriptionType;
  isOnline?: boolean;
  isCompleted?: boolean;
}
