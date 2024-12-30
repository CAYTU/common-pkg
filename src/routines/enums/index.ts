// Enums for routine types and states
export enum RoutineType {
  SCHEDULED = "scheduled", // Runs on a schedule (cron)
  EVENT_TRIGGERED = "event", // Triggered by MQTT events
  CONDITION = "condition", // Runs when conditions are met
  IMMEDIATE = "immediate", // Runs immediately when created
}

export enum RoutineState {
  ACTIVE = "active",
  PAUSED = "paused",
  COMPLETED = "completed",
  FAILED = "failed",
  DRAFT = "draft",
}

export enum ActionType {
  PUBLISH_MQTT = "publish_mqtt",
  NOTIFY = "notify",
  WEBHOOK = "webhook",
  API_ENDPOINT = "api_endpoint",
  CHAIN_ACTIONS = "chain_actions",
}
