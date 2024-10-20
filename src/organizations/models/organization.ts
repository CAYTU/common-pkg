import { Types } from "mongoose";
import { TaskType } from "../../tasks/enums";
import { IMongooseObjectExt } from "../../types/utils/models";
import { OrganizationType } from "../enums";

/**
 * Represents an organization with extended properties.
 */
export interface OrganizationInterface extends IMongooseObjectExt {
  /**
   * The name of the organization.
   */
  name: string;

  /**
   * The total remaining credits available for the organization.
   */
  remainingCredits: number;

  /**
   * The initial amount of credits the organization started with.
   */
  initialCredits: number;

  /**
   * The credit threshold at which notifications or actions are triggered (optional).
   */
  creditThreshold?: number;

  /**
   * The domain associated with the organization (optional).
   */
  domain?: string;

  /**
   * An optional description of the organization.
   */
  description?: string;

  /**
   * The URL or path to the image/logo associated with the organization (optional).
   */
  image?: string;

  /**
   * The country where the organization is located (optional).
   */
  country?: string;

  /**
   * The state where the organization is located (optional).
   */
  state?: string;

  /**
   * The city where the organization is located (optional).
   */
  city?: string;

  /**
   * The street address of the organization (optional).
   */
  address?: string;

  /**
   * Array of default task types that the organization is allowed to perform (optional).
   */
  defaultAllowedTaskTypes?: TaskType[];

  /**
   * The total number of members in the organization (optional).
   */
  membersCount?: number;

  /**
   * The MongoDB ObjectId for the organization's subscription (optional).
   */
  subscriptionId?: Types.ObjectId;

  /**
   * The MongoDB ObjectId representing the owner of the organization (optional).
   */
  owner?: Types.ObjectId;

  /**
   * The type of organization, which differentiates between principal organizations and subsidiaries (optional).
   */
  type?: OrganizationType;
}
