import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { BadRequestErr } from "../../errors/bad-request";

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
        throw new BadRequestErr("Cannot create.");
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
        throw new BadRequestErr("Cannot Edit.");
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
        throw new BadRequestErr("Cannot Delete.");
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
        throw new BadRequestErr("Not Authorized.");
      }
    }
  ),

  isCustomer: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.currentUser?.roles.includes("customer")) {
        next();
      } else {
        throw new BadRequestErr("Not Authorized as Customer.");
      }
    }
  ),

  isOperator: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.currentUser?.roles.includes("operator")) {
        next();
      } else {
        throw new BadRequestErr("Not Authorized as Operator.");
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
        throw new BadRequestErr("Not Authorized as Admin.");
      }
    }
  ),
};

export { RbaUserACL };
