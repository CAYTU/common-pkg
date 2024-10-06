/**
 * Enumerates the possible status values for a task, representing
 * the various stages a task can go through during its lifecycle.
 */
export enum TaskStatus {
  /**
   * The initial state when a task is newly created but not yet started.
   */
  Init = "init",

  /**
   * The state when a task has been created but is waiting for further processing
   * (e.g., assignment or execution).
   */
  Pending = "pending",

  /**
   * The state when a robot has been assigned to the task, indicating
   * the task is ready for execution by the robot.
   */
  RobotAssigned = "robot:assigned",

  /**
   * The state when an operator has been assigned to the task, indicating
   * that human intervention or oversight is involved.
   */
  OperatorAssigned = "operator:assigned",

  /**
   * The state when the operator has accepted the task, acknowledging that
   * they will proceed with the task's execution.
   */
  Accepted = "accepted",

  /**
   * The state when the operator has rejected the task, indicating they will
   * not proceed with it.
   */
  Rejected = "rejected",

  /**
   * The state when the operator has officially started the task.
   */
  Started = "started",

  /**
   * The state when the operator is actively driving or controlling the robot
   * that is executing the task.
   */
  Running = "running",

  /**
   * The state when the task is running in simulation mode, meaning it's being
   * tested or executed in a virtual environment rather than with real hardware.
   */
  SimulationRunning = "simulation:running",

  /**
   * The state when the task's simulation has successfully completed.
   */
  SimulationCompleted = "simulation:completed",

  /**
   * The state when the task's simulation has failed to complete successfully
   * due to an error or other issue.
   */
  SimulationFailed = "simulation:failed",

  /**
   * The state when the task's simulation is in the process of being terminated
   * (i.e., stopping before reaching a conclusion).
   */
  SimulationTerminating = "simulation:terminating",

  /**
   * The state when the task's simulation has been terminated.
   */
  SimulationTerminated = "simulation:terminated",

  /**
   * The state when the task's simulation has been canceled before it could
   * complete or reach a final result.
   */
  SimulationCanceled = "simulation:canceled",

  /**
   * The state when the task has been canceled before reaching its final goal,
   * meaning it will not continue or complete.
   */
  Cancelled = "cancelled",

  /**
   * The state when the task has been successfully completed, meaning it reached
   * its final goal.
   */
  Completed = "completed",

  /**
   * The state when the task has been deleted, meaning it has been removed from
   * the system.
   */
  Deleted = "deleted",

  /**
   * The state when the task has failed, meaning it encountered an error or
   * problem that prevented successful completion.
   */
  Failed = "failed",

  /**
   * The state when the task has been terminated, meaning it was forcibly stopped
   * before reaching its final goal.
   */
  Terminated = "terminated",

  /**
   * The state when the task has been stopped, typically before it could be completed.
   */
  Stopped = "stopped",
}
