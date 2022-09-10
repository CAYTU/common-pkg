import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { NotAuthorizedErr } from "../../errors/not-authorized";

// ...
export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      throw new NotAuthorizedErr();
    }
  }
);
