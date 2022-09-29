import { Types } from "mongoose";

export type IDType = "id" | "passport";

export interface OperatorInterface {
  user?: Types.ObjectId;
  identityType: IDType;
  identityNumber: number;
  fcmToken: string;
  active: boolean;
  orderCount: number;
  earnings: number;
  aboutMe: string;
  zone?: Types.ObjectId;
};
