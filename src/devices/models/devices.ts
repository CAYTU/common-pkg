import { Types } from "mongoose";

import { IMongooseObjectExt } from "../../types/utils/models";
import {
  DeviceCategory,
  DeviceType,
  RoboticPlatform,
  RobotStates,
  RobotStatus,
} from "../../types/utils";

interface OldLocationFormat {
  lng: number;
  lat: number;
}

interface NewLocationFormat {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

type FlexibleLocation = (OldLocationFormat | NewLocationFormat) & {
  [key: string]: any; // This allows for additional properties
};

/**
 * Represents the base information for a robot.
 */
export interface RobotBaseInterface extends IMongooseObjectExt {
  /**
   * The name of the robot.
   */
  name: string;

  /**
   * The type of the device.
   */
  type: DeviceType;

  /**
   * The category of the device
   */
  category: DeviceCategory;

  /**
   * The platform on which the robot operates (optional).
   */
  platform?: RoboticPlatform;

  /**
   * The unique identifier of the user who created the device.
   */
  user?: Types.ObjectId;

  /**
   * The unique identifier for the robot on its platform.
   */
  platformRobotId: Types.ObjectId;

  /**
   * The URL or path to the image associated with the robot.
   */
  image?: string;

  /**
   * The private token used to authenticate the robot in the backend (optional).
   */
  privateToken?: string;

  /**
   * The Firebase Cloud Messaging (FCM) token associated with the robot (optional).
   */
  fcmToken?: string;

  /**
   * Indicates whether the robot is currently online (optional).
   */
  isOnline?: boolean;

  /**
   * The current state of the robot.
   * e.g. "active", "connected", "disconnected", "error".
   */
  state?: RobotStates;

  /**
   * The status of the robot.
   * e.g. "assigned", "available", "running", "unavailable".
   */
  status?: RobotStatus;

  /**
   * A notifier when an operator is requesting to assign a task to the robot.
   */
  assignmentRequest?: boolean;

  /**
   * The total count of tasks associated with the robot (optional).
   */
  taskCount?: number;

  /**
   * The count of tasks currently assigned to the robot (optional).
   */
  assignedTaskCount?: number;

  /**
   * The zone to which the robot belongs (optional).
   */
  zone?: Types.ObjectId;

  /**
   * The organization where the robot belongs.
   */
  organizationId?: Types.ObjectId;

  /**
   * Indicates whether the robot is public.
   */
  public?: boolean;

  /**
   * The organizations with which the robot is shared.
   */
  sharedWith?: Types.ObjectId[];

  /**
   * The last recorded geographical location of the robot (optional).
   * Supports both old and new formats.
   */
  lastRecordedLocation?: FlexibleLocation;

  /**
   * The unique identifier of the current task assigned to the robot (optional).
   */
  currentTask?: Types.ObjectId;

  metadata?: any;
}

export interface DeviceAssignedTrackingInterface extends IMongooseObjectExt {
  /**
   * The unique identifier of the robot.
   */
  deviceId: Types.ObjectId;

  /**
   * The unique identifier of the task assigned to the robot.
   */
  taskId: Types.ObjectId;
}

/**
 * Represents AWS-specific configuration for a robot.
 */
export interface AwsRobotInterface {
  /**
   * The AWS Stack name for the robot (optional).
   * if cloudFormation was used to create the robot, this is the stack name
   */
  stackName?: string;

  /**
   * The Stack ID for the robot (optional).
   * In case of stack creation, this is the stack ID
   */
  stackId?: string;

  /**
   * The AWS access key ID for authenticating with AWS services (optional).
   */
  accessKeyId?: string;

  /**
   * The AWS secret access key for authenticating with AWS services (optional).
   */
  secretAccessKey?: string;

  /**
   * The session token for temporary AWS credentials (optional).
   */
  sessionToken?: string;

  /**
   * The AWS region where the robot is deployed (optional).
   */
  region?: string;

  /**
   * The AWS IoT endpoint for the robot (optional).
   */
  endpoint?: string;

  /**
   * The Channel Name for the robot (optional).
   * This is used for AWS IoT Core
   */
  channelName?: string;

  /**
   * The name of the AWS IoT thing associated with the robot (optional).
   */
  thing?: string;
}

/**
 * Represents Freedom Robotics-specific configuration for a robot.
 */
export interface FreedomRobotInterface {
  /**
   * The secret key used for authentication with Freedom Robotics (optional).
   */
  secret?: string;

  /**
   * The account ID associated with the robot on the Freedom Robotics platform (optional).
   */
  accountId?: string;

  /**
   * The unique device ID for the robot on the Freedom Robotics platform (optional).
   */
  deviceId?: string;

  /**
   * The private token used to authenticate the robot in the backend (optional).
   */
  privateToken?: string;
}
