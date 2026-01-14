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
  encryptAccessToken: (payload: any, expiresIn?: string | number): string => {
    return jwt.sign(payload, `${process.env.ACCESS_SECRET}`, {
      expiresIn: expiresIn ?? "1h",
    });
  },

  encryptRefreshToken: (payload: any, expiresIn?: string | number): string => {
    return jwt.sign(payload, `${process.env.REFRESH_SECRET}`, {
      expiresIn: expiresIn ?? "7d",
    });
  },

  // Enhanced decrypt - handles both JWT and API tokens
  decryptAccessToken: async (token: string): Promise<UserPayload> => {
    if (ApiTokenUtils.isValidFormat(token)) {
      if (!apiTokenValidator) {
        throw new Error("API token validator not configured");
      }
      return await apiTokenValidator(token);
    }
    return jwt.verify(token, `${process.env.ACCESS_SECRET}`) as UserPayload;
  },

  decryptRefreshToken: (token: string): any => {
    return jwt.verify(token, `${process.env.REFRESH_SECRET}`) as any;
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

  verifyRefreshToken: (token: string): boolean => {
    try {
      jwt.verify(token, `${process.env.REFRESH_SECRET}`);
      return true;
    } catch (error) {
      return false;
    }
  },
};
