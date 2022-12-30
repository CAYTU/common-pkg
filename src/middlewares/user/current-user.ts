import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  username: string;
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
    let payload;

    if (!req.headers.authorization && !req.session) {
      return next();
    }

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Split the headers then grap token at index 1
        let token = req.headers.authorization.split(" ")[1];
        // Validate the user token with the Secret key
        payload = jwt.verify(
          token,
          `${process.env.ACCESS_TOKEN_PRIVATE_KEY}`
        ) as UserPayload;
      } catch (err) {}
    } else if (req.session && req.session?.accessToken) {
      try {
        payload = jwt.verify(
          req.session.accessToken,
          `${process.env.ACCESS_TOKEN_PRIVATE_KEY}`
        ) as UserPayload;
      } catch (err) {}
    }

    // Save decoded payload in req.currentUser
    req.currentUser = payload;

    next();
  }
);
