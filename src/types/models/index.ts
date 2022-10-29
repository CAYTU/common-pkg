import { Types } from "mongoose";
import { RobotStates, TaskStatus, TaskType, UserRole } from "../utils";

declare namespace CTypes {
  // Some common types:
  //--------------------
  // Coordinate type for an object coupling both latitude & longitude

  // Please if any modification happens in this files then make
  // sure to do it in the event-types as well: "src/event-types/index.ts"

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
    state?: RobotStates;
    taskCount?: number;
    assignedTaskCount?: number;
    vendor?: Types.ObjectId;
    zone?: Types.ObjectId;
    currentTask?: Types.ObjectId;
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

  export interface UserInterface {
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    image?: string;
    roles?: UserRole[];
    zone?: Types.ObjectId;
  }

  export interface UserRepInterface {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
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
