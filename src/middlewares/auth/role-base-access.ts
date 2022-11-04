import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { NotAuthorizedErr } from "../../errors/not-authorized";

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
        throw new NotAuthorizedErr("Cannot create.");
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
        throw new NotAuthorizedErr("Cannot Edit.");
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
        throw new NotAuthorizedErr("Cannot Delete.");
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
        throw new NotAuthorizedErr("Not Authorized.");
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
        throw new NotAuthorizedErr("Not Authorized ...");
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
        throw new NotAuthorizedErr("Not Authorized as Operator.");
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
        throw new NotAuthorizedErr("Not Authorized as Admin.");
      }
    }
  ),
};

export { RbaUserACL };
