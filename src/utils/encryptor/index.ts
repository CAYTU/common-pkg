import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../../users/utils/user-roles";
import { TaskType } from "../../tasks/enums/task-types";
import { ApiTokenUtils } from "../api-token-utils";

export interface UserPayload extends JwtPayload {
  id: string;
  username: string;
  roles?: UserRole[];
  allowedTaskTypes?: TaskType[] | string[];
  currentOrganizationId?: string;
  ownedOrganizationId?: string;
  rolesInCurrentOrganization?: {
    organizationId: string;
    roles: UserRole[];
    allowedTaskTypes?: TaskType[] | string[];
  };
  isVerified?: boolean;
  isCompleted?: boolean;
}

// API token validator callback
export type ApiTokenValidator = (token: string) => Promise<UserPayload>;

let apiTokenValidator: ApiTokenValidator | null = null;

export const encryptor = {
  // Set API token validator
  setApiTokenValidator: (validator: ApiTokenValidator) => {
    apiTokenValidator = validator;
  },

  // JWT token methods
  encryptAccessToken: (payload: any, expiresIn?: number): string => {
    const secret = process.env.ACCESS_SECRET as string;
    if (expiresIn !== undefined) {
      return jwt.sign(payload, secret, { expiresIn });
    }
    return jwt.sign(payload, secret, { expiresIn: "1h" });
  },

  encryptRefreshToken: (payload: any, expiresIn?: number): string => {
    const secret = process.env.REFRESH_SECRET as string;
    if (expiresIn !== undefined) {
      return jwt.sign(payload, secret, { expiresIn });
    }
    return jwt.sign(payload, secret, { expiresIn: "7d" });
  },

  // Enhanced decrypt - handles both JWT and API tokens
  decryptAccessToken: async (token: string): Promise<UserPayload> => {
    if (ApiTokenUtils.isValidFormat(token)) {
      if (!apiTokenValidator) {
        throw new Error("API token validator not configured");
      }
      return await apiTokenValidator(token);
    }
    // jsonwebtoken 9.x: verify returns synchronously when no callback is provided
    // but we keep it consistent with async pattern
    const secret = process.env.ACCESS_SECRET as string;
    return jwt.verify(token, secret) as UserPayload;
  },

  decryptRefreshToken: async (token: string): Promise<any> => {
    // jsonwebtoken 9.x: verify returns synchronously when no callback is provided
    const secret = process.env.REFRESH_SECRET as string;
    return jwt.verify(token, secret) as any;
  },

  // Enhanced verify - handles both JWT and API tokens
  verifyAccessToken: async (token: string): Promise<boolean> => {
    try {
      await encryptor.decryptAccessToken(token);
      return true;
    } catch (error) {
      return false;
    }
  },

  verifyRefreshToken: async (token: string): Promise<boolean> => {
    try {
      await encryptor.decryptRefreshToken(token);
      return true;
    } catch (error) {
      return false;
    }
  },
};
