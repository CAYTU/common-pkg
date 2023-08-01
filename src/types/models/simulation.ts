import mongoose, { Types } from "mongoose";
import { SimulationJobState } from "../utils";

/**
 * Simulation:
 */

export interface SimulationCategoryInterface extends mongoose.Document {
  value: string;
  displayName: string;
}

export interface SimulationRegionInterface
  extends SimulationCategoryInterface {}

export interface SimulationJobQueueInterface
  extends SimulationCategoryInterface {}

export interface SimulationJobDefinitionInterface
  extends SimulationCategoryInterface {}

export interface SimulationRoleInterface extends SimulationCategoryInterface {}

export interface SimulationTemplateURLInterface
  extends SimulationCategoryInterface {}

export interface SimulationInterface extends mongoose.Document {
  name: string;
  image?: string;
  description?: string;
  jobDefinition: string;
  jobQueue: string;
  templateURL: string;
  role: string;
  region: string;
}

export interface SimulationJobInterface extends mongoose.Document {
  jobId: string;
  jobName: string;
  taskId?: string;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  region: string;
  endpoint: string;
  thing: string;
  simulation: Types.ObjectId;
  state?: SimulationJobState;
  subscribedTopics?: string[];
  operator?: Types.ObjectId;
  duration?: number;
}
