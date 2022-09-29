import { Types } from mongoose;
import { CoordinateType } from "./common-type";

export type TaskStatusType = "pending" | "running" | "completed" | "failed";
export type ExecutionDomainType = "area" | "itinerary" | "points";
export type TaskType = "delivery" | "non-delivery";


type ItineraryType = {
  start: CoordinateType;
  end: CoordinateType;
};

export interface TaskInterface {
  name: string;
  type: TaskType;
  fare: number;
  //   Ref to product Model
  product?: Types.ObjectId;
  //   Ref to Operator Model
  operator?: Types.ObjectId;
  //   Ref to User Model
  vendor?: Types.ObjectId;
  //   Ref to Customer Model
  customer?: Types.ObjectId;
  //   Ref to Robot Model
  robot?: Types.ObjectId;
  execDomain: ExecutionDomainType;
  itinerary?: ItineraryType;
  zone?: Types.ObjectId;
  points?: CoordinateType[];
  status: TaskStatusType;
  description?: string;
}
