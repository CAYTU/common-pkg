import { SubscriptionType, UserRole } from "../utils";

export interface UserEventInterface {
  id: string;
  username: string;
  firstName: string;
  email: string;
  image?: string;
  lastName: string;
  roles?: UserRole[];
  fcmToken?: string;
  isVerified?: boolean;
  subscriptionType?: SubscriptionType;
  isOnline?: boolean;
  isCompleted?: boolean;
  version: number;
}
