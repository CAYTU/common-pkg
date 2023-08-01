import mongoose from "mongoose";
import { OauthType, SubscriptionType, UserRole, UserStatuses } from "../utils";

/**
 * User:
 */

// Common
export type Point = {
  type?: string;
  coordinates: [number, number];
};

export interface UserInterface extends mongoose.Document {
  username: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  isVerified?: boolean;
  isCompleted?: boolean;
  fcmToken?: string;
  password: string;
  image?: string;
  roles: UserRole[];
  oauthType?: OauthType;
  status?: UserStatuses;
  position?: mongoose.Schema.Types.Point & Point;
  subscriptionType?: SubscriptionType;
  isOnline?: boolean;
}
