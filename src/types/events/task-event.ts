import { Types } from 'mongoose';
import { TaskType, TaskStatus } from '../utils';

/**
 * TaskEventInterface represents the event data emitted when a task is created or updated.
 */
export interface TaskEventInterface {
  id: string; // Unique identifier for the task event
  type: TaskType; // Type of the task (e.g., delivery, cleaning, inspection, etc.)
  fare: number; // Fare or cost associated with the task
  code?: number; // Optional code to deactivate or open the robot for the task
  taskId: string; // Count Id for the number of tasks with a padded number
  status: TaskStatus; // Current status of the task (e.g., assigned, running, completed, etc.)
  robot?: Types.ObjectId; // Reference to the Robot Model for task assignment
  operator?: Types.ObjectId; // Reference to the Operator Model for task assignment
  customer: Types.ObjectId; // Reference to the Customer Model for task assignment
  version: number; // Event version number (for event compatibility)
}

/**
 * TaskGetRobotCandidateEventInterface represents the event data emitted when a task is requesting
 * to get a suitable robot candidate for assignment.
 * This event is used to request available robots that can perform a specific task type.
 */
export interface TaskGetRobotCandidateEventInterface {
  id: string; // Unique identifier for the task event
  type: TaskType; // Type of the task (e.g., delivery, cleaning, inspection, etc.)
  taskId: string; // Count Id for the number of tasks with a padded number
  version: number; // Event version number (for event compatibility)
}

// Other related task events can be added here if needed.
