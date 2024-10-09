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

  // Helper function to check platform and organization level roles
  hasRequiredRole: (user: any, roles: UserRole[]) => {
    const platformRoles = user?.roles || [];
    const orgRoles = user?.rolesInCurrentOrganization?.roles || [];
    return roles.some(
      (role) => platformRoles.includes(role) || orgRoles.includes(role),
    );
  },
  canCreate: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        RbaUserACL.hasRequiredRole(req.currentUser, [
          UserRole.Create,
          UserRole.All,
          UserRole.SuperAdmin,
        ])
      ) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),

  /**
   * Middleware that allows access for users with UserRole.Update, UserRole.All, or UserRole.Admin roles.
   * Throws a ForbiddenErr if access is denied.
   */
  canEdit: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        RbaUserACL.hasRequiredRole(req.currentUser, [
          UserRole.All,
          UserRole.Update,
          UserRole.SuperAdmin,
        ])
      ) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),

  /**
   * Middleware that allows access for users with UserRole.Delete, UserRole.All, or UserRole.Admin roles.
   * Throws a ForbiddenErr if access is denied.
   */
  canDelete: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        RbaUserACL.hasRequiredRole(req.currentUser, [
          UserRole.All,
          UserRole.Delete,
          UserRole.SuperAdmin,
        ])
      ) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),

  /**
   * Middleware that allows read-only access for users with UserRole.ReadOnly, UserRole.All, or UserRole.Admin roles.
   * Throws a ForbiddenErr if access is denied.
   */
  canReadOnly: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        RbaUserACL.hasRequiredRole(req.currentUser, [
          UserRole.ReadOnly,
          UserRole.All,
          UserRole.Admin,
          UserRole.Customer,
          UserRole.Operator,
          UserRole.Developer,
          UserRole.Robot,
          UserRole.Invited,
          UserRole.SuperAdmin,
        ])
      ) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),

  /**
   * Middleware that allows access for users with UserRole.Customer, UserRole.Admin, UserRole.All, or UserRole.Operator roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isCustomer: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        RbaUserACL.hasRequiredRole(req.currentUser, [
          UserRole.Customer,
          UserRole.Admin,
          UserRole.Operator,
          UserRole.Developer,
          UserRole.SuperAdmin,
        ])
      ) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),

  /**
   * Middleware that allows access for users with UserRole.Operator, UserRole.Admin, or UserRole.All roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isOperator: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        RbaUserACL.hasRequiredRole(req.currentUser, [
          UserRole.Admin,
          UserRole.Operator,
          UserRole.SuperAdmin,
        ])
      ) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),

  /**
   * Middleware that allows access for users with UserRole.Admin or UserRole.All roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isAdmin: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        RbaUserACL.hasRequiredRole(req.currentUser, [
          UserRole.Admin,
          UserRole.SuperAdmin,
        ])
      ) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),

  /**
   * Middleware that allows access for users with UserRole.SuperAdmin or UserRole.All roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isSuperAdmin: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (RbaUserACL.hasRequiredRole(req.currentUser, [UserRole.SuperAdmin])) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),

  /**
   * Middleware that allows access for users with UserRole.Developer or UserRole.All roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isDeveloper: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        RbaUserACL.hasRequiredRole(req.currentUser, [
          UserRole.Developer,
          UserRole.SuperAdmin,
        ])
      ) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),

  /**
   * Middleware that allows access for users with UserRole.Robot.
   * Throws a ForbiddenErr if access is denied.
   */
  isRobot: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        RbaUserACL.hasRequiredRole(req.currentUser, [
          UserRole.Robot,
          UserRole.SuperAdmin,
        ])
      ) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),
};

export { RbaUserACL };
