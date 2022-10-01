import { Document, Types } from "mongoose";

declare namespace CTypes {
  // Some common types:
  //--------------------
  // Coordinate type for an object coupling both latitude & longitude
  export type CoordinateType = {
    latitude: number;
    longitude: number;
  };

  // Type for itinerary where we have start & end point as Coordinates
  export type ItineraryType = {
    start: CoordinateType;
    end: CoordinateType;
  };

  /**
   * Category:
   */
  export interface CategoryInterface {
    name: string;
    image: string;
    description?: string;
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
    version: number;
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
    version: number;
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
    version: number;
    findByEvent: (event: {
      id: string;
      version: number;
    }) => Promise<Document<RobotInterface> | null>;
  }

  /**
   * Task:
   *
   */
  export type TaskStatusType = "pending" | "running" | "completed" | "failed";
  export type ExecutionDomainType = "area" | "itinerary" | "points";
  export type TaskType = "delivery" | "non-delivery";

  export interface TaskInterface {
    name: string;
    type: TaskType;
    fare: number;
    //   Ref to product Model
    product?: Types.ObjectId;
    //   Ref to Operator Model
    operator?: Types.ObjectId;
    //   Ref to User Model
    vendor?: Types.ObjectId;
    //   Ref to Customer Model
    customer?: Types.ObjectId;
    //   Ref to Robot Model
    robot?: Types.ObjectId;
    execDomain: ExecutionDomainType;
    itinerary?: ItineraryType;
    zone?: Types.ObjectId;
    points?: CoordinateType[];
    status: TaskStatusType;
    description?: string;
    version: number;
    findByEvent: (event: {
      id: string;
      version: number;
    }) => Promise<Document<TaskInterface> | null>;
  }

  /**
   * User:
   */
  export type RoleType = "create" | "edit" | "readOnly" | "delete" | "all";

  export interface UserInterface {
    username: string;
    zone: Types.ObjectId;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    image: string;
    roles: RoleType[];
    version: number;
    matchPwd: (pwd: string) => Promise<boolean>;
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

  /**
   * Zone:
   */
  export type popDensityType = "free" | "dayToDay" | "crowded" | "busted";
  export type terrainDominationType = "sandy" | "bumpy" | "flat" | "road";
  export type securityLevelType = "green" | "yellow" | "red";

  export interface ZoneInterface {
    name: string;
    coordinates: CoordinateType[];
    popDensity: popDensityType;
    terrainDomination: terrainDominationType;
    securityLevel: securityLevelType;
    version: number;
  }
}

export default CTypes;
