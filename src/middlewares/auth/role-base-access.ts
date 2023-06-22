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
      if (
        req.currentUser?.roles?.includes(UserRole.Create) ||
        req.currentUser?.roles?.includes(UserRole.All) ||
        req.currentUser?.roles?.includes(UserRole.Admin)
      ) {
        next();
      } else {
        throw new ForbiddenErr("Cannot create.");
      }
    }
  ),

  /**
   * Middleware that allows access for users with "edit", UserRole.All, or UserRole.Admin roles.
   * Throws a ForbiddenErr if access is denied.
   */
  canEdit: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        req.currentUser?.roles?.includes(UserRole.Update) ||
        req.currentUser?.roles?.includes(UserRole.All) ||
        req.currentUser?.roles?.includes(UserRole.Admin)
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
      if (
        req.currentUser?.roles?.includes(UserRole.Delete) ||
        req.currentUser?.roles?.includes(UserRole.All) ||
        req.currentUser?.roles?.includes(UserRole.Admin)
      ) {
        next();
      } else {
        throw new ForbiddenErr("Cannot delete.");
      }
    }
  ),

  /**
   * Middleware that allows read-only access for users with "readOnly", UserRole.All, or UserRole.Admin roles.
   * Throws a ForbiddenErr if access is denied.
   */
  canReadOnly: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        req.currentUser?.roles?.includes(UserRole.ReadOnly) ||
        req.currentUser?.roles?.includes(UserRole.All) ||
        req.currentUser?.roles?.includes(UserRole.Admin)
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
      if (
        req.currentUser?.roles?.includes(UserRole.Customer) ||
        req.currentUser?.roles?.includes(UserRole.Admin) ||
        req.currentUser?.roles?.includes(UserRole.All) ||
        req.currentUser?.roles?.includes(UserRole.Operator)
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
      if (
        req.currentUser?.roles?.includes(UserRole.Operator) ||
        req.currentUser?.roles?.includes(UserRole.Admin) ||
        req.currentUser?.roles?.includes(UserRole.All)
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
      if (
        req.currentUser?.roles?.includes(UserRole.Admin) ||
        req.currentUser?.roles?.includes(UserRole.All)
      ) {
        next();
      } else {
        throw new ForbiddenErr("Operation is not allowed for admins.");
      }
    }
  ),
};

export { RbaUserACL };
