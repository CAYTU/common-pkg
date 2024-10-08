// We'll build a custom encryptor with jsonwebtoken that will be used to
// encrypt and decrypt data.
// However, to shorten the token length, we'll create a function using

import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../../types/utils";
import { TaskType } from "../../tasks/enums";

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

export const encryptor = {
  // This function will be used to encrypt an ACCESS_TOKEN
  // It will take a user object and return a token
  encryptAccessToken: (paylaod: any, expiresIn?: string | number): string => {
    return jwt.sign(paylaod, `${process.env.ACCESS_SECRET}`, {
      expiresIn: expiresIn ?? "1h",
    });
  },

  // This function will be used to encrypt a REFRESH_TOKEN
  // It will take a user object and return a token
  encryptRefreshToken: (paylaod: any, expiresIn?: string | number): string => {
    return jwt.sign(paylaod, `${process.env.REFRESH_SECRET}`, {
      expiresIn: expiresIn ?? "7d",
    });
  },

  // This function will be used to decrypt an ACCESS_TOKEN
  // It will take a token and return a user object
  decryptAccessToken: (token: string): any => {
    return jwt.verify(token, `${process.env.ACCESS_SECRET}`) as any;
  },

  // This function will be used to decrypt a REFRESH_TOKEN
  // It will take a token and return a user object
  decryptRefreshToken: (token: string): any => {
    return jwt.verify(token, `${process.env.REFRESH_SECRET}`) as any;
  },

  // This function will be used to verify an ACCESS_TOKEN and return a boolean
  verifyAccessToken: (token: string): boolean => {
    try {
      jwt.verify(token, `${process.env.ACCESS_SECRET}`);
      return true;
    } catch (error) {
      return false;
    }
  },

  // This function will be used to verify a REFRESH_TOKEN and return a boolean
  verifyRefreshToken: (token: string): boolean => {
    try {
      jwt.verify(token, `${process.env.REFRESH_SECRET}`);
      return true;
    } catch (error) {
      return false;
    }
  },
};
