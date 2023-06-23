import GeoJSON from "mongoose-geojson-schema";
import mongoose, { Types } from "mongoose";
import {
  OauthType,
  OperatorStatus,
  PaymentMethod,
  PaymentStatus,
  SubscriptionType,
  RoboticPlatform,
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
    loyaltyPoint?: number;
    wallet?: number;
  }

  export interface CustomerRepInterface extends IMongooseObjectExt {
    id: string;
    user: Types.ObjectId;
  }

  export interface CustomerEventInterface {
    id: string;
    user: Types.ObjectId;
    version: number;
  }

  /**
   * Notification
   */

  export interface NotificationInterface extends IMongooseObjectExt {
    user: Types.ObjectId;
    title: string;
    body: string;
    read?: boolean;
  }

  export interface NotificationRepInterface extends IMongooseObjectExt {
    id: string;
    user: Types.ObjectId;
    title: string;
    body: string;
    read?: boolean;
  }

  /**
   * Operator:
   */
  export type IDType = "id" | "passport";

  export interface OperatorInterface extends IMongooseObjectExt {
    identityType: IDType;
    identityPhoto: string;
    identityNumber?: string;
    user: Types.ObjectId;
    active?: boolean;
    taskCount?: number;
    status?: OperatorStatus;
    wallet?: Types.ObjectId;
    aboutMe?: string;
    currentTask?: Types.ObjectId;
  }

  export interface OperatorRepInterface extends IMongooseObjectExt {
    id: string;
    user: Types.ObjectId;
    active?: boolean;
    currentTask?: Types.ObjectId;
    status?: OperatorStatus;
    wallet?: Types.ObjectId;
  }

  export interface OperatorEventInterface {
    id: string;
    user: Types.ObjectId;
    active?: boolean;
    currentTask?: Types.ObjectId;
    status?: OperatorStatus;
    wallet?: Types.ObjectId;
    version: number;
  }

  export interface OperatorRequestedEventInterface {
    identityType: IDType;
    identityPhoto: string;
    identityNumber?: string;
    user: Types.ObjectId;
    aboutMe?: string;
  }

  /**
   * Payment
   */
  export interface PaymentInterface extends IMongooseObjectExt {
    // Ref to Customer Model
    customer: Types.ObjectId;
    accountId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    transactionId?: string;
    paymentMethod?: PaymentMethod; // Can be "card" or "wallet"
    isSubscribed?: boolean;
    description?: string;
    subscriptionPlan?: SubscriptionType; // Can be "monthly" or "yearly"
  }

  export interface PaymentRepInterface extends IMongooseObjectExt {
    id: string;
    // Ref to Customer Model
    customer: Types.ObjectId;
    status: PaymentStatus;
    description?: string;
    subscriptionPlan?: SubscriptionType; // Can be "monthly" or "yearly"
  }

  export interface PaymentEventInterface extends PaymentRepInterface {
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

  export interface RobotMetaDataInterface extends IMongooseObjectExt {
    robot: Types.ObjectId;
    batteryLevel?: number;
    speed?: number;
    controlMode?: string | number;
    faultCode?: number | string;
    currentTask?: Types.ObjectId;
    linearVelocity?: number;
    angularVelocity?: number;
    position?: {
      lng: number;
      lat: number;
    };
    data?: any;
  }

  export interface RobotStateTrackerInterface extends IMongooseObjectExt {
    unavailable?: Date;
    running?: Date;
    faile?: Date;
    available?: Date;
  }

  // You can generate doc like this for an interface
  // export interface RobotInterface extends IMongooseObjectExt {
  // ...
  // }
  // Then run this command: npx ts-json-schema-generator --path "src/types/models/index.ts" --type RobotInterface --tsconfig "tsconfig.json" --jsDoc "extended"
  // Then copy the generated schema and paste it here
  // Then you can use it in the model like this:
  // const RobotSchema = new Schema<CTypes.RobotInterface>(RobotSchemaJSON);

  // However, it would best practice to separate the
  // the model into two models: AwsRobot and FreedomRobot or
  // create a base model and extend it to AwsRobot and FreedomRobot
  // models. This is because the two models have different attributes
  // and it would be hard to maintain the code if we use one model
  // for both of them.
  export interface RobotBaseInterface extends IMongooseObjectExt {
    name: string;
    type: string;
    platform?: RoboticPlatform;
    platformRobotId: Types.ObjectId;
    image: string;
    privateToken?: string; // This is the token that is used to authenticate the robot in the backend
    fcmToken?: string;
    isOnline?: boolean;
    state?: RobotStates;    
    taskCount?: number;
    assignedTaskCount?: number;
    zone?: Types.ObjectId;
    lastRecordedLocation?: mongoose.Schema.Types.Point & Point;
    currentTask?: Types.ObjectId;
    // Time Tracker
    stateTracker?: Types.ObjectId;
  }

  export interface AwsRobotInterface {
    // If platform is "aws-iot"
    accessKeyId?: string;
    secretAccessKey?: string;
    sessionToken?: string;
    region?: string;
    endpoint?: string;
    thing?: string;
  }

  export interface FreedomRobotInterface {
    // If platform is "freedom-robotics"
    secret?: string;
    accountId?: string;
    deviceId?: string;
    privateToken?: string; // This is the token that is used to authenticate the robot in the backend
  }

  export interface RobotRepInterface extends IMongooseObjectExt {
    id: string;
    name: string;
    platform?: RoboticPlatform;
    type: string;
    image: string;
    fcmToken?: string;
    lastRecordedLocation?: mongoose.Schema.Types.Point & Point;
  }

  export interface RobotEventInterface {
    id: string;
    name: string;
    type: string;
    platform?: RoboticPlatform;
    image: string;
    fcmToken?: string;
    lastRecordedLocation?: mongoose.Schema.Types.Point & Point;
    version: number;
  }

  /**
   * Task:
   *
   */

  export type ItineraryType = {
    start: mongoose.Schema.Types.Point & Point;
    end: mongoose.Schema.Types.Point & Point;
  };

  /**
   * Simulation:
   */

  export interface SimulationCategoryInterface extends IMongooseObjectExt {
    value: string;
    displayName: string;
  }

  export interface SimulationRegionInterface
    extends SimulationCategoryInterface {}

  export interface SimulationJobQueueInterface
    extends SimulationCategoryInterface {}

  export interface SimulationJobDefinitionInterface
    extends SimulationCategoryInterface {}

  export interface SimulationRoleInterface
    extends SimulationCategoryInterface {}

  export interface SimulationTemplateURLInterface
    extends SimulationCategoryInterface {}

  export interface SimulationInterface extends IMongooseObjectExt {
    name: string;
    image?: string;
    description?: string;
    jobDefinition: string;
    jobQueue: string;
    templateURL: string;
    role: string;
    region: string;
  }

  export interface SimulationRepInterface extends IMongooseObjectExt {
    id: string;
    name: string;
    image?: string;
    description?: string;
    jobDefinition: string;
    jobQueue: string;
    templateURL: string;
    role: string;
    region: string;
  }

  export interface SimulationEventInterface extends IMongooseObjectExt {
    id: string;
    name: string;
    image?: string;
    description?: string;
    jobDefinition: string;
    jobQueue: string;
    templateURL: string;
    role: string;
    region: string;
    version: number;
  }

  export interface SimulationJobInterface extends IMongooseObjectExt {
    jobId: string;
    jobName: string;
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
    region: string;
    endpoint: string;
    thing: string;
    simulation: Types.ObjectId;
    state?: SimulationJobState;
    operator?: Types.ObjectId;
    duration?: number;
  }

  export interface SimulationJobRepInterface extends IMongooseObjectExt {
    id: string;
    jobId: string;
    jobName: string;
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
    region: string;
    endpoint: string;
    thing: string;
    state?: SimulationJobState;
    operator?: Types.ObjectId;
  }

  export interface SimulationJobEventInterface extends IMongooseObjectExt {
    id: string;
    jobId: string;
    jobName: string;
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
    region: string;
    endpoint: string;
    thing: string;
    state?: SimulationJobState;
    operator?: Types.ObjectId;
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
    cleaningOf?: string;
    description?: string;
    area: mongoose.Schema.Types.Polygon;
  }

  export interface TaskInspectionInterface extends IMongooseObjectExt {
    name?: string;
    description?: string;
    // Inspection Attrs
    itinerary: ItineraryType;
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
    duration?: number;
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
    phone?: string;
    email: string;
    isVerified?: boolean;
    isCompleted?: boolean;
    fcmToken?: string;
    password: string;
    image?: string;
    roles: UserRole[];
    oauthType?: OauthType;
    position?: mongoose.Schema.Types.Point & Point;
    subscriptionType?: SubscriptionType;
    isOnline?: boolean;
  }

  export interface UserRepInterface extends IMongooseObjectExt {
    id: string;
    username: string;
    firstName: string;
    email: string;
    image?: string;
    roles?: UserRole[];
    lastName: string;
    fcmToken?: string;
    isVerified?: boolean;
    subscriptionType?: SubscriptionType;
    isOnline?: boolean;
    isCompleted?: boolean;
  }

  export interface UserEventInterface {
    id: string;
    username: string;
    firstName: string;
    email: string;
    image?: string;
    lastName: string;
    roles?: UserRole[];
    fcmToken?: string;
    isVerified?: boolean;
    subscriptionType?: SubscriptionType;
    isOnline?: boolean;
    isCompleted?: boolean;
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
    country?: string;
    name: string;
    surface?: number;
    area: mongoose.Schema.Types.Polygon;
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
