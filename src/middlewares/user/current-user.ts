import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { encryptor, UserPayload } from "../../utils/encryptor";
import { getCookie } from "../../utils/cookies";
import { NotAuthorizedErr } from "../../errors/not-authorized";

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
 * Checks for authentication token in the following order:
 * 1. Authorization header (Bearer token)
 * 2. c_aToken cookie
 *
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The next function to invoke the next middleware or route handler.
 */
export const currentUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Default accessGrant to deny
    req.accessGrant = "deny";

    // Try to extract token from different sources
    const token = extractToken(req);

    // If no token is found, deny access
    if (!token) {
      throw new NotAuthorizedErr("Access denied. Please log in.");
    }

    try {
      // Verify the token
      if (encryptor.verifyAccessToken(token)) {
        // Decode the access token
        const payload = encryptor.decryptAccessToken(token);

        // Set the currentUser property of the request object
        req.currentUser = payload;

        // Set the accessGrant property of the request object
        if (payload) {
          req.accessGrant = "allow";
        }
      }

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      throw new NotAuthorizedErr("Invalid or expired token.");
    }
  },
);

/**
 * Extracts authentication token from request in the following priority:
 * 1. Authorization header (Bearer token)
 * 2. c_aToken cookie
 *
 * @param req The Express request object
 * @returns The token if found, undefined otherwise
 */
function extractToken(req: Request): string | undefined {
  // Check for Bearer token in Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  // If no Bearer token, check for token in cookies
  const cookieToken = getCookie(req, "c_aToken");
  if (cookieToken) {
    return cookieToken;
  }

  // No token found
  return undefined;
}
