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
    name: string;
    image: string;
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
    name: string;
    type: string;
    image: string;
    position: CoordinateType;
  }

  /**
   * Task:
   *
   */
  export type TaskStatusType = "pending" | "running" | "completed" | "failed";
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
    zone?: Types.ObjectId;
    status: TaskStatusType;
    description?: string;
  }

  export interface TaskRepInterface {
    name: string;
    type: TaskType;
    fare: number;
    robot?: Types.ObjectId;
    status: TaskStatusType;
    description?: string;
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
  }

  export interface UserRepInterface {
    username: string;
    firstName: string;
    lastName: string;
    image: string;
  }

  /**
   * Vendor:
   */
  export interface VendorInterface {
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

  export interface VendorRepInterface {
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
    name: string;
  }
}

export default CTypes;
