import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { encryptor, UserPayload } from "../../utils/encryptor";
import { getCookie } from "../../utils/cookies";

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
    let token: string;

    // Default accessGrant to deny
    req.accessGrant = "deny";

    // Check if the access token is in the request header or if c_aToken is in the cookie
    if (
      (!req.headers.authorization ||
        !req.headers.authorization?.startsWith("Bearer")) &&
      !getCookie(req, "c_aToken")
    ) {
      // No access token found, continue to the next middleware or route handler
      return next();
    }

    // Get the access token
    token =
      req.headers.authorization?.split(" ")[1] || getCookie(req, "c_aToken");

    // Check if the access token is valid
    if (encryptor.verifyAccessToken(token)) {
      // Decode the access token
      payload = encryptor.decryptAccessToken(token);

      // Set the currentUser property of the request object
      req.currentUser = payload;

      // Set the accessGrant property of the request object
      if (payload) {
        req.accessGrant = "allow";
      }
    } else {
      // The access token is invalid, continue to the next middleware or route handler
      return next();
    }
    // Continue to the next middleware or route handler
    next();
  }
);
