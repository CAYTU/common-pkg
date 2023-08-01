import mongoose, { Types } from "mongoose";
import { OperatorStatus } from "../utils";

/**
 * Operator:
 */

export interface OperatorRepInterface extends mongoose.Document {
  id: string;
  user: Types.ObjectId;
  active?: boolean;
  currentTask?: Types.ObjectId;
  status?: OperatorStatus;
  wallet?: Types.ObjectId;
}
