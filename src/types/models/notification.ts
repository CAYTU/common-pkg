import mongoose, { Types } from "mongoose";
/**
 * Notification
 */

export interface NotificationInterface extends mongoose.Document {
  title: string;
  users: Types.ObjectId[];
  body?: string;
  isRead?: boolean;
}
