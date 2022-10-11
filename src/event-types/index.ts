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
  export type TaskStatusType = "pending" | "running" | "completed" | "failed";
  export type TaskType = "delivery" | "non-delivery";

  export interface TaskEventInterface {
    id: string;
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
    zone?: Types.ObjectId;
    status: TaskStatusType;
    description?: string;
    version: number;
  }

  export interface TaskRepEventInterface {
    id: string;
    name: string;
    type: TaskType;
    fare: number;
    robot?: Types.ObjectId;
    status: TaskStatusType;
    description?: string;
    version: number;
  }

  /**
   * User:
   */
  export type RoleType = "create" | "edit" | "readOnly" | "delete" | "all";

  export interface UserEventInterface {
    id: string;
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

  export interface ZoneRepInterface {
    id: string;
    name: string;
  }
}

export default ETypes;
