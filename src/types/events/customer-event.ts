import { Types } from "mongoose";

/**
 * Customer:
 */

export interface CustomerEventInterface {
  id: string;
  user: Types.ObjectId;
  version: number;
}
