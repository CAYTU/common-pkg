/**
 * Represents a point with optional type information and coordinates as [longitude, latitude].
 */
export type Point = {
  /** Optional type information for the point. */
  type?: string;
  /** Coordinates as [longitude, latitude]. */
  coordinates: [number, number];
};

/**
 * Represents a GeoJSON type with optional type information and coordinates as an array of arrays of [longitude, latitude].
 */
export type GeoJSONType = {
  /** Optional type information for the GeoJSON object. */
  type?: string;
  /** Coordinates as an array of arrays of [longitude, latitude]. */
  coordinates: [[[number, number]]];
};

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
  /** When the robot has reached the ending point or has finished the task duration. */
  Arrived = "arrived",
  /** If the task has been canceled before reaching the final goal. */
  Cancelled = "cancelled",
  /** When the payment service failed to collect money for the task. */
  PaymentFailed = "payment:failed",
  /** When the task has been refunded. */
  Refunded = "refunded",
  /** Scheduled time for the task. */
  Scheduled = "scheduled",
  /** When the task has been completed. */
  Completed = "completed",
  /** When a problem has been detected. */
  Failure = "failure",
  /** When the task has been deleted. */
  Deleted = "deleted",
}

/**
 * Enumerates the possible types of tasks.
 */
export enum TaskType {
  /** If the task is a delivery. */
  Delivery = "delivery",
  /** If the task is for cleaning. */
  Cleaning = "cleaning",
  /** Inspection Task. */
  Inspection = "inspection",
  /** Run a simulation. */
  Simulation = "simulation",
  /** If the task is for a survey. */
  Survey = "survey",
  /** If the task is none of the above (delivery, cleaning, ...). */
  Custom = "custom",
}

/**
 * Enumerates the possible roles for users.
 */
export enum UserRole {
  /** This is the most basic role that any user that creates an account through the API will have. This role is for the robot. */
  Robot = "robot",
  /** Basic operations are allowed: Read & Create Task. */
  Customer = "customer",
  /** This role combines both the customer and the operator roles. */
  Operator = "operator",
  /** Not only does it encapsulate the roles of customer and operator. */
  Admin = "admin",
  /** Super Admin role with extended privileges. */
  SuperAdmin = "super-admin",
  /** Allows users to delete resources. */
  Delete = "delete",
  /** Allows users to create resources. */
  Create = "create",
  /** Allows users to update resources. */
  Update = "update",
  /** Provides read-only access to resources. */
  ReadOnly = "readOnly",
  /** Role for developers with special privileges. */
  Developer = "developer",
  /** Special role granting all permissions. */
  All = "all",
}

/**
 * @description
 * This enum is used to define the state of a robot.
 * The state of a robot can be used to determine
 * if a robot is available to execute a task.
 */
export enum RobotStates {
  /**
   * The robot is powered off
   */
  PoweredOff = "poweredOff",
  /**
   * The robot is powered on
   * but not ready to receive commands
   * (e.g. the robot is booting)
   */
  PoweredOn = "poweredOn",

  /**
   * The robot is powered on
   * and ready to receive commands
   * (e.g. the robot is booted)
   */
  Ready = "ready",

  /**
   * The robot is on Task, executing a task,
   */
  Running = "running",

  /**
   * The robot is charging its battery
   * (e.g. the robot is plugged in)
   */
  Charging = "charging",

  /**
   * The charging is complete
   */
  ChargingComplete = "chargingComplete",

  /**
   * The robot is in an error state
   * (e.g. the robot is stuck)
   * and needs to be reset
   */
  Error = "error",

  /**
   * The robot is now available for a new task
   */
  Available = "available",

  /**
   * There is a bad network connection
   * between the robot and the server
   */
  BadConnection = "badConnection",

  /**
   * The robot is in a low battery state
   * and needs to be charged
   * (e.g. the robot is at 10% battery)
   */
  LowBattery = "lowBattery",

  /**
   * The robot is in a critical battery state
   * and needs to be charged
   * (e.g. the robot is at 5% battery)
   */
  CriticalBattery = "criticalBattery",
}

/**
 * Enumerates the possible status values for an operator.
 */
export enum OperatorStatus {
  /** The operator's status is pending approval. */
  Pending = "Pending",
  /** The operator's application has been denied. */
  Denied = "Denied",
  /** The operator's application has been approved. */
  Approved = "Approved",
  /** The operator's approval has been revoked. */
  Revoked = "Revoked",
}

/**
 * Enumerates the possible states of a simulation job.
 */
export enum SimulationJobState {
  /** Initial state when a simulation job is created. */
  Init = "init",
  /** The simulation job is pending and waiting to start. */
  Pending = "pending",
  /** The simulation job is currently running. */
  Running = "running",
  /** The simulation job has been terminated. */
  Terminated = "terminated",
  /** The simulation job has been successfully completed. */
  Completed = "completed",
  /** The simulation job has failed to execute. */
  Failed = "failed",
}

/**
 * Enumerates the possible robotic platforms for robots.
 */
export enum RoboticPlatform {
  /** The robot is connected to Freedom Robotics platform. */
  FreedomRobotics = "freedomRobotics",
  /** The robot is connected to AWS Cloud IoT platform. */
  AWSCloudIoT = "awsCloudIoT",
  /** The robot is connected to another platform not specified here. */
  Other = "other",
}

/**
 * Enumerates the possible subscription types for a service.
 */
export enum SubscriptionType {
  /** Free subscription type. */
  Free = "free",
  /** Monthly subscription type. */
  Monthly = "monthly",
  /** Yearly subscription type. */
  Yearly = "yearly",
  /** Pay-as-you-go subscription type. */
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

export enum OrganizationType {
  Principal = "principal",
  Subsidiary = "subsidiary",
}

export enum OauthType {
  Default = "default",
  Google = "google",
  Github = "github",
}

export enum UserStatuses {
  Busy = "busy",
  Idle = "idle",
  None = "none",
}

export enum UserMembershipStatus {
  Pending = "pending",
  Approved = "approved",
  Denied = "denied",
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

/**
 * @description
 * This enum is used to define the type of robot
 * that is being used to execute a task.
 */
export enum RobotType {
  /**
   * Drones (Unmanned Aerial Vehicles)
   */
  UAV = "uav",
  /**
   * Industrial Robots
   */
  Industrial = "industrial",
  /**
   * Agricultural Robots
   * (e.g. Harvest Automation, Harvest Croo, Blue River Technology)
   */
  Agribot = "agribot",
  /**
   * Caytu Robots
   */
  Caytubot = "caytuBot",
  /**
   * Underwater Robots (e.g. OpenROV, SeaDrone, Bluefin Robotics)
   */
  ROV = "rov",
  /**
   * Autonomous Underwater Vehicles (AUVs)
   */
  AUV = "auv",
}
