export enum ConditionType {
  DEVICE_STATE = "device_state", // Device state condition
  COMPARISON = "comparison", // Value comparison condition
  THRESHOLD = "threshold", // Threshold comparison
  TIME_WINDOW = "time_window", // Time-based condition
}

export enum ComparisonOperator {
  EQUALS = "eq",
  NOT_EQUALS = "neq",
  GREATER_THAN = "gt",
  GREATER_THAN_EQUALS = "gte",
  LESS_THAN = "lt",
  LESS_THAN_EQUALS = "lte",
  CONTAINS = "contains",
  NOT_CONTAINS = "not_contains",
  IN = "in",
  NOT_IN = "not_in",
}

export interface BaseCondition {
  type: ConditionType;
  id: string;
}

interface ThresholdCondition extends BaseCondition {
  type: ConditionType.THRESHOLD;
  operator: ComparisonOperator;
  target: string;
}

export interface DeviceStateCondition extends BaseCondition {
  type: ConditionType.DEVICE_STATE;
  stateKey: string;
  operator: ComparisonOperator;
  value: any;
}

export interface ComparisonCondition extends BaseCondition {
  type: ConditionType.COMPARISON;
  field: string;
  operator: ComparisonOperator;
  value: any;
}

export interface TimeWindowCondition extends BaseCondition {
  type: ConditionType.TIME_WINDOW;
  startTime: string; // Time in HH:mm format
  endTime: string; // Time in HH:mm format
  daysOfWeek?: number[]; // 0-6, where 0 is Sunday
}

export type IRoutineCondition =
  | DeviceStateCondition
  | ComparisonCondition
  | ThresholdCondition
  | TimeWindowCondition;

export interface ConditionEvaluationResult {
  conditionId: string;
  satisfied: boolean;
  timestamp: Date;
  metadata?: Record<string, any>;
}
