import { Types } from "mongoose";

export interface RobotInterface {
  robotId: string;
  name: string;
  accountId?: string;
  type: string;
  image: string;
  token?: string;
  status: string;
  orderCount: number;
  assignedOrderCount?: number;
  vendor?: Types.ObjectId;
  zone?: Types.ObjectId;
  currentOrder?: number;
}
