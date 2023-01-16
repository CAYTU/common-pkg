import GeoJSON from "mongoose-geojson-schema";
import mongoose, { Types } from "mongoose";
import {
  CurrentRoleState,
  RobotStates,
  TaskStatus,
  TaskType,
  UserRole,
} from "../utils";

declare namespace ETypes {
  // Some common types:
  //--------------------
  // Coordinate type for an object coupling both latitude & longitude

  /**
   * Category:
   */

  // Common
  type Point = {
    type?: "Point" | string;
    coordinates: [number];
  };

  type GeoJSONType = {
    type?: "GeoJSON" | string;
    coordinates: [[[number]]];
  };

  export interface CategoryEventInterface {
    id: string;
    name: string;
    image: string;
    description?: string;
    version: number;
  }

  export interface CategoryRepEventInterface {
    id: string;
    name: string;
    image: string;
    version: number;
  }

  /**
   * Customer:
   */
  export interface CustomerEventInterface {
    id: string;
    user: Types.ObjectId;
    loyaltyPoint: number;
    walletBalance: number;
    address: string;
    city: string;
    version: string;
  }

  export interface CustomerRepEventInterface {
    id: string;
    user: Types.ObjectId;
    address: string;
    city: string;
    version: number;
  }

  /**
   * Notification
   */

  export interface NotificationInterface {
    id: string;
    from?: string;
    to: string;
    message: string;
    version: number;
  }

  /**
   * Operator:
   */
  export type IDType = "id" | "passport";

  export interface OperatorEventInterface {
    id: string;
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
    version: number;
  }

  export interface OperatorRepEventInterface {
    id: string;
    user: Types.ObjectId;
    active?: boolean;
    aboutMe?: string;
    version: number;
  }

  /**
   * Product:
   */
  export interface ProductEventInterface {
    id: string;
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
    version: number;
  }

  export interface ProductRepEventInterface {
    id: string;
    name: string;
    price: number;
    description: string;
    image?: string;
    version: string;
  }

  /**
   * Robot:
   */
  export interface RobotEventInterface {
    id: string;
    robotId: string;
    name: string;
    accountId?: string;
    type: string;
    image: string;
    token?: string;
    // This variable lock the robot if after handshake of task acceptance the robot failed
    available?: boolean;
    // uri represents the address to reach the robot
    uri?: string;
    state?: RobotStates;
    taskCount?: number;
    assignedTaskCount?: number;
    vendor?: Types.ObjectId;
    zone?: Types.ObjectId;
    position?: mongoose.Schema.Types.Point & Point;
    currentTask?: Types.ObjectId;
    version: number;
  }

  export interface RobotRepEventInterface {
    id: string;
    name: string;
    type: string;
    image: string;
    position?: mongoose.Schema.Types.Point & Point;
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

  export interface TaskEventInterface {
    id: string;
    type: TaskType;
    fare?: number;
    //   Ref to product Model
    product?: Types.ObjectId;
    //   Ref to Operator Model
    operator?: Types.ObjectId;
    //   Ref to Customer Model
    customer?: Types.ObjectId;
    //   Ref to Robot Model
    robot?: Types.ObjectId;
    status?: TaskStatus;
    duration?: DurationType;
    // Delivery Attrs
    itinerary?: ItineraryType;
    // Cleaning Attrs
    location?: mongoose.Schema.Types.GeoJSON & GeoJSONType;
    version: number;
  }

  export interface TaskRepEventInterface {
    id: string;
    type: TaskType;
    fare: number;
    status: TaskStatus;
    // Robot can be modifiable from event
    robot?: Types.ObjectId;
    // Delivery Attrs
    itinerary?: ItineraryType;
    // Cleaning Attrs
    location?: mongoose.Schema.Types.Point & GeoJSONType;
    version: number;
  }

  export interface TaskGetRobotCandidate {
    id: string;
    type: TaskType;
    // Delivery Attrs
    itinerary?: ItineraryType;
    // Cleaning Attrs
    location?: mongoose.Schema.Types.Point & GeoJSONType;
  }

  /**
   * User:
   */

  export interface UserEventInterface {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    isVerified?: boolean;
    currentRoleState?: CurrentRoleState;
    password: string;
    image?: string;
    roles?: UserRole[];
    position?: mongoose.Schema.Types.Point & Point;
    version: number;
  }

  export interface UserRepEventInterface {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
    version: number;
  }

  /**
   * Vendor:
   */
  export interface VendorEventInterface {
    id: string;
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
    version: number;
  }

  export interface VendorRepEventInterface {
    id: string;
    name: string;
    address: string;
    logo: string;
    version: number;
  }

  /**
   * Zone:
   */

  export interface ZoneEventInterface {
    id: string;
    name: string;
    area: mongoose.Schema.Types.Polygon;
    securityRate?: number;
    practicabilityPercentage?: number;
    version: number;
  }

  export interface ZoneRepEventInterface {
    id: string;
    name: string;
    version: number;
  }
}

export default ETypes;
