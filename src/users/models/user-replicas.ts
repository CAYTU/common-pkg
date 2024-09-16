import { Types } from "mongoose";
import { UserRole } from "../utils";

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
