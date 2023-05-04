export enum TaskStatus {
  // First state when a task is newly created. Waiting for a robot to be
  // assigned and an operator to pick up the task
  Pending = "pending",
  // Only accepted after a robot has been assigned and an operator has picked
  // this task
  Accepted = "accepted",
  // If supply need to be provided in the robot to operate task
  Processing = "processing",
  // When the operator is driving the robot in charge of executing the task
  Running = "running",
  // When the robot has reached the ending point or has finish the task duration
  Arrived = "arrived",
  // If task has been cancelled before reaching final goal
  Cancelled = "cancelled",
  // When the payment service failed to collect money for the task
  PaymentFailed = "payment:failed",
  // When task ha been refunded
  Refunded = "refunded",
  // Scheduled time for the task
  Scheduled = "scheduled",
  //
  Completed = "completed"
}

export enum TaskType {
  // If task is a delivery
  Delivery = "delivery",
  // If task is for cleaning
  Cleaning = "cleaning",
  // Inspection Task
  Inspection = "inspection",
  // Run a simulation
  Simulation = "simulation",
  // If task is none of the above (delivery, cleaning, ...)
  Custom = "custom"
}

export enum UserRole {
  // This is the most basic role that any user that creates an account
  // through the api will have.
  // Basic operations are allowed -> Read & Create Task
  Customer = "customer",
  // This role combine both the customer and the its own.
  Operator = "operator",
  // Not only it encapsules the 2 aboves
  Admin = "admin",

  // Primitive Roles | if missing, they can prevent user to do basic operation
  Delete = "delete",
  Create = "create",
  Update = "update",
  ReadOnly = "readOnly",
  All = "all"
}

export enum RobotStates {
  Unavailable = "unavailable",
  Running = "running",
  Failed = "failed",
  Available = "available"
}

export enum OperatorStatus {
  Pending = "Pending",
  Denied = "Denied",
  Approved = "Approved",
  Revoked = "Revoked"
}

export enum SimulationJobState {
  // TODO: add documentation here ...
  Pending = "pending",
  Running = "running",
  Terminated = "terminated",
  Completed = "completed"
}
