import mongoose, { Types } from "mongoose";
import { TaskStatus, TaskType } from "../utils";

/**
 * TaskRepInterface represents the event data emitted when a task is created or updated.
 * This interface is used to replicate the task data to other services.
 */

export interface TaskRepInterface extends mongoose.Document {
  id: string;
  type: TaskType;
  fare: number;
  code?: number;
  // Count Id for number of tasks with padded number
  taskId: string;
  status: TaskStatus;
  //   Ref to Robot Model
  robot?: Types.ObjectId;
  //   Ref to Operator Model
  operator?: Types.ObjectId;

  customer: Types.ObjectId;
}
