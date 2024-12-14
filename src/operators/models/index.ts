import { Types } from "mongoose";
import { IMongooseObjectExt } from "../../types/utils/models";
import { DeviceCategory } from "../../types/utils";
import { OperatorStatus } from "../enums";
import { Rating } from "../types";
import { OperatorRequestData } from "./operator-request";

export interface OperatorInterface extends IMongooseObjectExt {
  /**
   * The overall rating of the user. (Optional)
   */
  overallRating?: number;

  /**
   * The number of ratings the user has received. (Optional)
   */
  ratings?: Rating[];

  /**
   * The unique identifier of the associated user.
   */
  user: Types.ObjectId;

  /**
   * Indicates whether the operator is active. (Optional)
   */
  active?: boolean;

  /**
   * The number of tasks assigned to the operator. (Optional)
   */
  taskCount?: number;

  /**
   * The status of the operator. (Optional)
   */
  status?: OperatorStatus;

  /**
   * The total amount of earned credit by the operator. (Optional)
   */
  earnedCredits?: number;

  /**
   * The total amount of converted credit by the operator. (Optional)
   */
  convertedCredits?: number;

  /**
   * A brief description about the operator. (Optional)
   */
  aboutMe?: string;

  /**
   * Indicates whether the operator is public. (Optional)
   */
  isPublic?: boolean;

  /**
   * If the operator is not public, the organization the operator belongs to. (Optional)
   */
  organization?: Types.ObjectId;

  /**
   * The unique identifier of the operator's current task. (Optional)
   */
  currentTask?: Types.ObjectId;

  /**
   * Indicates whether the operator has a pending request. (Optional)
   */
  hasPendingRequest?: boolean;

  /**
   * A list of device categories allowed for the operator. (Optional)
   */
  allowedDeviceCategories?: DeviceCategory[];

  /**
   * The request data for the operator. (Optional)
   */
  requestData?: OperatorRequestData;
}

/**
 * Represents an event where an operator's identity is requested.
 */
export interface OperatorRequestedEventInterface extends OperatorRequestData {
  /**
   * The unique identifier of the associated user.
   */
  user: Types.ObjectId;

  /**
   * The unique identifier of the organization the request is made for.
   */
  organization?: Types.ObjectId;
}

// Export interface
export * from "./operator-request";
