import { Types } from "mongoose";
import { IMongooseObjectExt } from "../../types/utils/models";
import { TaskType } from "../enums/task-types";
import { TaskStatus } from "../enums";

/**
 * Interface representing a Task.
 */
export interface TaskInterface extends IMongooseObjectExt {
  /**
   * Type of the task.
   */
  type: TaskType;

  /**
   * Code to deactivate or open the robot.
   */
  code?: number;

  /**
   * Reference to an Operator model.
   */
  operator?: Types.ObjectId;

  /**
   * Reference to the user who created the task.
   */
  owner?: Types.ObjectId;

  /**
   * Reference to a Robot model.
   */
  robot?: Types.ObjectId;

  /**
   * Status of the task.
   */
  status?: TaskStatus;

  /**
   * The date when the task was started and finished.
   *
   * Started date is the date when the task was run.
   * Finished date is the date when the task was completed or failed.
   */
  startedAt?: Date;
  finishedAt?: Date;
  /** Duration of the task */
  duration?: number;

  /**
   * Number of assignment trial for a device.
   */
  deviceAssignmentTrial?: number;

  /**
   * Reference to a Delivery task.
   */
  delivery?: Types.ObjectId;

  /**
   * Reference to a Cleaning task.
   */
  cleaning?: Types.ObjectId;

  /**
   * Reference to a Simulation for the selected job.
   */
  simulationId?: Types.ObjectId;

  /**
   * Reference to an avatar
   */
  avatarId?: string;

  /**
   * Reference to the avatar instance
   */
  avatarInstanceId?: Types.ObjectId;

  /**
   * Reference to a Simulation job task.
   */
  simulationJob?: Types.ObjectId;

  /**
   * The organization where the task belong.
   */
  organizationId?: Types.ObjectId;

  /**
   * Indicates whether the task is public.
   */
  public?: boolean;

  /**
   * The organizations with which the task is shared.
   */
  sharedWith?: Types.ObjectId[];

  /**
   * Reference to an Inspection task.
   */
  inspection?: Types.ObjectId;

  /**
   * Reference to a Flight task.
   */
  flight?: Types.ObjectId;

  /**
   * Reference to a Telepresence task.
   */
  telepresence?: Types.ObjectId;

  /**
   * Reference to the connect task type
   */
  connectTask?: Types.ObjectId;

  /**
   * A string to store the reason for the task failure
   * or any other information related to the task.
   */
  reason?: string;

  /**
   * Any additional data related to the task.
   */
  payload?: any;
}
