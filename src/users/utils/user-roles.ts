/**
 * Enumerates the possible roles for users.
 */
export enum UserRole {
  Invited = "invited",
  /** This is the most basic role that any user that creates an account through the API will have. This role is for the robot. */
  Robot = "robot",
  /** Basic operations are allowed: Read & Create Task. */
  Customer = "customer",
  /** This role combines both the customer and the operator roles. */
  Operator = "operator",
  /** Not only does it encapsulate the roles of customer and operator. */
  Admin = "admin",
  /** Super Admin role with extended privileges. */
  SuperAdmin = "super-admin",
  /** Allows users to delete resources. */
  Delete = "delete",
  /** Allows users to create resources. */
  Create = "create",
  /** Allows users to update resources. */
  Update = "update",
  /** Provides read-only access to resources. */
  ReadOnly = "readOnly",
  /** Role for developers with special privileges. */
  Developer = "developer",
  /** Special role granting all permissions. */
  All = "all",
}

export const PrimaryRoles = [
  UserRole.Invited,
  UserRole.Customer,
  UserRole.Developer,
  UserRole.Operator,
  UserRole.Admin,
  UserRole.SuperAdmin,
];

export const UserPermissions = [
  UserRole.All,
  UserRole.ReadOnly,
  UserRole.Create,
  UserRole.Delete,
  UserRole.Update,
];
