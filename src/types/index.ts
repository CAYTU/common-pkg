import { Document, Types } from "mongoose";

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
    id: string;
    name: string;
    image: string;
    description?: string;
    version: number;
  }

  /**
   * Operator:
   */
  export type IDType = "id" | "passport";

  export interface OperatorInterface {
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

  /**
   * Product:
   */
  export interface ProductInterface {
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

  /**
   * Robot:
   */
  export interface RobotInterface {
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
  export type TaskType = "delivery" | "non-delivery";

  export interface TaskInterface {
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
    matchPwd: (pwd: string) => Promise<boolean>;
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

  /**
   * Zone:
   */

  export interface ZoneInterface {
    id: string;
    name: string;
    location: {
      type: string;
      coordinates: number[][][];
    };
    version: number;
  }
}

export default CTypes;
