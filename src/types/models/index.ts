import GeoJSON from "mongoose-geojson-schema";
import mongoose, { Types } from "mongoose";
import {
  CurrentRoleState,
  RobotStates,
  SimulationJobState,
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

  export interface IMongooseObjectExt {
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

  export interface CategoryRepInterface extends IMongooseObjectExt {
    id: string;
    name: string;
    image: string;
  }

  export interface CategoryEventInterface {
    id: string;
    name: string;
    image: string;
    version: number;
  }

  /**
   * Customer:
   */
  export interface CustomerInterface extends IMongooseObjectExt {
    user: Types.ObjectId;
    loyaltyPoint: number;
    walletBalance: number;
    address: string;
    city: string;
  }

  export interface CustomerRepInterface extends IMongooseObjectExt {
    id: string;
    user: Types.ObjectId;
    address: string;
    city: string;
  }

  export interface CustomerEventInterface {
    id: string;
    user: Types.ObjectId;
    address: string;
    city: string;
    version: number;
  }

  /**
   * Notification
   */

  export interface NotificationInterface extends IMongooseObjectExt {
    from?: string;
    to: string;
    message: string;
  }

  /**
   * Operator:
   */
  export type IDType = "id" | "passport";

  export interface OperatorInterface extends IMongooseObjectExt {
    identityType: IDType;
    identityNumber: number;
    user: Types.ObjectId;
    active?: boolean;
    taskCount?: number;
    earnings?: number;
    aboutMe?: string;
    currentTask?: Types.ObjectId;
    zone?: Types.ObjectId;
  }

  export interface OperatorRepInterface extends IMongooseObjectExt {
    id: string;
    user: Types.ObjectId;
    active?: boolean;
    aboutMe?: string;
  }

  export interface OperatorEventInterface {
    id: string;
    user: Types.ObjectId;
    active?: boolean;
    aboutMe?: string;
    version: number;
  }

  /**
   * Product:
   */
  export interface ProductInterface extends IMongooseObjectExt {
    name: string;
    type: string;
    quantity: number;
    agent: Types.ObjectId;
    price: number;
    discountType: string;
    discount: number;
    category: Types.ObjectId;
    image: string;
    vendor: Types.ObjectId;
    description?: string;
  }

  export interface ProductRepInterface extends IMongooseObjectExt {
    id: string;
    name: string;
    price: number;
    description: string;
    image?: string;
  }

  export interface ProductEventInterface {
    id: string;
    name: string;
    price: number;
    description: string;
    image?: string;
    version: number;
  }

  /**
   * Robot:
   */
  export interface RobotInterface extends IMongooseObjectExt {
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
    lastRecordedLocation?: mongoose.Schema.Types.Point & Point;
    currentTask?: Types.ObjectId;
    // Time Tracker
    assignedAt?: Date;
    unassignedAt?: Date;
    arrivedAt?: Date;
  }

  export interface RobotRepInterface extends IMongooseObjectExt {
    id: string;
    name: string;
    type: string;
    image: string;
    fcmToken?: string;
    deviceId?: string;
    token?: string;
    lastRecordedLocation?: mongoose.Schema.Types.Point & Point;
  }

  export interface RobotEventInterface {
    id: string;
    name: string;
    type: string;
    image: string;
    fcmToken?: string;
    deviceId?: string;
    token?: string;
    lastRecordedLocation?: mongoose.Schema.Types.Point & Point;
    version: number;
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

  /**
   * Simulation:
   */

  export interface SimulationInterface extends IMongooseObjectExt {
    name: string;
    image: string;
    description: string;
    jobDefinition?: string;
    jobQueue?: string;
    templateURL?: string;
    role?: string;
    region?: string;
  }

  export interface SimulationRepInterface extends IMongooseObjectExt {
    id: string;
    name: string;
    image: string;
    description: string;
    jobDefinition?: string;
    jobQueue?: string;
    templateURL?: string;
    role?: string;
    region?: string;
    version: number;
  }

  export interface SimulationJobInterface extends IMongooseObjectExt {
    jobName: string;
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
    region: string;
    endpoint: string;
    thing: string;
    simulationId: Types.ObjectId;
    state: SimulationJobState;
  }

  export interface SimulationJobRepInterface extends IMongooseObjectExt {
    id: string;
    jobName: string;
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
    region: string;
    endpoint: string;
    thing: string;
    state: SimulationJobState;
    version: number;
  }

  export interface TaskDeliveryInterface extends IMongooseObjectExt {
    // Ref to a Product
    product?: Types.ObjectId;
    // Ref to a Vendor
    vendor?: Types.ObjectId;
    // Delivery Attrs
    itinerary: ItineraryType;
  }

  export interface TaskCleaningInterface extends IMongooseObjectExt {
    // Cleaning Attrs
    area: mongoose.Schema.Types.GeoJSON & GeoJSONType;
  }

  export interface TaskInspectionInterface extends IMongooseObjectExt {
    area: mongoose.Schema.Types.GeoJSON & GeoJSONType;
  }

  export interface TaskSimulationInterface extends IMongooseObjectExt {}

  export interface TaskCustomInterface extends IMongooseObjectExt {}

  export interface TaskStatusTracker extends IMongooseObjectExt {
    acceptedAt?: Date;
    runningAt?: Date;
    arrivedAt?: Date;
    processingAt?: Date;
    cancelledAt?: Date;
    paymentFailedAt?: Date;
    refundedAt?: Date;
    completedAt?: Date;
  }

  export interface TaskInterface extends IMongooseObjectExt {
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

  export interface TaskRepInterface extends IMongooseObjectExt {
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

    customer: Types.ObjectId;
  }

  export interface TaskEventInterface {
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

    customer: Types.ObjectId;
    version: number;
  }

  // TODO: Must be removed from here in the future
  export interface TaskGetRobotCandidateEventInterface {
    id: string;
    type: TaskType;
    // Count Id for number of tasks with padded number
    taskId: string;
    version: number;
  }

  /**
   * User:
   */

  export interface UserInterface extends IMongooseObjectExt {
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

  export interface UserRepInterface extends IMongooseObjectExt {
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

  export interface UserEventInterface {
    id: string;
    username: string;
    firstName: string;
    email: string;
    lastName: string;
    fcmToken?: string;
    isVerified?: boolean;
    customerSet?: boolean;
    image?: string;
    version: number;
  }

  /**
   * Vendor:
   */
  export interface VendorInterface extends IMongooseObjectExt {
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

  export interface VendorRepInterface extends IMongooseObjectExt {
    id: string;
    name: string;
    address: string;
    logo: string;
  }

  export interface VendorEventInterface {
    id: string;
    name: string;
    address: string;
    logo: string;
    version: number;
  }

  /**
   * Zone:
   */

  export interface ZoneInterface extends IMongooseObjectExt {
    region?: string;
    city?: string;
    country?: string;
    name: string;
    area: mongoose.Schema.Types.Polygon;
    securityRate?: number;
    practicabilityPercentage?: number;
  }

  export interface ZoneRepInterface extends IMongooseObjectExt {
    id: string;
    name: string;
    area: mongoose.Schema.Types.Polygon;
    country?: string;
  }

  export interface ZoneEventInterface {
    id: string;
    name: string;
    area: mongoose.Schema.Types.Polygon;
    country?: string;
    version: number;
  }
}

export default CTypes;
