import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { ForbiddenErr } from "../../errors/forbidden";

// Role Based Access: User ACL
const RbaUserACL = {
  canCreate: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        req.currentUser?.roles.includes("create") ||
        req.currentUser?.roles.includes("all") ||
        req.currentUser?.roles.includes("admin")
      ) {
        next();
      } else {
        throw new ForbiddenErr("Cannot create.");
      }
    }
  ),

  canEdit: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        req.currentUser?.roles.includes("edit") ||
        req.currentUser?.roles.includes("all") ||
        req.currentUser?.roles.includes("admin")
      ) {
        next();
      } else {
        throw new ForbiddenErr("Cannot Edit.");
      }
    }
  ),

  canDelete: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        req.currentUser?.roles.includes("delete") ||
        req.currentUser?.roles.includes("all") ||
        req.currentUser?.roles.includes("admin")
      ) {
        next();
      } else {
        throw new ForbiddenErr("Cannot Delete.");
      }
    }
  ),

  canReadOnly: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        req.currentUser?.roles.includes("readOnly") ||
        req.currentUser?.roles.includes("all") ||
        req.currentUser?.roles.includes("admin")
      ) {
        next();
      } else {
        throw new ForbiddenErr("Cannot read content.");
      }
    }
  ),

  isCustomer: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        req.currentUser?.roles.includes("customer") ||
        req.currentUser?.roles.includes("admin") ||
        req.currentUser?.roles.includes("all") ||
        req.currentUser?.roles.includes("operator")
      ) {
        next();
      } else {
        throw new ForbiddenErr("Operation is not allowed for customer.");
      }
    }
  ),

  isOperator: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        req.currentUser?.roles.includes("operator") ||
        req.currentUser?.roles.includes("admin") ||
        req.currentUser?.roles.includes("all")
      ) {
        next();
      } else {
        throw new ForbiddenErr("Operation is not allowed for operator.");
      }
    }
  ),

  isAdmin: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        req.currentUser?.roles.includes("all") ||
        req.currentUser?.roles.includes("admin")
      ) {
        next();
      } else {
        throw new ForbiddenErr("Operation is not allowed for admin.");
      }
    }
  ),
};

export { RbaUserACL };
