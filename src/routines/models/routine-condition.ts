export interface IRoutineCondition {
  dataField: string; // The data to check - This data is directly provided using the topic
  operator: string; // eq, ne, gt, lt, etc.
  value: any; // Value to compare against
  topic?: string; // MQTT topic to listen to (for event-triggered)
}
