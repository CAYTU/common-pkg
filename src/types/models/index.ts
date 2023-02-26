import GeoJSON from "mongoose-geojson-schema";
import mongoose, { Types } from "mongoose";
import {
  CurrentRoleState,
  RobotStates,
  TaskStatus,
  TaskType,
  UserRole,
} from "../utils";

declare namespace CTypes {
  // Some common types:
  //--------------------
  // Coordinate type for an object coupling both latitude & longitude

  // Please if any modification happens in this files then make
  // sure to do it in the event-types as well: "src/event-types/index.ts"

  export interface DateTrackerInterface {
    updatedAt?: Date;
    createdAt?: Date;
  }

  // Common
  export type Point = {
    type?: "Point" | string;
    coordinates: [number, number];
  };

  export type GeoJSONType = {
    type?: "GeoJSON" | string;
    coordinates: [[[number, number]]];
  };

  /**
   * Category:
   */
  export interface CategoryInterface {
    name: string;
    image: string;
    description?: string;
  }

  export interface CategoryRepInterface extends DateTrackerInterface {
    id: string;
    name: string;
    image: string;
  }

  /**
   * Customer:
   */
  export interface CustomerInterface extends DateTrackerInterface {
    user: Types.ObjectId;
    loyaltyPoint: number;
    walletBalance: number;
    address: string;
    city: string;
  }

  export interface CustomerRepInterface extends DateTrackerInterface {
    id: string;
    user: Types.ObjectId;
    address: string;
    city: string;
  }

  /**
   * Notification
   */

  export interface NotificationInterface extends DateTrackerInterface {
    from?: string;
    to: string;
    message: string;
  }

  /**
   * Operator:
   */
  export type IDType = "id" | "passport";

  export interface OperatorInterface extends DateTrackerInterface {
    identityType: IDType;
    identityNumber: number;
    fcmToken: string;
    user: Types.ObjectId;
    active?: boolean;
    taskCount?: number;
    earnings?: number;
    aboutMe?: string;
    currentTask?: Types.ObjectId;
    zone?: Types.ObjectId;
  }

  export interface OperatorRepInterface extends DateTrackerInterface {
    id: string;
    user: Types.ObjectId;
    active?: boolean;
    aboutMe?: string;
  }

  /**
   * Product:
   */
  export interface ProductInterface extends DateTrackerInterface {
    name: string;
    type: string;
    quantity: number;
    agent: Types.ObjectId;
    price: number;
    discountType: string;
    discount: number;
    category: Types.ObjectId;
    image: string;
    description?: string;
  }

  export interface ProductRepInterface extends DateTrackerInterface {
    id: string;
    name: string;
    price: number;
    description: string;
    image?: string;
  }

  /**
   * Robot:
   */
  export interface RobotInterface extends DateTrackerInterface {
    name: string;
    accountId?: string;
    deviceId?: string;
    type: string;
    image: string;
    token?: string;
    fcmToken?: string;
    // Means the robots is online or not.
    status?: boolean;
    state?: RobotStates;
    taskCount?: number;
    batteryLevel?: number;
    speed?: number;
    controlMode?: string | number;
    faultCode?: number | string;
    linearVelocity?: number;
    angularVelocity?: number;

    assignedTaskCount?: number;
    zone?: Types.ObjectId;
    position?: mongoose.Schema.Types.Point & Point;
    currentTask?: Types.ObjectId;
    // Time Tracker
    assignedAt?: Date;
    unassignedAt?: Date;
    arrivedAt?: Date;
  }

  export interface RobotRepInterface extends DateTrackerInterface {
    id: string;
    name: string;
    type: string;
    image: string;
    fcmToken?: string;
    deviceId?: string;
    token?: string;
    // Robot can be modifiable from event
    robot?: Types.ObjectId;
    position?: mongoose.Schema.Types.Point & Point;
  }

  /**
   * Task:
   *
   */

  export type DurationType = {
    hours: number;
    minutes: number;
    seconds: number;
  };

  export type ItineraryType = {
    start: mongoose.Schema.Types.Point & Point;
    end: mongoose.Schema.Types.Point & Point;
  };

  export interface TaskDeliveryInterface extends DateTrackerInterface {
    // Ref to a Product
    product?: Types.ObjectId;
    // Ref to a Vendor
    vendor?: Types.ObjectId;
    // Delivery Attrs
    itinerary: ItineraryType;
  }

  export interface TaskCleaningInterface extends DateTrackerInterface {
    // Cleaning Attrs
    area: mongoose.Schema.Types.GeoJSON & GeoJSONType;
  }

  export interface TaskInspectionInterface extends DateTrackerInterface {
    area: mongoose.Schema.Types.GeoJSON & GeoJSONType;
  }

  export interface TaskSimulationInterface extends DateTrackerInterface {}

  export interface TaskCustomInterface extends DateTrackerInterface {}

  export interface TaskStatusTracker extends DateTrackerInterface {
    acceptedAt?: Date;
    runningAt?: Date;
    arrivedAt?: Date;
    processingAt?: Date;
    cancelledAt?: Date;
    paymentFailedAt?: Date;
    refundedAt?: Date;
  }

  export interface TaskInterface extends DateTrackerInterface {
    type: TaskType;
    fare?: number;
    // Code to deactivate or open the robot
    code?: number;
    // Count Id for number of tasks with padded number
    taskId: string;
    //   Ref to Operator Model
    operator?: Types.ObjectId;
    //   Ref to Customer Model
    customer?: Types.ObjectId;
    //   Ref to Robot Model
    robot?: Types.ObjectId;
    status?: TaskStatus;
    statusTracker?: Types.ObjectId;
    duration?: DurationType;
    // Number of assignment trial for a robot
    // This is only needed for a robot as the
    // process is automated
    // As, for an operator, the assignment is done
    // by the operator
    robotAssignmentTrial?: number;

    delivery?: Types.ObjectId;
    cleaning?: Types.ObjectId;
    simulation?: Types.ObjectId;
    inspection?: Types.ObjectId;
    custom?: Types.ObjectId;
  }

  export interface TaskRepInterface extends DateTrackerInterface {
    id: string;
    type: TaskType;
    fare: number;
    code?: number;
    // Count Id for number of tasks with padded number
    taskId: string;
    status: TaskStatus;
    //   Ref to Robot Model
    robot?: Types.ObjectId;
    //   Ref to Operator Model
    operator?: Types.ObjectId;
    // Ref to a Vendor
    vendor?: Types.ObjectId;
    customer: Types.ObjectId;
    // Delivery Attrs
    itinerary?: ItineraryType;
    // Cleaning Attrs
    area?: mongoose.Schema.Types.GeoJSON & GeoJSONType;
  }

  /**
   * User:
   */

  export interface UserInterface extends DateTrackerInterface {
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    isVerified?: boolean;
    fcmToken?: string;
    customerSet?: boolean;
    currentRoleState?: CurrentRoleState;
    password: string;
    image?: string;
    roles?: UserRole[];
    position?: mongoose.Schema.Types.Point & Point;
  }

  export interface UserRepInterface extends DateTrackerInterface {
    id: string;
    username: string;
    firstName: string;
    email: string;
    lastName: string;
    fcmToken?: string;
    isVerified?: boolean;
    customerSet?: boolean;
    image?: string;
  }

  /**
   * Vendor:
   */
  export interface VendorInterface extends DateTrackerInterface {
    name: string;
    businessField: string;
    vaxOrTax: number;
    address: string;
    maxDeliveryTime: number;
    minDeliveryTime: number;
    coverImage: string;
    logo: string;
    zone: Types.ObjectId;
    location: mongoose.Schema.Types.Point & Point;
    owner: Types.ObjectId;
  }

  export interface VendorRepInterface extends DateTrackerInterface {
    id: string;
    name: string;
    address: string;
    logo: string;
  }

  /**
   * Zone:
   */

  export interface ZoneInterface extends DateTrackerInterface {
    region?: string;
    city?: string;
    country?: string;
    name: string;
    area: mongoose.Schema.Types.Polygon;
    securityRate?: number;
    practicabilityPercentage?: number;
  }

  export interface ZoneRepInterface extends DateTrackerInterface {
    id: string;
    name: string;
    area: mongoose.Schema.Types.Polygon;
    country?: string;
  }
}

export default CTypes;
