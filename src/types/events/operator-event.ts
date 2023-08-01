import { Types } from "mongoose";
import { IDType, OperatorStatus } from "../utils";

/**
 * Operator:
 */

export interface OperatorEventInterface {
  id: string;
  user: Types.ObjectId;
  active?: boolean;
  currentTask?: Types.ObjectId;
  status?: OperatorStatus;
  wallet?: Types.ObjectId;
  version: number;
}

export interface OperatorRequestedEventInterface {
  identityType: IDType;
  identityPhoto: string;
  identityNumber?: string;
  user: Types.ObjectId;
  aboutMe?: string;
}
