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
  UserStatuses,
  Point,
  Services,
  UserMembershipStatus,
} from "../utils";

declare namespace CTypes {
  /**
   * Common properties for objects stored in MongoDB with extended data.
   */
  export interface IMongooseObjectExt {
    updatedAt?: Date; // Date when the object was last updated. (Optional)
    createdAt?: Date; // Date when the object was created. (Optional)
  }

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

  /************************
   * Represents a customer.
   **********************/
  export interface CustomerInterface extends IMongooseObjectExt {
    /**
     * The unique identifier of the associated user.
     */
    user: Types.ObjectId;

    /**
     * The loyalty points of the customer. (Optional)
     */
    loyaltyPoint?: number;

    /**
     * The wallet balance of the customer. (Optional)
     */
    wallet?: number;
  }

  /*********************************************
   * CustomerRepInterface: This is the interface for the customer replica
   * It is used to duplicate the customer model in the database of other services
   *******************************************/
  export interface CustomerRepInterface extends IMongooseObjectExt {
    /**
     * Unique identifier for the customer.
     */
    id: string;

    /**
     * The unique identifier of the associated user.
     */
    user: Types.ObjectId;
  }

  /**
   * Represents an event related to a customer.
   */
  export interface CustomerEventInterface {
    /**
     * Unique identifier for the event.
     */
    id: string;

    /**
     * The unique identifier of the associated user.
     */
    user: Types.ObjectId;

    /**
     * The version number of the event.
     */
    version: number;
  }

  /******************************************************************
   * Notification Interface:
   * This is the interface for the notification model in the database.
   * It is used to store notifications that are sent to users.
   *****************************************************************/
  export interface NotificationInterface extends IMongooseObjectExt {
    /**
     * The title of the notification.
     */
    title: string;

    /**
     * The service associated with the notification.
     */
    service: Services;

    /**
     * The main content or body of the notification.
     */
    body: string;

    /**
     * Indicates whether the notification has been read. (Optional)
     */
    isRead?: boolean;

    /**
     * The unique identifier of the user associated with this notification. (Optional)
     */
    user?: Types.ObjectId;

    /**
     * An array of user roles relevant to the notification. (Optional)
     */
    batchRoles?: UserRole[];

    /**
     * Indicates whether an email should be included with the notification. (Optional)
     */
    includeMail?: boolean;

    /**
     * An array of unique identifiers for participants related to the notification. (Optional)
     */
    participants?: Types.ObjectId[];
  }

  /***************************
   * NotificationRepInterface: This is the interface for the notification replica
   **************************/
  export interface NotificationRepInterface {
    /**
     * Unique identifier for the notification.
     */
    id: string;

    /**
     * The title of the notification.
     */
    title: string;

    /**
     * The service associated with the notification.
     */
    service: Services;

    /**
     * The main content or body of the notification.
     */
    body: string;

    /**
     * Indicates whether the notification has been read. (Optional)
     */
    isRead?: boolean;

    /**
     * The unique identifier of the user associated with this notification. (Optional)
     */
    user?: Types.ObjectId;

    /**
     * An array of user roles relevant to the notification. (Optional)
     */
    batchRoles?: UserRole[];

    /**
     * Indicates whether an email should be included with the notification. (Optional)
     */
    includeMail?: boolean;

    /**
     * An array of unique identifiers for participants related to the notification. (Optional)
     */
    participant?: Types.ObjectId[];
  }

  /**
   * Type representing different identity document types.
   */
  export type IDType = "id" | "passport";

  /**
   * Represents an operator.
   */
  export interface OperatorInterface extends IMongooseObjectExt {
    /**
     * The type of identity document used by the operator.
     */
    identityType: IDType;

    /**
     * The path to the operator's identity photo.
     */
    identityPhoto: string;

    /**
     * The operator's identity number. (Optional)
     */
    identityNumber?: string;

    /**
     * The unique identifier of the associated user.
     */
    user: Types.ObjectId;

    /**
     * Indicates whether the operator is active. (Optional)
     */
    active?: boolean;

    /**
     * The number of tasks assigned to the operator. (Optional)
     */
    taskCount?: number;

    /**
     * The status of the operator. (Optional)
     */
    status?: OperatorStatus;

    /**
     * The wallet associated with the operator. (Optional)
     */
    wallet?: Types.ObjectId;

    /**
     * A brief description about the operator. (Optional)
     */
    aboutMe?: string;

    /**
     * The unique identifier of the operator's current task. (Optional)
     */
    currentTask?: Types.ObjectId;
  }

  /**
   * Represents a simplified view of an operator.
   */
  export interface OperatorRepInterface extends IMongooseObjectExt {
    /**
     * Unique identifier for the operator.
     */
    id: string;

    /**
     * The unique identifier of the associated user.
     */
    user: Types.ObjectId;

    /**
     * Indicates whether the operator is active. (Optional)
     */
    active?: boolean;

    /**
     * The unique identifier of the operator's current task. (Optional)
     */
    currentTask?: Types.ObjectId;

    /**
     * The status of the operator. (Optional)
     */
    status?: OperatorStatus;

    /**
     * The wallet associated with the operator. (Optional)
     */
    wallet?: Types.ObjectId;
  }

  /**
   * Represents an event related to an operator.
   */
  export interface OperatorEventInterface {
    /**
     * Unique identifier for the event.
     */
    id: string;

    /**
     * The unique identifier of the associated user.
     */
    user: Types.ObjectId;

    /**
     * Indicates whether the operator is active. (Optional)
     */
    active?: boolean;

    /**
     * The unique identifier of the operator's current task. (Optional)
     */
    currentTask?: Types.ObjectId;

    /**
     * The status of the operator. (Optional)
     */
    status?: OperatorStatus;

    /**
     * The wallet associated with the operator. (Optional)
     */
    wallet?: Types.ObjectId;

    /**
     * The version number of the event.
     */
    version: number;
  }

  /**
   * Represents an event where an operator's identity is requested.
   */
  export interface OperatorRequestedEventInterface {
    /**
     * The type of identity document requested.
     */
    identityType: IDType;

    /**
     * The path to the requested identity photo.
     */
    identityPhoto: string;

    /**
     * The requested identity number. (Optional)
     */
    identityNumber?: string;

    /**
     * The unique identifier of the associated user.
     */
    user: Types.ObjectId;

    /**
     * A brief description about the operator. (Optional)
     */
    aboutMe?: string;
  }

  /**
   * Organization:
   * It is used to group users together in an organization (e.g. a company)
   */
  export interface OrganizationInterface extends IMongooseObjectExt {
    name: string;
    domain: string;
    description?: string;
    image?: string;
    country?: string;
    members?: Types.ObjectId[];
    subscriptionType?: SubscriptionType;
  }

  export interface OrganizationRepInterface extends IMongooseObjectExt {
    id: string;
    domain: string;
    name: string;
    image?: string;
  }

  export interface OrganizationEventInterface {
    id: string;
    name: string;
    domain: string;
    image?: string;
    version: number;
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
   * Setting:
   * This is used to store the settings of the application
   */
  export interface SettingInterface extends IMongooseObjectExt {
    name: string;
    value: string;
    description?: string;
  }

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
    taskId?: string;
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
    region: string;
    endpoint: string;
    thing: string;
    simulation: Types.ObjectId;
    state?: SimulationJobState;
    user?: Types.ObjectId;
    runningAt?: Date;
    completedAt?: Date;
    duration?: number;
  }

  export interface SimulationJobRepInterface extends IMongooseObjectExt {
    id: string;
    jobId: string;
    taskId?: string;
    jobName: string;
    simulationId: string;
    endpoint: string;
    thing: string;
    state?: SimulationJobState;
    user?: Types.ObjectId;
  }

  export interface SimulationJobEventInterface extends IMongooseObjectExt {
    id: string;
    jobId: string;
    taskId?: string;
    jobName: string;
    simulationId: string;
    endpoint: string;
    thing: string;
    state?: SimulationJobState;
    user?: Types.ObjectId;
    duration?: number;
    runningAt?: Date;
    completedAt?: Date;
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
    name?: string;
    cleaningOf?: string;
    description?: string;
    area?: mongoose.Schema.Types.Polygon;
    zone?: Types.ObjectId;
  }

  export interface TaskInspectionInterface extends IMongooseObjectExt {
    name?: string;
    description?: string;
    // Inspection Attrs
    itinerary: ItineraryType;
  }

  export interface TaskSimulationInterface extends IMongooseObjectExt {
    jobId?: string;
    jobName?: string;
    state?: SimulationJobState;
    simulationId?: string;
    thing?: string;
  }

  export interface TaskSurveyInterface extends IMongooseObjectExt {
    name: string;
    description?: string;
    area?: mongoose.Schema.Types.Polygon;
    zone?: Types.ObjectId;
  }

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
    simulationJob?: Types.ObjectId;
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
    membershipStatus?: UserMembershipStatus;
    status?: UserStatuses;
    overallRating?: number;
    overallTimeUsed?: number;
    overallTaskCount?: number;
    position?: mongoose.Schema.Types.Point & Point;
    organization?: Types.ObjectId;
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
    organization?: Types.ObjectId;
    oauthType?: OauthType;
    membershipStatus?: UserMembershipStatus;
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
    membershipStatus?: UserMembershipStatus;
    organization?: Types.ObjectId;
    oauthType?: OauthType;
    subscriptionType?: SubscriptionType;
    isOnline?: boolean;
    isCompleted?: boolean;
    // In case an operator is being requested too
    identityType?: IDType;
    identityPhoto?: string;
    identityNumber?: string;

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
