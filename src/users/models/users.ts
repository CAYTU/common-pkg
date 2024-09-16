// File: src/models/users.ts

import { Types } from "mongoose";
import { OauthType, UserRole } from "../../types/utils";
import { TaskType } from "../../tasks/enums";
import { UserMembershipStatus } from "../../organizations/enums";

/**
 * @interface UserInterface
 *
 * @description Defines a TypeScript interface for a user object.
 */
export interface UserInterface {
  username: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  country?: string;
  city?: string;
  address?: string;
  isVerified?: boolean;
  isCompleted?: boolean;
  fcmToken?: string;
  password: string;
  image?: string;
  roles: UserRole[];
  allowedTaskTypes?: TaskType[] | string[];
  oauthType?: OauthType;
  membershipStatus?: UserMembershipStatus;
  ownedOrganizationId?: Types.ObjectId;
  currentOrganizationId?: Types.ObjectId;
  rolesInOrganization?: {
    organizationId: Types.ObjectId;
    roles: UserRole[];
    allowedTaskTypes?: TaskType[] | string[];
  }[];
  isOnline?: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
