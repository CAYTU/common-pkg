import { IMongooseObjectExt } from "../../types/utils/models";
import { RoutineState, RoutineType } from "../enums";
import { IRoutineAction } from "./routine-actions";
import { IRoutineCondition } from "./routine-condition";

// Main Routine Schema
export interface IDeviceRoutine extends IMongooseObjectExt {
  // Identification
  topic: string;

  name: string;
  description?: string;
  deviceId: string;
  type: RoutineType;
  state: RoutineState;
  priority: number;
  organizationId: string;

  // Scheduling
  schedule?: string; // Cron expression for scheduled routines
  startDate?: Date; // Optional start date
  endDate?: Date; // Optional end date
  timeoutMs?: number; // Timeout for routine execution

  // Trigger conditions
  conditions?: IRoutineCondition[];

  // Actions to perform
  actions: IRoutineAction[];

  // Execution tracking
  lastExecutionTime?: Date;
  nextExecutionTime?: Date;
  executionCount: number;
  maxExecutions?: number;

  // Error handling
  lastError?: string;
  errorCount: number;
  maxErrors?: number;

  // Metadata
  metadata: Record<string, any>;
  tags: string[];

  // Audit
  createdBy: string;
  updatedBy: string;
}
