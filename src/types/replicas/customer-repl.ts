import mongoose, { Types } from "mongoose";

/**
 * Customer:
 */

export interface CustomerRepInterface extends mongoose.Document {
  id: string;
  user: Types.ObjectId;
}
