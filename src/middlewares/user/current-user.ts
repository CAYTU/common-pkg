import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
  roles: string[];
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
      return next();
    }

    try {
      const payload = jwt.verify(
        req.session?.jwt,
        `${process.env.JWT_SECRET}`
      ) as UserPayload;

      req.currentUser = payload;

    } catch (err) {}

    next();
  }
);
