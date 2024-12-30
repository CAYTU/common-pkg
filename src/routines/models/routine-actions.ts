import { ActionType } from "../enums";

export interface IRoutineAction {
  type: ActionType;
  parameters: {
    topic?: string; // For MQTT publishing
    payload?: any; // Message payload
    state?: string; // For state updates
    routineId?: string; // For chaining routines
    [key: string]: any; // Other custom parameters
  };
  retryConfig?: {
    maxAttempts: number;
    backoffType: "fixed" | "exponential";
    initialDelay: number;
  };
}
