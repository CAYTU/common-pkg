// File: src/models/users.ts

import { Types } from "mongoose";
import {
  OauthType,
  TaskType,
  UserMembershipStatus,
  UserRole,
} from "../../types/utils";

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

/**
 * @interface UserReplicaInterface
 *
 * @description Defines a TypeScript interface for a user replica object.
 *              A user replica object is a subset of the user object. It is used
 *              to represent a user object when another service needs to access user
 */
export interface UserReplicaInterface {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: UserRole[];
  ownedOrganizationId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
