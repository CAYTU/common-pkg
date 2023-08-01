import mongoose, { Types } from "mongoose";
import { IDType, OperatorStatus } from "../utils";

/**
 * Operator:
 */

export interface OperatorInterface extends mongoose.Document {
  identityType: IDType;
  identityPhoto: string;
  identityNumber?: string;
  user: Types.ObjectId;
  active?: boolean;
  taskCount?: number;
  status?: OperatorStatus;
  wallet?: Types.ObjectId;
  aboutMe?: string;
  currentTask?: Types.ObjectId;
}
