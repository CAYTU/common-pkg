import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { NotAuthorizedErr } from "../../errors/not-authorized";

/**
 * Middleware to authorize the robot based on the token
 */
export const authorizeRobot = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.robot) {
      throw new NotAuthorizedErr("Robot not authorized");
    }
    next();
  },
);
