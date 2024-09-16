/**
 * Enumerates the possible status values for a task.
 */
export enum TaskStatus {
  /** First state when a task is newly created. */
  Init = "init",
  /** When a task is created, it is in pending state. */
  Pending = "pending",
  /** When a robot has been assigned to the task. */
  RobotAssigned = "robot:assigned",
  /** Only accepted after an operator has picked up the task. */
  OperatorAssigned = "operator:assigned",
  /** When the operator has accepted the task. */
  Accepted = "accepted",
  /** When the operator has rejected the task. */
  Rejected = "rejected",
  /** When the operator has started the task. */
  Started = "started",
  /** When the operator is driving the robot in charge of executing the task. */
  Running = "running",

  /** When the task is in simulation mode. */
  SimulationRunning = "simulation:running",
  SimulationCompleted = "simulation:completed",
  SimulationFailed = "simulation:failed",
  SimulationTerminated = "simulation:terminated",
  SimulationTerminating = "simulation:terminating",
  SimulationCanceled = "simulation:canceled",

  /** If the task has been canceled before reaching the final goal. */
  Cancelled = "cancelled",
  /** When the task has been completed. */
  Completed = "completed",
  /** When the task has been deleted. */
  Deleted = "deleted",

  Failed = "failed",
  Terminated = "terminated",
  Stopped = "stopped",
}
