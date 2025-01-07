// Enums for routine types and states
export enum RoutineType {
  SCHEDULED = "scheduled", // Runs on a schedule (cron)
  CONDITION = "condition", // Runs when conditions are met
  IMMEDIATE = "immediate", // Runs immediately when created
}

export enum RoutineState {
  ACTIVE = "active",
  PAUSED = "paused",
  COMPLETED = "completed",
  FAILED = "failed",
  DRAFT = "draft",
  CANCELLED = "cancelled",
}

export enum ActionType {
  PUBLISH_MQTT = "publish_mqtt",
  NOTIFY = "notify",
  WEBHOOK = "webhook",
  API_ENDPOINT = "api_endpoint",
}
