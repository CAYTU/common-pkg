import { Types } from "mongoose";

/**
 * Represents a rating given by a user.
 */
export interface Rating {
  user: Types.ObjectId;
  rating: number;
  comment?: string;
}

/**
 * Represents the types of identity documents.
 *
 * @typedef {("nationalId" | "passport" | "driverLicense")} IdentityType
 *
 * @property {"nationalId"} nationalId - Represents a national identification document.
 * @property {"passport"} passport - Represents a passport document.
 * @property {"driverLicense"} driverLicense - Represents a driver's license document.
 */
export type IdentityType = "nationalId" | "passport" | "driverLicense";
