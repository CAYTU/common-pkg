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

  // Common
  export type Point = {
    type?: "Point" | string;
    coordinates: [number];
  };

  export type GeoJSONType = {
    type?: "GeoJSON" | string;
    coordinates: [[[number]]];
  };

  /**
   * Category:
   */
  export interface CategoryInterface {
    name: string;
    image: string;
    description?: string;
  }

  export interface CategoryRepInterface {
    id: string;
    name: string;
    image: string;
  }

  /**
   * Customer:
   */
  export interface CustomerInterface {
    user: Types.ObjectId;
    loyaltyPoint: number;
    walletBalance: number;
    address: string;
    city: string;
  }

  export interface CustomerRepInterface {
    id: string;
    user: Types.ObjectId;
    address: string;
    city: string;
  }

  /**
   * Notification
   */

  export interface NotificationInterface {
    from?: string;
    to: string;
    message: string;
  }

  /**
   * Operator:
   */
  export type IDType = "id" | "passport";

  export interface OperatorInterface {
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

  export interface OperatorRepInterface {
    id: string;
    user: Types.ObjectId;
    active?: boolean;
    aboutMe?: string;
  }

  /**
   * Product:
   */
  export interface ProductInterface {
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

  export interface ProductRepInterface {
    id: string;
    name: string;
    price: number;
    description: string;
    image?: string;
  }

  /**
   * Robot:
   */
  export interface RobotInterface {
    robotId: string;
    name: string;
    accountId?: string;
    type: string;
    image: string;
    token?: string;
    fcmToken?: string;
    state?: RobotStates;
    taskCount?: number;
    // This variable lock the robot if after handshake of task acceptance the robot failed
    available?: boolean;
    // uri represents the address to reach the robot
    uri?: string;
    assignedTaskCount?: number;
    vendor?: Types.ObjectId;
    zone?: Types.ObjectId;
    position?: mongoose.Schema.Types.Point & Point;
    currentTask?: Types.ObjectId;
  }

  export interface RobotRepInterface {
    id: string;
    name: string;
    type: string;
    image: string;
    fcmToken?: string;
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

  export interface TaskInterface {
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
  }

  export interface TaskRepInterface {
    id: string;
    type: TaskType;
    fare: number;
    status: TaskStatus;
    //   Ref to Robot Model
    robot?: Types.ObjectId;
    // Delivery Attrs
    itinerary?: ItineraryType;
    // Cleaning Attrs
    location?: mongoose.Schema.Types.GeoJSON & GeoJSONType;
  }

  /**
   * User:
   */

  export interface UserInterface {
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

  export interface UserRepInterface {
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
  export interface VendorInterface {
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

  export interface VendorRepInterface {
    id: string;
    name: string;
    address: string;
    logo: string;
  }

  /**
   * Zone:
   */

  export interface ZoneInterface {
    name: string;
    area: mongoose.Schema.Types.Polygon;
    securityRate?: number;
    practicabilityPercentage?: number;
  }

  export interface ZoneRepInterface {
    id: string;
    name: string;
  }
}

export default CTypes;
