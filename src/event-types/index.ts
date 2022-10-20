import { Types } from "mongoose";

declare namespace ETypes {
  // Some common types:
  //--------------------
  // Coordinate type for an object coupling both latitude & longitude
  export type CoordinateType = {
    latitude: number;
    longitude: number;
  };

  export type PolygonType = {
    type: string;
    coordinates: [[[number]]];
  };

  /**
   * Category:
   */
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
   * Operator:
   */
  export type IDType = "id" | "passport";

  export interface OperatorEventInterface {
    id: string;
    user?: Types.ObjectId;
    identityType: IDType;
    identityNumber: number;
    fcmToken: string;
    active: boolean;
    orderCount: number;
    earnings: number;
    aboutMe: string;
    zone?: Types.ObjectId;
    version: number;
  }

  export interface OperatorRepEventInterface {
    id: string;
    user?: Types.ObjectId;
    active: boolean;
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
    status: string;
    orderCount: number;
    assignedOrderCount?: number;
    vendor?: Types.ObjectId;
    zone?: Types.ObjectId;
    currentOrder?: number;
    version: number;
  }

  export interface RobotRepEventInterface {
    id: string;
    name: string;
    type: string;
    image: string;
    position: CoordinateType;
    version: number;
  }

  /**
   * Task:
   *
   */
  export enum TaskStatus {
    // First state when a task is newly created. Waiting for a robot to be
    // assigned and an operator to pick up the task
    Pending = "pending",
    // Only accepted after a robot has been assigned and an operator has picked
    // this task
    Accepted = "accepted",
    // If supply need to be provided in the robot to operate task
    Processing = "processing",
    // When the operator is driving the robot in charge of executing the task
    Running = "running",
    // When the robot has reached the ending point or has finish the task duration
    Arrived = "arrived",
    // If task has been cancelled before reaching final goal
    Cancelled = "cancelled",
    // When the payment service failed to collect money for the task
    PaymentFailed = "payment:failed",
    // When task ha been refunded
    Refunded = "refunded",
    // Scheduled time for the task
    Scheduled = "scheduled",
  }

  export enum TaskType {
    // If task is a delivery
    Delivery = "delivery",
    // If task is for cleaning
    Cleaning = "cleaning",
    // If task is none of the above (delivery, cleaning, ...)
    Custom = "custom",
  }

  export type DurationType = {
    hours: number;
    minutes: number;
    seconds: number;
  };

  export type ItineraryType = {
    start: CoordinateType;
    end: CoordinateType;
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
    location?: CoordinateType;
    version: number;
  }

  export interface TaskRepEventInterface {
    id: string;
    type: TaskType;
    fare: number;
    status: TaskStatus;
    version: number;
  }

  /**
   * User:
   */
  export enum UserRole {
    // This is the basic role that any user which creates an account
    // through the web interface will have.
    // Basic operations are allowed
    Customer = "customer",
    // This role combine both the customer and the its own.
    Operator = "operator",
    // He's a customer role but not the operator's. Though, he's capabilities
    // are different from the operator.
    Manager = "manager",
    // Not only it encapsules the 2 aboves also he's all rights
    Admin = "admin",
  }

  export interface UserEventInterface {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    image: string;
    role: UserRole;
    zone?: Types.ObjectId;
    version: number;
  }

  export interface UserRepEventInterface {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    image: string;
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
    coordinates: CoordinateType;
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
    location: {
      type: string;
      coordinates: number[][][];
    };
    version: number;
  }

  export interface ZoneRepEventInterface {
    id: string;
    name: string;
    version: number;
  }
}

export default ETypes;
