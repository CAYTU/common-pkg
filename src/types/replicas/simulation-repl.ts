import mongoose, { Types } from "mongoose";
import { SimulationJobState } from "../utils";

export interface SimulationRepInterface extends mongoose.Document {
  id: string;
  name: string;
  image?: string;
  description?: string;
  jobDefinition: string;
  jobQueue: string;
  templateURL: string;
  role: string;
  region: string;
}

export interface SimulationJobRepInterface extends mongoose.Document {
  id: string;
  jobId: string;
  taskId?: string;
  jobName: string;
  simulationId: string;
  endpoint: string;
  thing: string;
  state?: SimulationJobState;
  operator?: Types.ObjectId;
}