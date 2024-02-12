import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { ForbiddenErr } from "../../errors/forbidden";
import { UserRole } from "../../types/utils";

/**
 * Role Based Access Control (RBAC) middleware for user access control.
 */
const RbaUserACL = {
  /**
   * Middleware that allows access for users with UserRole.Create, UserRole.All, or UserRole.Admin roles.
   * Throws a ForbiddenErr if access is denied.
   */
  canCreate: (...roles: UserRole[]) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const connectedToOwnOrganization =
        req.currentUser?.currentOrganizationId ===
        req.currentUser?.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.rolesInCurrentOrganization?.roles
        : req.currentUser?.roles;

      // Check if user has any of the provided roles
      if (
        roles.some(
          (role) =>
            userRoles?.includes(role) ||
            role === UserRole.All ||
            role === UserRole.Admin ||
            role === UserRole.SuperAdmin
        )
      ) {
        next();
      } else {
        throw new ForbiddenErr("Cannot create.");
      }
    }),

  /**
   * Middleware that allows access for users with UserRole.Update, UserRole.All, or UserRole.Admin roles.
   * Throws a ForbiddenErr if access is denied.
   */
  canEdit: (...roles: UserRole[]) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const connectedToOwnOrganization =
        req.currentUser?.currentOrganizationId ===
        req.currentUser?.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.rolesInCurrentOrganization?.roles
        : req.currentUser?.roles;

      // Check if user has any of the provided roles
      if (
        roles.some(
          (role) =>
            userRoles?.includes(role) ||
            role === UserRole.All ||
            role === UserRole.Admin ||
            role === UserRole.SuperAdmin
        )
      ) {
        next();
      } else {
        throw new ForbiddenErr("Cannot edit.");
      }
    }),

  /**
   * Middleware that allows access for users with UserRole.Delete, UserRole.All, or UserRole.Admin roles.
   * Throws a ForbiddenErr if access is denied.
   */
  canDelete: (...roles: UserRole[]) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const connectedToOwnOrganization =
        req.currentUser?.currentOrganizationId ===
        req.currentUser?.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.rolesInCurrentOrganization?.roles
        : req.currentUser?.roles;

      // Check if user has any of the provided roles
      if (
        roles.some(
          (role) =>
            userRoles?.includes(role) ||
            role === UserRole.All ||
            role === UserRole.Admin ||
            role === UserRole.SuperAdmin
        )
      ) {
        next();
      } else {
        throw new ForbiddenErr("Cannot delete.");
      }
    }),

  /**
   * Middleware that allows read-only access for users with UserRole.ReadOnly, UserRole.All, or UserRole.Admin roles.
   * Throws a ForbiddenErr if access is denied.
   */
  canReadOnly: (...roles: UserRole[]) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const connectedToOwnOrganization =
        req.currentUser?.currentOrganizationId ===
        req.currentUser?.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.rolesInCurrentOrganization?.roles
        : req.currentUser?.roles;

      // Check if user has any of the provided roles
      if (
        roles.some(
          (role) =>
            userRoles?.includes(role) ||
            role === UserRole.All ||
            role === UserRole.Admin ||
            role === UserRole.SuperAdmin
        )
      ) {
        next();
      } else {
        throw new ForbiddenErr("Cannot read content.");
      }
    }),

  /**
   * Middleware that allows access for users with UserRole.Customer, UserRole.Admin, UserRole.All, or UserRole.Operator roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isCustomer: (...roles: UserRole[]) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const connectedToOwnOrganization =
        req.currentUser?.currentOrganizationId ===
        req.currentUser?.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.rolesInCurrentOrganization?.roles
        : req.currentUser?.roles;

      // Check if user has any of the provided roles
      if (
        roles.some(
          (role) =>
            userRoles?.includes(role) ||
            role === UserRole.All ||
            role === UserRole.Admin ||
            role === UserRole.SuperAdmin
        )
      ) {
        next();
      } else {
        throw new ForbiddenErr("Operation is not allowed for customers.");
      }
    }),

  /**
   * Middleware that allows access for users with UserRole.Operator, UserRole.Admin, or UserRole.All roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isOperator: (...roles: UserRole[]) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const connectedToOwnOrganization =
        req.currentUser?.currentOrganizationId ===
        req.currentUser?.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.rolesInCurrentOrganization?.roles
        : req.currentUser?.roles;

      // Check if user has any of the provided roles
      if (
        roles.some(
          (role) =>
            userRoles?.includes(role) ||
            role === UserRole.All ||
            role === UserRole.Admin ||
            role === UserRole.SuperAdmin
        )
      ) {
        next();
      } else {
        throw new ForbiddenErr("Operation is not allowed for operators.");
      }
    }),

  /**
   * Middleware that allows access for users with UserRole.Admin or UserRole.All roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isAdmin: (...roles: UserRole[]) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const connectedToOwnOrganization =
        req.currentUser?.currentOrganizationId ===
        req.currentUser?.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.rolesInCurrentOrganization?.roles
        : req.currentUser?.roles;

      // Check if user has any of the provided roles
      if (
        roles.some(
          (role) =>
            userRoles?.includes(role) ||
            role === UserRole.All ||
            role === UserRole.Admin ||
            role === UserRole.SuperAdmin
        )
      ) {
        next();
      } else {
        throw new ForbiddenErr("Operation is not allowed for admins.");
      }
    }),

  /**
   * Middleware that allows access for users with UserRole.SuperAdmin or UserRole.All roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isSuperAdmin: (...roles: UserRole[]) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const connectedToOwnOrganization =
        req.currentUser?.currentOrganizationId ===
        req.currentUser?.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.rolesInCurrentOrganization?.roles
        : req.currentUser?.roles;

      // Check if user has any of the provided roles
      if (
        roles.some((role) => userRoles?.includes(role) || role === UserRole.All)
      ) {
        next();
      } else {
        throw new ForbiddenErr("Operation is not allowed for super admins.");
      }
    }),

  /**
   * Middleware that allows access for users with UserRole.Developer or UserRole.All roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isDeveloper: (...roles: UserRole[]) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const connectedToOwnOrganization =
        req.currentUser?.currentOrganizationId ===
        req.currentUser?.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.rolesInCurrentOrganization?.roles
        : req.currentUser?.roles;

      // Check if user has any of the provided roles
      if (
        roles.some(
          (role) =>
            userRoles?.includes(role) ||
            role === UserRole.All ||
            role === UserRole.Developer ||
            role === UserRole.SuperAdmin
        )
      ) {
        next();
      } else {
        throw new ForbiddenErr("Operation is not allowed for developers.");
      }
    }),

  /**
   * Middleware that allows access for users with UserRole.Robot.
   * Throws a ForbiddenErr if access is denied.
   */
  isRobot: (...roles: UserRole[]) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const connectedToOwnOrganization =
        req.currentUser?.currentOrganizationId ===
        req.currentUser?.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.rolesInCurrentOrganization?.roles
        : req.currentUser?.roles;

      // Check if user has any of the provided roles
      if (
        roles.some(
          (role) =>
            userRoles?.includes(role) ||
            role === UserRole.SuperAdmin ||
            role === UserRole.All
        )
      ) {
        next();
      } else {
        throw new ForbiddenErr("Operation is not allowed for robots.");
      }
    }),
};

export { RbaUserACL };
