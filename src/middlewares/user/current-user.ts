import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { decryptToken, UserPayload } from "../../utils/encryptor";

export type AccessGrantType = "allow" | "deny" | "prompt";

declare global {
  namespace Express {
    interface Request {
      currentUser: UserPayload | undefined;
      accessGrant: AccessGrantType | undefined;
    }
  }
}

/**
 * Middleware that sets the current user and access grant status in the request object.
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The next function to invoke the next middleware or route handler.
 */
export const currentUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let payload: UserPayload | undefined;

    // Default accessGrant to deny
    req.accessGrant = "deny";

    // Check if the access token is in the request header or if c_aToken is in the cookie
    if (
      (!req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer")) &&
      !req.cookies.c_aToken
    ) {
      // No access token found, continue to the next middleware or route handler
      return next();
    }

    // Get the access token
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies.c_aToken;

    // Decrypt the token
    payload = decryptToken(token, process.env.ACCESS_SECRET as string);

    // Set the currentUser property of the request object
    req.currentUser = payload;

    // Set the accessGrant property of the request object
    if (payload) {
      req.accessGrant = "allow";
    }

    // Continue to the next middleware or route handler
    next();
  }
);
