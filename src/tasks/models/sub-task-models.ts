import mongoose, { Types } from "mongoose";
import { IMongooseObjectExt } from "../../types/utils/models";
import { ItineraryType, ObjectStates } from "../../types/utils";
import {
  ConnectViewerType,
  DeliveryType,
  TelepresenceType,
} from "../enums/task-types";

/**
 * Interface representing a Task Delivery.
 */
/**
 * Interface representing the delivery details of a task.
 */
export interface TaskDeliveryInterface extends IMongooseObjectExt {
  /**
   * Reference to the order.
   * @type {Types.ObjectId}
   */
  order?: Types.ObjectId;

  /**
   * Type of delivery to be performed (indoor | outdoor).
   * @type {DeliveryType}
   */
  deliveryType?: DeliveryType;

  /**
   * Description of the cleaning task.
   * @type {string}
   */
  description?: string;

  /**
   * Starting coordinates of the delivery.
   * @type {{ lat: number; lng: number }}
   */
  start: {
    lat: number;
    lng: number;
  };

  /**
   * Ending coordinates of the delivery.
   * @type {{ lat: number; lng: number }}
   */
  end: {
    lat: number;
    lng: number;
  };

  /**
   * Estimated time for the delivery in minutes.
   * @type {number}
   */
  estimatedTime?: number;

  /**
   * Estimated distance for the delivery in meters.
   * @type {number}
   */
  estimatedDistance?: number;

  /**
   * Additional metadata related to the delivery.
   * @type {any}
   */
  metadata?: any;
}

/**
 * Interface representing a Task Cleaning.
 */
export interface TaskCleaningInterface extends IMongooseObjectExt {
  /**
   * Cleaning Attributes
   */
  name?: string;

  /**
   * Cleaning Type
   */
  cleaningOf?: string;

  /**
   * Description of the cleaning task.
   */
  description?: string;

  /**
   * Area to be cleaned (as a polygon).
   */
  area?: mongoose.Schema.Types.Polygon;

  /**
   * Zone reference for the cleaning task.
   */
  zone?: Types.ObjectId;
}

/**
 * Interface representing a Task Inspection.
 */
export interface TaskInspectionInterface extends IMongooseObjectExt {
  /**
   * Name of the inspection task.
   */
  name?: string;

  /**
   * Description of the inspection task.
   */
  description?: string;

  /**
   * Inspection Attributes
   */
  itinerary: ItineraryType;

  /**
   * Choose a mission for the flight task.
   */
  mission?: Types.ObjectId;
}

/**
 * Interface representing a Task Simulation.
 */
export interface TaskSimulationInterface extends IMongooseObjectExt {
  /**
   * ID of the associated job.
   */
  jobId?: string;

  /**
   * Name of the associated job.
   */
  jobName?: string;

  /**
   * State of the simulation job.
   */
  state?: ObjectStates;

  /**
   * ID of the associated simulation.
   */
  simulationId?: string;

  /**
   * Thing related to the simulation.
   */
  thing?: string;
}

/**
 * Interface representing a Task Flight.
 */
export interface TaskFlightInterface extends IMongooseObjectExt {
  /**
   * Name of the flight task.
   */
  name: string;

  /**
   * Description of the flight task.
   */
  description?: string;

  /**
   * Choose a mission for the flight task.
   */
  mission?: Types.ObjectId;
}

/**
 * Interface representing a Telepresence Task
 */
export interface TaskTelepresenceInterface extends IMongooseObjectExt {
  /**
   * Name of the telepresence task.
   */
  name: string;

  /**
   * Connection link for the telepresence task.
   */
  connectionLink?: string;

  /**
   * Description of the telepresence task.
   */
  description?: string;

  type: TelepresenceType;

  /**
   * Video data
   */
  videoData?: {
    url: string;
    duration: number;
  };

  /**
   * Shop data
   */
  shopData?: {
    shopId?: string;
    shopName?: string;
    discount?: number;
    paymentLink?: string;
  };

  /**
   * Sub-Task that can be performed by the robot
   */
  subTasks?: Types.ObjectId[];
}

export interface MissionInterface extends IMongooseObjectExt {
  /**
   * Name of the mission. Must be unique.
   */
  reference: string;
  /**
   * Type of the mission.
   */
  type: ItineraryType;

  /**
   * Extra mission configuration.
   */
  configuration?: any;

  /**
   * Mission data
   */
  missionData?: any;

  /**
   * The organization where the mission belongs.
   */
  organizationId?: Types.ObjectId;

  /**
   * Indicates whether the mission is public.
   */
  public?: boolean;

  /**
   * The organizations with which the mission is shared.
   */
  sharedWith?: Types.ObjectId[];
}

/**
 * Interface representing a connect task.
 */
export interface TaskConnectInterface extends IMongooseObjectExt {
  /**
   * Name of the task.
   */
  name: string;

  /**
   * Description of the task. (Optional)
   */
  description?: string;

  /**
   * The type of viewer for the task.
   */
  viewerType?: ConnectViewerType;
}
