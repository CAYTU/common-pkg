import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { NotAuthorizedErr } from "../../errors/not-authorized";

// ...
export const authorize = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      throw new NotAuthorizedErr();
    }
  }
);
