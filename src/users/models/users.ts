// File: src/models/users.ts

import { Types } from "mongoose";
import { OauthType, UserRole } from "../../types/utils";
import { TaskType } from "../../tasks/enums";
import { UserMembershipStatus } from "../../organizations/enums";

/**
 * @interface UserInterface
 *
 * @description Represents the structure of a user entity within the application.
 */
export interface UserInterface {
  /**
   * The unique username for the user.
   */
  username: string;

  /**
   * The user's first name.
   */
  firstName: string;

  /**
   * The user's last name.
   */
  lastName: string;

  /**
   * The user's phone number (optional).
   */
  phone?: string;

  /**
   * The user's email address.
   */
  email: string;

  /**
   * The user's country (optional).
   */
  country?: string;

  /**
   * The user's city (optional).
   */
  city?: string;

  /**
   * The user's full address (optional).
   */
  address?: string;

  /**
   * Indicates whether the user's account has been verified (optional).
   */
  isVerified?: boolean;

  /**
   * Indicates whether the user's profile is completed (optional).
   */
  isCompleted?: boolean;

  /**
   * The user's Firebase Cloud Messaging (FCM) token for push notifications (optional).
   */
  fcmToken?: string;

  /**
   * The user's hashed password.
   */
  password: string;

  /**
   * The URL of the user's profile image (optional).
   */
  image?: string;

  /**
   * The roles assigned to the user within the system.
   */
  roles: UserRole[];

  /**
   * The types of tasks the user is allowed to perform, either as an enum or a string (optional).
   */
  allowedTaskTypes?: TaskType[] | string[];

  /**
   * The OAuth provider type used for the user's authentication (optional).
   */
  oauthType?: OauthType;

  /**
   * The user's membership status within an organization (optional).
   */
  membershipStatus?: UserMembershipStatus;

  /**
   * The ID of the organization owned by the user (optional).
   */
  ownedOrganizationId?: Types.ObjectId;

  /**
   * The ID of the organization the user is currently associated with (optional).
   */
  currentOrganizationId?: Types.ObjectId;

  /**
   * An array of objects representing the user's roles and permissions within specific organizations (optional).
   */
  rolesInOrganization?: {
    /**
     * The ID of the organization.
     */
    organizationId: Types.ObjectId;

    /**
     * The roles assigned to the user within the organization.
     */
    roles: UserRole[];

    /**
     * The types of tasks the user is allowed to perform within the organization (optional).
     */
    allowedTaskTypes?: TaskType[] | string[];
  }[];

  /**
   * Indicates whether the user is currently online (optional).
   */
  isOnline?: boolean;

  /**
   * The timestamp of the user's last login (optional).
   */
  lastLogin?: Date;

  /**
   * Additional metadata or custom properties associated with the user (optional).
   */
  metadata?: Record<string, any>;

  /**
   * The timestamp when the user entity was created (optional).
   */
  createdAt?: Date;

  /**
   * The timestamp when the user entity was last updated (optional).
   */
  updatedAt?: Date;
}
