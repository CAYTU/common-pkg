import { Types } from "mongoose";
import { TaskType } from "../../tasks/enums";
import { UserRole } from "../../types/utils";
import { IMongooseObjectExt } from "../../types/utils/models";
import { UserMembershipStatus } from "../enums";

/**
 * Represents an organization membership object with extended properties.
 */
export interface OrganizationMemberInterface extends IMongooseObjectExt {
  /**
   * The email of the user. Use for invitation.
   */
  email: string;

  /**
   * The unique identifier of the organization to which the user is invited.
   */
  organizationId: string;

  /**
   * The role of the user in the organization.
   */
  rolesInOrganization: UserRole[];

  /**
   * The type of tasks the user is allowed to execute within the organization
   */
  allowedTasksInOrganization: TaskType[];

  /**
   * The status of the membership.
   */
  status: UserMembershipStatus;

  /**
   * The unique identifier of the user. Populated when the user accepts the invitation.
   */
  user?: Types.ObjectId;
}
