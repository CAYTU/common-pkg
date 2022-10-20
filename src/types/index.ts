// Please if any modification happens in this files then make
// sure to do it in the event-types as well: "src/event-types/index.ts"

import { Types } from "mongoose";

declare namespace CTypes {
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
   * Operator:
   */
  export type IDType = "id" | "passport";

  export interface OperatorInterface {
    user?: Types.ObjectId;
    identityType: IDType;
    identityNumber: number;
    fcmToken: string;
    active: boolean;
    orderCount: number;
    earnings: number;
    aboutMe: string;
    zone?: Types.ObjectId;
  }

  export interface OperatorRepInterface {
    id: string;
    user?: Types.ObjectId;
    active: boolean;
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
    status: string;
    orderCount: number;
    assignedOrderCount?: number;
    vendor?: Types.ObjectId;
    zone?: Types.ObjectId;
    currentOrder?: number;
  }

  export interface RobotRepInterface {
    id: string;
    name: string;
    type: string;
    image: string;
    position: CoordinateType;
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
    location?: CoordinateType;
  }

  export interface TaskRepInterface {
    id: string;
    type: TaskType;
    fare: number;
    status: TaskStatus;
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

  export interface UserInterface {
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    image: string;
    role: UserRole;
    zone?: Types.ObjectId;
  }

  export interface UserRepInterface {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    image: string;
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
    coordinates: CoordinateType;
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
    location: {
      type: string;
      coordinates: number[][][];
    };
  }

  export interface ZoneRepInterface {
    id: string;
    name: string;
  }
}

export default CTypes;
