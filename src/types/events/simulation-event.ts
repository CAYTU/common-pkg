import mongoose, { Types } from "mongoose";
import { SimulationJobState } from "../utils";

/**
 * SimulationInterface represents the event data emitted when a simulation is created or updated.
 * This interface is used to replicate the simulation data to other services.
 */

export interface SimulationEventInterface extends mongoose.Document {
  id: string;
  name: string;
  image?: string;
  description?: string;
  jobDefinition: string;
  jobQueue: string;
  templateURL: string;
  role: string;
  region: string;
  version: number;
}

export interface SimulationJobEventInterface extends mongoose.Document {
  id: string;
  jobId: string;
  taskId?: string;
  jobName: string;
  simulationId: string;
  endpoint: string;
  thing: string;
  state?: SimulationJobState;
  operator?: Types.ObjectId;
  version: number;
}
