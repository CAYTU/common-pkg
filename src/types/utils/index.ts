// Common
export type Point = {
  type?: string;
  coordinates: [number, number];
};

export type GeoJSONType = {
  type?: string;
  coordinates: [[[number, number]]];
};

export enum TaskStatus {
  // First state when a task is newly created.
  Init = "init",
  // When a task is created, it is in pending state
  Pending = "pending",
  // When a robot has been assigned to the task
  RobotAssigned = "robot:assigned",
  // Only accepted after an operator has picked up the task
  OperatorAssigned = "operator:assigned",
  // When the operator has accepted the task
  Accepted = "accepted",
  // When the operator has rejected the task
  Rejected = "rejected",
  // When the operator has started the task
  Started = "started",
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
  // When the task has been completed
  Completed = "completed",
  // When problem has been detected
  Failure = "failure",
  // When the task has been deleted
  Deleted = "deleted",
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
  Custom = "custom",
}

export enum UserRole {
  // This is the most basic role that any user that creates an account
  // through the api will have.
  // This role is for the robot
  Robot = "robot",
  // Basic operations are allowed -> Read & Create Task
  Customer = "customer",
  // This role combine both the customer and the its own.
  Operator = "operator",
  // Not only it encapsules the 2 aboves
  Admin = "admin",

  SuperAdmin = "super-admin",

  // Primitive Roles | if missing, they can prevent user to do basic operation
  Delete = "delete",
  Create = "create",
  Update = "update",
  ReadOnly = "readOnly",

  // Specific Roles
  Developer = "developer",

  All = "all",
}

export enum RobotStates {
  Unavailable = "unavailable",
  Running = "running",
  Failed = "failed",
  Available = "available",
}

export enum OperatorStatus {
  Pending = "Pending",
  Denied = "Denied",
  Approved = "Approved",
  Revoked = "Revoked",
}

export enum SimulationJobState {
  // TODO: add documentation here ...
  Init = "init",
  Pending = "pending",
  Running = "running",
  Terminated = "terminated",
  Completed = "completed",
  Failed = "failed",
}

export enum RoboticPlatform {
  FreedomRobotics = "freedomRobotics",
  AWSCloudIoT = "awsCloudIoT",
  Other = "other",
}

export enum SubscriptionType {
  Free = "free",
  Monthly = "monthly",
  Yearly = "yearly",
  asYouGo = "asYouGo",
}

export enum PaymentStatus {
  Created = "created",
  Pending = "pending",
  Succeeded = "succeeded",
  Failed = "failed",
  Refunded = "refunded",
  Captured = "captured",
}

export enum PaymentMethod {
  Card = "card",
  Bank = "bank",
  Cash = "cash",
  Paypal = "paypal",
  ApplePay = "applePay",
  GooglePay = "googlePay",
  Alipay = "alipay",
  Stripe = "stripe",
  // Local payment method
  Wave = "wave",
  OrangeMoney = "orangeMoney",
  Wari = "wari",
}

export enum OauthType {
  Default = "default",
  Google = "google",
  Github = "github",
}

export enum UserStatuses {
  Busy = "busy",
  Idle = "idle",
  Offline = "offline",
  None = "none",
}

export enum Services {
  Notification = "notification",
  Payment = "payment",
  Task = "task",
  Robot = "robot",
  Operator = "operator",
  Simulation = "simulation",
  Customer = "customer",
  Expiration = "expiration",
  Message = "message",
}
