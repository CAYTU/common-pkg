import { Types } from "mongoose";
import { IMongooseObjectExt } from "../../types/utils/models";
import { TaskType } from "../enums/task-types";
import { TaskStatus } from "../enums";

/**
 * Represents a Task entity within the system.
 * 
 * A Task is a job or action performed by an operator, robot, or simulation. 
 * This interface defines the structure of the Task document in MongoDB, 
 * including relationships to other models and various task properties.
 */
export interface TaskInterface extends IMongooseObjectExt {
  
  /**
   * Type of the task.
   * 
   * Example: 'delivery', 'cleaning', 'telepresence', etc.
   */
  type: TaskType;

  /**
   * Code used to deactivate or open the robot.
   * 
   * Optional field that stores the code needed to operate the robot in certain tasks.
   */
  code?: number;

  /**
   * Flag to indicate if the task requires an operator.
   */
  requestOperator?: boolean;

  /**
   * Flag to indicate if the task requires a specific device.
   */
  requestDevice?: boolean;

  /**
   * Reference to an Operator model (if applicable).
   * 
   * The operator handling the task, identified by their ObjectId.
   */
  operator?: Types.ObjectId;

  /**
   * Reference to the user who created the task.
   * 
   * Represents the owner of the task.
   */
  owner?: Types.ObjectId;

  /**
   * Reference to a Robot model (if applicable).
   * 
   * The robot assigned to execute the task.
   */
  robot?: Types.ObjectId;

  /**
   * Status of the task.
   * 
   * Can represent states like 'pending', 'in-progress', 'completed', 'failed', etc.
   */
  status?: TaskStatus;

  /**
   * Date when the task was started.
   * 
   * This is the timestamp for when the task execution began.
   */
  startedAt?: Date;

  /**
   * Date when the task was finished.
   * 
   * This is the timestamp for when the task was either completed or failed.
   */
  finishedAt?: Date;

  /**
   * Total duration of the task in milliseconds.
   * 
   * Duration between `startedAt` and `finishedAt`.
   */
  duration?: number;

  /**
   * Reference to a Delivery task (if applicable).
   * 
   * Links to the specific Delivery task related to this Task entity.
   */
  delivery?: Types.ObjectId;

  /**
   * Reference to a Cleaning task (if applicable).
   * 
   * Links to the specific Cleaning task related to this Task entity.
   */
  cleaning?: Types.ObjectId;

  /**
   * Reference to a Simulation entity associated with this task.
   */
  simulationId?: Types.ObjectId;

  /**
   * Reference to an Avatar entity related to this task.
   */
  avatarId?: string;

  /**
   * Reference to a specific instance of an Avatar.
   */
  avatarInstanceId?: Types.ObjectId;

  /**
   * Reference to a Simulation job task.
   * 
   * Used if this task involves a simulation job.
   */
  simulationJob?: Types.ObjectId;

  /**
   * Organization where the task belongs.
   * 
   * Indicates the organization that owns or initiated this task.
   */
  organizationId?: Types.ObjectId;

  /**
   * Indicates whether the task is public.
   * 
   * Public tasks can be seen or interacted with by other users.
   */
  public?: boolean;

  /**
   * List of organizations that this task is shared with.
   * 
   * Contains ObjectIds of organizations that have access to this task.
   */
  sharedWith?: Types.ObjectId[];

  /**
   * Reference to an Inspection task (if applicable).
   */
  inspection?: Types.ObjectId;

  /**
   * Reference to a Flight task (if applicable).
   */
  flight?: Types.ObjectId;

  /**
   * Reference to a Telepresence task (if applicable).
   */
  telepresence?: Types.ObjectId;

  /**
   * Reference to a Connect task (if applicable).
   * 
   * Used to link to a task where a device is connected.
   */
  connectTask?: Types.ObjectId;

  /**
   * A detailed reason for task failure or additional context related to the task.
   * 
   * Can be a string or a structured object with further information.
   */
  reason?: string | Record<string, any>;

  /**
   * Any additional data or metadata related to the task.
   * 
   * This can store dynamic task-specific data.
   */
  payload?: any;
}
