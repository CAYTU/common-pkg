import mongoose, { Types } from "mongoose";
import { SimulationJobState, TaskStatus, TaskType } from "../utils";

/**
 * Interface for defining the start and end points of an itinerary.
 */
export interface ItineraryType {
  start: mongoose.Schema.Types.Point & { coordinates: [number, number] };
  end: mongoose.Schema.Types.Point & { coordinates: [number, number] };
}

/**
 * Interface for defining the delivery task attributes.
 */
export interface TaskDeliveryInterface extends mongoose.Document {
  // Ref to a Product
  product?: Types.ObjectId;
  // Ref to a Vendor
  vendor?: Types.ObjectId;
  // Delivery Attrs
  itinerary: ItineraryType;
}

/**
 * Interface for defining the cleaning task attributes.
 */
export interface TaskCleaningInterface extends mongoose.Document {
  // Cleaning Attrs
  cleaningOf?: string;
  description?: string;
  area: mongoose.Schema.Types.Polygon;
}

/**
 * Interface for defining the inspection task attributes.
 */
export interface TaskInspectionInterface extends mongoose.Document {
  name?: string;
  description?: string;
  // Inspection Attrs
  itinerary: ItineraryType;
}

/**
 * Interface for defining the simulation task attributes.
 */
export interface TaskSimulationInterface extends mongoose.Document {
  jobId?: string;
  jobName?: string;
  state?: SimulationJobState;
  simulationId?: string;
  thing?: string;
}

/**
 * Interface for defining custom task attributes.
 */
export interface TaskCustomInterface extends mongoose.Document {}

/**
 * Interface for tracking the status of a task at different stages.
 */
export interface TaskStatusTracker extends mongoose.Document {
  acceptedAt?: Date;
  runningAt?: Date;
  arrivedAt?: Date;
  processingAt?: Date;
  cancelledAt?: Date;
  paymentFailedAt?: Date;
  refundedAt?: Date;
  completedAt?: Date;
}

/**
 * Interface for defining a task.
 */
export interface TaskInterface extends mongoose.Document {
  type: TaskType;
  fare?: number;
  // Code to deactivate or open the robot
  code?: number;
  // Count Id for the number of tasks with a padded number
  taskId: string;
  // Ref to Operator Model
  operator?: Types.ObjectId;
  // Ref to Customer Model
  customer?: Types.ObjectId;
  // Ref to Robot Model
  robot?: Types.ObjectId;
  status?: TaskStatus;
  statusTracker?: Types.ObjectId;
  duration?: number;
  // Number of assignment trials for a robot
  // This is only needed for a robot as the
  // process is automated
  // For an operator, the assignment is done
  // by the operator
  robotAssignmentTrial?: number;

  delivery?: Types.ObjectId;
  cleaning?: Types.ObjectId;
  simulationJob?: Types.ObjectId;
  inspection?: Types.ObjectId;
  custom?: Types.ObjectId;
}
