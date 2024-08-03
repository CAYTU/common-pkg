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
  /** If the task is for a flight. */
  Flight = "flight",
  /** Telepresence task type */
  Telepresence = "telepresence",
  /** Connect task type */
  Connect = "connect",
}

/**
 * Enumerates the possible roles for users.
 */
export enum UserRole {
  Invited = "invited",
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

export const PrimaryRoles = [
  UserRole.Invited,
  UserRole.Customer,
  UserRole.Developer,
  UserRole.Operator,
  UserRole.Admin,
  UserRole.SuperAdmin,
];

export const UserPermissions = [
  UserRole.All,
  UserRole.ReadOnly,
  UserRole.Create,
  UserRole.Delete,
  UserRole.Update,
];

/**
 * @description
 * This enum is used to define the state of a robot.

 */
export enum RobotStates {
  /**
   * The robot is in an error state */
  Error = "error",

  /**
   * The robot thing is providing data */
  Connected = "connected",

  /**
   * No data being received from the iot endpoint */
  Disconnected = "disconnected",

  /**
   * The robot is active */
  Active = "active",
}

/**
 * Enumerates the possible status values for a robot.
 */
export enum RobotStatus {
  /** The robot is assigned to a task. */
  Assigned = "assigned",
  /** The robot is available to be assigned to a task. */
  Available = "available",
  /** The robot is currently running a task. */
  Running = "running",
  /** The robot is not available to be assigned to a task. */
  Unavailable = "unavailable",
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

export enum OrderStatus {
  Created = "created",
  Pending = "pending",
  Succeeded = "succeeded",
  Failed = "failed",
}

/**
 * Enumerates the possible states of objects.
 * objects:
 * - avatar
 * - simulation job
 */
export enum ObjectStates {
  /** Initial state when a simulation job is created. */
  Init = "init",
  /** The simulation job is pending and waiting to start. */
  Pending = "pending",
  /** The simulation job is starting. */
  Starting = "starting",
  /** The simulation job is currently running. */
  Running = "running",
  /** The simulation job has been terminated. */
  Terminated = "terminated",
  /** The simulation job has been canceled. */
  Canceled = "canceled",
  /** The simulation job is terminating */
  Terminating = "terminating",
  /** The simulation job has been successfully completed. */
  Completed = "completed",
  /** The simulation job has failed to execute. */
  Failed = "failed",
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
  /** The simulation job has been canceled. */
  Canceled = "canceled",
  /** The simulation job is terminating */
  Terminating = "terminating",
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
  AWS = "aws",
  /** The robot is connected to another platform not specified here. */
  Other = "other",
}

/**
 * Enumerates the possible subscription types for a service.
 */
export enum SubscriptionType {
  Free = "free",
  Professional = "professional",
  Enterprise = "enterprise",
  PayAsYouGo = "payAsYouGo",
}

/**
 * Enumerates the possible subscription statuses for a service.
 */
export enum SubscriptionStatus {
  Active = "active",
  Inactive = "inactive",
  Canceled = "canceled",
}

export enum PaymentStatus {
  Pending = "pending",
  Succeeded = "succeeded",
  Failed = "failed",
}

export enum PaymentMethod {
  CreditCard = "creditCard",
  // Local payment method
  Wave = "wave",
  OrangeMoney = "orangeMoney",
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
  Expired = "expired",
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
  Zone = "zone",
  User = "user",
  Organization = "organization",
  Subscription = "subscription",
  SimulationJob = "simulationJob",
}

/**
 * @description
 * This enum is used to define the category of a device
 * that is being used to execute a task.
 */
export enum DeviceCategory {
  /**
   * Drones (Unmanned Aerial Vehicles)
   */
  UAV = "uav",
  /**
   * (Unmanned Ground Vehicles)
   */
  UGV = "ugv",
  /**
   * For iot devices
   */
  Iot = "iot",
  /**
   * Telepresence Robots
   */
  Telepresence = "telepresence",
  /**
   * Senelec Robot
   */
  Senelec = "senelec",
  /**
   * Forklifts
   * (e.g. device that can be controlled remotely)
   */
  Forklift = "forklift",

  /**
   * Agricultural Devices
   */
  AgBOT = "agbot",
}

/**
 * @description
 * This enum is used to define the type of device
 * that is being used to execute a task.
 */
export enum DeviceType {
  /**
   * Semi-autonomous device
   * (e.g. device that can be controlled remotely)
   */
  SemiAutonomous = "semi-autonomous",
  /**
   * Fully autonomous device
   * (e.g. device that can operate without human intervention)
   */
  FullyAutonomous = "fully-autonomous",
  /**
   * Bared device
   */
  Bared = "bared",
}

/**
 * @description
 * This enum is used to define different types of missions
 * that can be executed by a robot to complete a task.
 */
export enum ItineraryType {
  /**
   * Multi-Point Mission Type
   */
  Waypoint = "waypoint",

  /**
   * Single-Point Mission Type
   */
  Point = "point",

  /**
   * A surface area mission type
   * (e.g. a cleaning robot cleaning a surface area)
   */
  Area = "area",
}

/**
 * @description
 * This enum is used to define the type of telepresence robot
 * that is being used to execute a task.
 */
export enum TelepresenceType {
  Video = "video",
  Shop = "shop",
  Avatar = "avatar",
}

/**
 * @description
 * This enum is used to define the type of viewer
 * that is being used to execute a 'connect' task.
 */
export enum ConnectViewerType {
  /**
   * The viewer is a robot
   */
  Robot = "robot",
  /**
   * The viewer is an avatar
   */
  Avatar = "avatar",
}
