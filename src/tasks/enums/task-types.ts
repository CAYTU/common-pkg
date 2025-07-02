/**
 * Enumerates the possible types of tasks that can be assigned or executed.
 */
export enum TaskType {
  /**
   * A task for delivering items from one location to another.
   */
  Delivery = "delivery",

  /**
   * A task for performing cleaning operations in a designated area.
   */
  Cleaning = "cleaning",

  /**
   * A task for conducting an inspection of a certain location or object.
   */
  Inspection = "inspection",

  /**
   * A task that involves running a simulation, typically in a virtual environment.
   */
  Simulation = "simulation",

  /**
   * A task that involves controlling or using an avatar, typically in telepresence operations.
   */
  Avatar = "avatar",

  /**
   * A task that involves running multiple avatars.
   */
  AvatarPool = "avatarpool",

  /**
   * A task for managing or executing a flight, likely involving drones or flying vehicles.
   */
  Flight = "flight",

  /**
   * A task involving telepresence, where a remote operator uses a robot or avatar
   * to be present in a different location.
   */
  Telepresence = "telepresence",

  /**
   * A task that involves connecting systems or entities, such as networking devices
   * or establishing communication between endpoints.
   */
  Connect = "connect",

  /**
   * A custom task type, used for defining tasks that do not fall into the predefined categories.
   * @deprecated This will be removed in future versions.
   */
  Custom = "custom",
}

/**
 * @description
 * Defines the different types of telepresence tasks that can be performed.
 * These tasks involve using a telepresence robot to execute a remote operation.
 */
export enum TelepresenceType {
  /**
   * A telepresence task using video communication, where the operator
   * interacts with the environment through live video feed.
   */
  Video = "video",

  /**
   * A telepresence task related to shopping, where the operator may be
   * assisting or providing guidance in a shop or retail environment.
   */
  Shop = "shop",

  /**
   * A telepresence task that involves using an avatar, typically for
   * remote operation in a more immersive or personal environment.
   */
  Avatar = "avatar",
}

/**
 * @description
 * Defines the different types of viewers or participants that can be used in
 * a 'connect' task, determining the role or medium through which the connection
 * is facilitated.
 */
export enum ConnectViewerType {
  /**
   * The viewer is a robot, meaning the task is executed through a robotic
   * system that provides remote control or interaction.
   */
  Robot = "robot",

  /**
   * The viewer is an avatar, indicating the task involves a digital or
   * virtual representation of the user in a remote environment.
   */
  Avatar = "avatar",
}

/**
 * Type representing the delivery context, specifying whether the delivery
 * is carried out indoors or outdoors.
 */
export type DeliveryType = "indoor" | "outdoor";
