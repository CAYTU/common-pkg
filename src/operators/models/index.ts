import { Types } from "mongoose";
import { IMongooseObjectExt } from "../../types/utils/models";
import { OperatorStatus } from "../operator-status";
import { DeviceCategory } from "../../types/utils";

export type IdentityType = "nationalId" | "passport" | "driverLicense";

export interface OperatorInterface extends IMongooseObjectExt {
  /**
   * The overall rating of the user (optional).
   */
  overallRating?: number;

  /**
   * The number of ratings the user has received (optional).
   */
  ratings?: [
    {
      /**
       * The unique identifier of the user who rated the operator.
       */
      user: Types.ObjectId;

      /**
       * The rating value.
       */
      rating: number;
    },
  ];

  /**
   * The type of identity document used by the operator.
   */
  identityType?: IdentityType;

  /**
   * The path to the operator's identity photo.
   */
  identityPhoto?: string;

  /**
   * The operator's identity number. (Optional)
   */
  identityNumber?: string;

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
}

/**
 * Represents an event where an operator's identity is requested.
 */
export interface OperatorRequestedEventInterface {
  /**
   * The type of identity document requested.
   */
  identityType?: IdentityType;

  /**
   * The path to the requested identity photo.
   */
  identityPhoto?: string;

  /**
   * The requested identity number. (Optional)
   */
  identityNumber?: string;

  /**
   * The unique identifier of the associated user.
   */
  user: Types.ObjectId;

  /**
   * A brief description about the operator. (Optional)
   */
  aboutMe?: string;
}
