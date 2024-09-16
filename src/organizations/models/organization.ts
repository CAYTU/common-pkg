import { Types } from "mongoose";
import { TaskType } from "../../tasks/enums";
import { IMongooseObjectExt } from "../../types/utils/models";
import { OrganizationType } from "../enums";

/**
 * Represents an organization object with extended properties.
 */
export interface OrganizationInterface extends IMongooseObjectExt {
  /**
   * The name of the organization.
   */
  name: string;

  /**
   * The domain associated with the organization.
   */
  domain?: string;

  /**
   * An optional description of the organization.
   */
  description?: string;

  /**
   * The URL or path to the image associated with the organization (optional).
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
   * The address of the organization (optional).
   */
  address?: string;

  /**
   * Array of task types allowed for the organization (optional).
   */
  defaultAllowedTaskTypes?: TaskType[];

  /**
   * The number of members in the organization (optional).
   */
  membersCount?: number;

  remainingCredits: number;
  initialCredits: number;

  /**
   * The subscription ID of the organization (optional).
   */
  subscriptionId?: Types.ObjectId;

  /**
   * The unique identifier of the owner of the organization (optional).
   */
  owner?: Types.ObjectId;

  /**
   * The type of organization (optional).
   * @remarks This property is used to differentiate between different types of organizations.
   * For example, one can be a principal organization while another can be a subsidiary.
   */
  type?: OrganizationType;
}
