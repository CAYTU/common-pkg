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
  canCreate: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      if (
        userRoles?.some((role) =>
          [
            UserRole.Create,
            UserRole.All,
            UserRole.Admin,
            UserRole.SuperAdmin,
          ].includes(role)
        )
      ) {
        next();
      } else {
        throw new ForbiddenErr("Cannot create.");
      }
    }
  ),

  /**
   * Middleware that allows access for users with UserRole.Update, UserRole.All, or UserRole.Admin roles.
   * Throws a ForbiddenErr if access is denied.
   */
  canEdit: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      if (
        userRoles?.some((role) =>
          [
            UserRole.Update,
            UserRole.All,
            UserRole.Admin,
            UserRole.SuperAdmin,
          ].includes(role)
        )
      ) {
        next();
      } else {
        throw new ForbiddenErr("Cannot edit.");
      }
    }
  ),

  /**
   * Middleware that allows access for users with UserRole.Delete, UserRole.All, or UserRole.Admin roles.
   * Throws a ForbiddenErr if access is denied.
   */
  canDelete: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      if (
        userRoles?.some((role) =>
          [
            UserRole.Delete,
            UserRole.All,
            UserRole.Admin,
            UserRole.SuperAdmin,
          ].includes(role)
        )
      ) {
        next();
      } else {
        throw new ForbiddenErr("Cannot delete.");
      }
    }
  ),

  /**
   * Middleware that allows read-only access for users with UserRole.ReadOnly, UserRole.All, or UserRole.Admin roles.
   * Throws a ForbiddenErr if access is denied.
   */
  canReadOnly: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      if (
        userRoles?.some((role) =>
          [
            UserRole.ReadOnly,
            UserRole.All,
            UserRole.Admin,
            UserRole.SuperAdmin,
          ].includes(role)
        )
      ) {
        next();
      } else {
        throw new ForbiddenErr("Cannot read content.");
      }
    }
  ),

  /**
   * Middleware that allows access for users with UserRole.Customer, UserRole.Admin, UserRole.All, or UserRole.Operator roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isCustomer: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      if (
        userRoles?.some((role) =>
          [
            UserRole.Customer,
            UserRole.Admin,
            UserRole.All,
            UserRole.Operator,
            UserRole.SuperAdmin,
          ].includes(role)
        )
      ) {
        next();
      } else {
        throw new ForbiddenErr("Operation is not allowed for customers.");
      }
    }
  ),

  /**
   * Middleware that allows access for users with UserRole.Operator, UserRole.Admin, or UserRole.All roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isOperator: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      if (
        userRoles?.some((role) =>
          [
            UserRole.Operator,
            UserRole.Admin,
            UserRole.All,
            UserRole.SuperAdmin,
          ].includes(role)
        )
      ) {
        next();
      } else {
        throw new ForbiddenErr("Operation is not allowed for operators.");
      }
    }
  ),

  /**
   * Middleware that allows access for users with UserRole.Admin or UserRole.All roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isAdmin: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      if (
        userRoles?.some((role) =>
          [UserRole.Admin, UserRole.All, UserRole.SuperAdmin].includes(role)
        )
      ) {
        next();
      } else {
        throw new ForbiddenErr("Operation is not allowed for admins.");
      }
    }
  ),

  /**
   * Middleware that allows access for users with UserRole.SuperAdmin or UserRole.All roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isSuperAdmin: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      if (
        userRoles?.some((role) =>
          [UserRole.SuperAdmin, UserRole.All].includes(role)
        )
      ) {
        next();
      } else {
        throw new ForbiddenErr("Operation is not allowed for super admins.");
      }
    }
  ),

  /**
   * Middleware that allows access for users with UserRole.Developer or UserRole.All roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isDeveloper: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      if (
        userRoles?.some((role) =>
          [UserRole.Developer, UserRole.All, UserRole.SuperAdmin].includes(role)
        )
      ) {
        next();
      } else {
        throw new ForbiddenErr("Operation is not allowed for developers.");
      }
    }
  ),

  /**
   * Middleware that allows access for users with UserRole.Robot.
   * Throws a ForbiddenErr if access is denied.
   */
  isRobot: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      if (
        userRoles?.some((role) => [UserRole.Robot, UserRole.All].includes(role))
      ) {
        next();
      } else {
        throw new ForbiddenErr("Operation is not allowed for robots.");
      }
    }
  ),
};

export { RbaUserACL };
