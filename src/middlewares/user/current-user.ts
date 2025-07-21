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
 * Authentication middleware that supports both JWT and API tokens.
 * Extracts token from Authorization header or cookie, validates it,
 * and sets user context in the request.
 */
export const currentUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    req.accessGrant = "deny";

    const token = extractToken(req);
    if (!token) {
      throw new NotAuthorizedErr("Access denied. Please log in.");
    }

    try {
      if (await encryptor.verifyAccessToken(token)) {
        const payload = await encryptor.decryptAccessToken(token);
        req.currentUser = payload;
        req.accessGrant = payload ? "allow" : "deny";
      }

      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      throw new NotAuthorizedErr("Invalid or expired token.");
    }
  },
);

/**
 * Extract token from cookie (priority) or Authorization header
 */
function extractToken(req: Request): string | undefined {
  const cookieToken = getCookie(req, "c_aToken");
  if (cookieToken) return cookieToken;

  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return undefined;
}
