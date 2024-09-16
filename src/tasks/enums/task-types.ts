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
  /** Avatar Task */
  Avatar = "avatar",
  /** If the task is for a flight. */
  Flight = "flight",
  /** Telepresence task type */
  Telepresence = "telepresence",
  /** Connect task type */
  Connect = "connect",
  // TODO: Remove this in the future
  Custom = "custom",
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

export type DeliveryType = "indoor" | "outdoor";

export type FileContextType = "text" | "audio" | "file";
