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
  OrganizationType,
  RobotType,
  RobotCategory,
} from "../utils";

declare namespace CTypes {
  /**
   * Common properties for objects stored in MongoDB with extended data.
   */
  /**
   * Represents an object with extended properties typically used in Mongoose models.
   */
  export interface IMongooseObjectExt {
    /**
     * The date when the object was last updated (optional).
     */
    updatedAt?: Date;

    /**
     * The date when the object was created (optional).
     */
    createdAt?: Date;
  }

  /**
   * Represents a category object.
   */
  export interface CategoryInterface {
    /**
     * The name of the category.
     */
    name: string;

    /**
     * The URL or path to the image associated with the category.
     */
    image: string;

    /**
     * An optional description of the category.
     */
    description?: string;
  }

  /**
   * Represents a simplified category object for representation purposes.
   */
  export interface CategoryRepInterface extends IMongooseObjectExt {
    /**
     * The unique identifier of the category.
     */
    id: string;

    /**
     * The name of the category.
     */
    name: string;

    /**
     * The URL or path to the image associated with the category.
     */
    image: string;
  }

  /**
   * Represents a category object for events with additional information.
   */
  export interface CategoryEventInterface {
    /**
     * The unique identifier of the category.
     */
    id: string;

    /**
     * The name of the category.
     */
    name: string;

    /**
     * The URL or path to the image associated with the category.
     */
    image: string;

    /**
     * The version number of the category event.
     */
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
  /**
   * Represents an organization object with extended properties.
   */
  export interface OrganizationInterface extends IMongooseObjectExt {
    /**
     * The name of the organization.
     */
    name: string;

    /**
     * The domain associated with the organization.
     */
    domain: string;

    /**
     * An optional description of the organization.
     */
    description?: string;

    /**
     * The URL or path to the image associated with the organization (optional).
     */
    image?: string;

    /**
     * The country where the organization is located (optional).
     */
    country?: string;

    /**
     * Array of task types allowed for the organization (optional).
     */
    allowedTaskTypes?: TaskType[];

    /**
     * An array of user IDs representing the members of the organization (optional).
     */
    members?: Types.ObjectId[];

    /**
     * The type of organization (optional).
     * @remarks This property is used to differentiate between different types of organizations.
     * For example, one can be a principal organization while another can be a subsidiary.
     */
    type?: OrganizationType;

    /**
     * The type of subscription the organization has (optional).
     */
    subscriptionType?: SubscriptionType;
  }

  /**
   * Represents a simplified organization object for representation purposes.
   */
  export interface OrganizationRepInterface extends IMongooseObjectExt {
    /**
     * The unique identifier of the organization.
     */
    id: string;

    /**
     * The domain associated with the organization.
     */
    domain: string;

    /**
     * The name of the organization.
     */
    name: string;

    /**
     * Array of task types allowed for the organization (optional).
     */
    allowedTaskTypes?: TaskType[];

    /**
     * The type of organization (optional).
     */
    type?: OrganizationType;

    /**
     * The URL or path to the image associated with the organization (optional).
     */
    image?: string;
  }

  /**
   * Represents an organization object for events with additional information.
   */
  export interface OrganizationEventInterface {
    /**
     * The unique identifier of the organization.
     */
    id: string;

    /**
     * The name of the organization.
     */
    name: string;

    /**
     * Array of task types allowed for the organization (optional).
     */
    allowedTaskTypes?: TaskType[];

    /**
     * The domain associated with the organization.
     */
    domain: string;

    /**
     * The type of organization (optional).
     */
    type?: OrganizationType;

    /**
     * The URL or path to the image associated with the organization (optional).
     */
    image?: string;

    /**
     * The version number of the organization event.
     */
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

  /**
   * Represents metadata associated with a robot.
   */
  export interface RobotMetaDataInterface extends IMongooseObjectExt {
    /**
     * The unique identifier of the robot.
     */
    robot: Types.ObjectId;

    /**
     * The battery level of the robot (optional).
     */
    batteryLevel?: number;

    /**
     * The speed of the robot (optional).
     */
    speed?: number;

    /**
     * The control mode of the robot, which can be a string or number (optional).
     */
    controlMode?: string | number;

    /**
     * The fault code indicating any issues with the robot (optional).
     */
    faultCode?: number | string;

    /**
     * The unique identifier of the current task assigned to the robot (optional).
     */
    currentTask?: Types.ObjectId;

    /**
     * The linear velocity of the robot (optional).
     */
    linearVelocity?: number;

    /**
     * The angular velocity of the robot (optional).
     */
    angularVelocity?: number;

    /**
     * The geographical position of the robot, specified by longitude and latitude (optional).
     */
    position?: {
      lng: number;
      lat: number;
    };

    /**
     * Additional data associated with the robot (optional).
     */
    data?: any;
  }

  /**
   * Represents a state tracker for a robot, indicating its availability and status.
   */
  export interface RobotStateTrackerInterface extends IMongooseObjectExt {
    /**
     * The date and time when the robot is marked as unavailable (optional).
     */
    unavailable?: Date;

    /**
     * The date and time when the robot is in a running state (optional).
     */
    running?: Date;

    /**
     * The date and time when the robot has failed (optional).
     */
    failed?: Date;

    /**
     * The date and time when the robot is marked as available (optional).
     */
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
  /**
   * Represents the base information for a robot.
   */
  export interface RobotBaseInterface extends IMongooseObjectExt {
    /**
     * The name of the robot.
     */
    name: string;

    /**
     * The type of the robot.
     */
    type?: RobotType;

    /**
     * The category of the robot
     */
    category?: RobotCategory;

    /**
     * The platform on which the robot operates (optional).
     */
    platform?: RoboticPlatform;

    /**
     * The unique identifier for the robot on its platform.
     */
    platformRobotId: Types.ObjectId;

    /**
     * The URL or path to the image associated with the robot.
     */
    image: string;

    /**
     * The private token used to authenticate the robot in the backend (optional).
     */
    privateToken?: string;

    /**
     * The Firebase Cloud Messaging (FCM) token associated with the robot (optional).
     */
    fcmToken?: string;

    /**
     * Indicates whether the robot is currently online (optional).
     */
    isOnline?: boolean;

    /**
     * The current state of the robot.
     */
    state?: RobotStates;

    /**
     * The total count of tasks associated with the robot (optional).
     */
    taskCount?: number;

    /**
     * The count of tasks currently assigned to the robot (optional).
     */
    assignedTaskCount?: number;

    /**
     * The zone to which the robot belongs (optional).
     */
    zone?: Types.ObjectId;

    /**
     * The last recorded geographical location of the robot (optional).
     */
    lastRecordedLocation?: mongoose.Schema.Types.Point & Point;

    /**
     * The unique identifier of the current task assigned to the robot (optional).
     */
    currentTask?: Types.ObjectId;

    /**
     * The unique identifier of the state tracker associated with the robot (optional).
     */
    stateTracker?: Types.ObjectId;
  }

  /**
   * Represents AWS-specific configuration for a robot.
   */
  export interface AwsRobotInterface {
    /**
     * The AWS Stack name for the robot (optional).
     * if cloudFormation was used to create the robot, this is the stack name
     */
    stackName?: string;

    /**
     * The Stack ID for the robot (optional).
     * In case of stack creation, this is the stack ID
     */
    stackId?: string;

    /**
     * The AWS access key ID for authenticating with AWS services (optional).
     */
    accessKeyId?: string;

    /**
     * The AWS secret access key for authenticating with AWS services (optional).
     */
    secretAccessKey?: string;

    /**
     * The session token for temporary AWS credentials (optional).
     */
    sessionToken?: string;

    /**
     * The AWS region where the robot is deployed (optional).
     */
    region?: string;

    /**
     * The AWS IoT endpoint for the robot (optional).
     */
    endpoint?: string;

    /**
     * The Channel Name for the robot (optional).
     * This is used for AWS IoT Core
     */
    channelName?: string;

    /**
     * The name of the AWS IoT thing associated with the robot (optional).
     */
    thing?: string;
  }

  /**
   * Represents Freedom Robotics-specific configuration for a robot.
   */
  export interface FreedomRobotInterface {
    /**
     * The secret key used for authentication with Freedom Robotics (optional).
     */
    secret?: string;

    /**
     * The account ID associated with the robot on the Freedom Robotics platform (optional).
     */
    accountId?: string;

    /**
     * The unique device ID for the robot on the Freedom Robotics platform (optional).
     */
    deviceId?: string;

    /**
     * The private token used to authenticate the robot in the backend (optional).
     */
    privateToken?: string;
  }

  /**
   * Represents a simplified robot object for representation purposes.
   */
  export interface RobotRepInterface extends IMongooseObjectExt {
    /**
     * The unique identifier of the robot.
     */
    id: string;

    /**
     * The name of the robot.
     */
    name: string;

    /**
     * The platform on which the robot operates (optional).
     */
    platform?: RoboticPlatform;

    /**
     * The type of the robot.
     */
    type?: RobotType;

    /**
     * The URL or path to the image associated with the robot.
     */
    image: string;

    /**
     * The Firebase Cloud Messaging (FCM) token associated with the robot (optional).
     */
    fcmToken?: string;

    /**
     * The last recorded geographical location of the robot (optional).
     */
    lastRecordedLocation?: mongoose.Schema.Types.Point & Point;
  }

  /**
   * Represents a robot object for events with additional information.
   */
  export interface RobotEventInterface {
    /**
     * The unique identifier of the robot.
     */
    id: string;

    /**
     * The name of the robot.
     */
    name: string;

    /**
     * The type of the robot.
     */
    type?: RobotType;

    /**
     * The platform on which the robot operates (optional).
     */
    platform?: RoboticPlatform;

    /**
     * The URL or path to the image associated with the robot.
     */
    image: string;

    /**
     * The Firebase Cloud Messaging (FCM) token associated with the robot (optional).
     */
    fcmToken?: string;

    /**
     * The last recorded geographical location of the robot (optional).
     */
    lastRecordedLocation?: mongoose.Schema.Types.Point & Point;

    /**
     * The version number of the robot event.
     */
    version: number;
  }

  /**
   * Represents an itinerary type used for defining start and end points.
   */
  export type ItineraryType = {
    /**
     * The geographical point representing the start of the itinerary.
     */
    start: mongoose.Schema.Types.Point & Point;

    /**
     * The geographical point representing the end of the itinerary.
     */
    end: mongoose.Schema.Types.Point & Point;
  };

  /**
   * Represents a setting used to store application configurations.
   * @remarks This interface is used to store various settings for the application.
   */
  export interface SettingInterface extends IMongooseObjectExt {
    /**
     * The name of the setting.
     */
    name: string;

    /**
     * The value associated with the setting.
     */
    value: string;

    /**
     * An optional description of the setting.
     */
    description?: string;
  }

  /**
   * Represents a category for simulation-related data.
   */
  export interface SimulationCategoryInterface extends IMongooseObjectExt {
    /**
     * The value of the simulation category.
     */
    value: string;

    /**
     * The display name for the simulation category.
     */
    displayName: string;
  }

  /**
   * Represents a category for simulation regions.
   * @remarks This interface is used to define simulation regions for virtual environments.
   */
  export interface SimulationRegionInterface
    extends SimulationCategoryInterface {}

  /**
   * Represents a category for simulation job queues.
   * @remarks This interface is used to define job queues for simulation tasks.
   */
  export interface SimulationJobQueueInterface
    extends SimulationCategoryInterface {}

  /**
   * Represents a category for simulation job definitions.
   * @remarks This interface is used to define job definitions for simulation tasks.
   */
  export interface SimulationJobDefinitionInterface
    extends SimulationCategoryInterface {}

  /**
   * Represents a category for simulation roles.
   * @remarks This interface is used to define roles for simulation users or entities.
   */
  export interface SimulationRoleInterface
    extends SimulationCategoryInterface {}

  /**
   * Represents a category for simulation template URLs.
   * @remarks This interface is used to define URLs for simulation templates.
   */
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

  /**
   * Represents the interface for a simulation representation.
   * @interface
   */
  export interface SimulationRepInterface extends IMongooseObjectExt {
    /** The ID of the simulation. */
    id: string;
    /** The name of the simulation. */
    name: string;
    /** The image of the simulation. */
    image?: string;
    /** The description of the simulation. */
    description?: string;
    /** The job definition of the simulation. */
    jobDefinition: string;
    /** The job queue of the simulation. */
    jobQueue: string;
    /** The template URL of the simulation. */
    templateURL: string;
    /** The role of the simulation. */
    role: string;
    /** The region of the simulation. */
    region: string;
  }

  /**
   * Interface for a simulation event object.
   * @interface
   */
  export interface SimulationEventInterface extends IMongooseObjectExt {
    /** The unique identifier for the simulation event. */
    id: string;
    /** The name of the simulation event. */
    name: string;
    /** The URL of the image associated with the simulation event. */
    image?: string;
    /** A description of the simulation event. */
    description?: string;
    /** The job definition for the simulation event. */
    jobDefinition: string;
    /** The job queue for the simulation event. */
    jobQueue: string;
    /** The URL of the simulation event template. */
    templateURL: string;
    /** The role associated with the simulation event. */
    role: string;
    /** The region associated with the simulation event. */
    region: string;
    /** The version number of the simulation event. */
    version: number;
  }

  /**
   * Interface for a simulation job.
   * @interface
   */
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

  /**
   * Interface representing a Task Delivery.
   */
  export interface TaskDeliveryInterface extends IMongooseObjectExt {
    /**
     * Reference to a Product.
     */
    product?: Types.ObjectId;

    /**
     * Reference to a Vendor.
     */
    vendor?: Types.ObjectId;

    /**
     * Delivery Attributes
     */
    itinerary: ItineraryType;
  }

  /**
   * Interface representing a Task Cleaning.
   */
  export interface TaskCleaningInterface extends IMongooseObjectExt {
    /**
     * Cleaning Attributes
     */
    name?: string;

    /**
     * Cleaning Type
     */
    cleaningOf?: string;

    /**
     * Description of the cleaning task.
     */
    description?: string;

    /**
     * Area to be cleaned (as a polygon).
     */
    area?: mongoose.Schema.Types.Polygon;

    /**
     * Zone reference for the cleaning task.
     */
    zone?: Types.ObjectId;
  }

  /**
   * Interface representing a Task Inspection.
   */
  export interface TaskInspectionInterface extends IMongooseObjectExt {
    /**
     * Name of the inspection task.
     */
    name?: string;

    /**
     * Description of the inspection task.
     */
    description?: string;

    /**
     * Inspection Attributes
     */
    itinerary: ItineraryType;
  }

  /**
   * Interface representing a Task Simulation.
   */
  export interface TaskSimulationInterface extends IMongooseObjectExt {
    /**
     * ID of the associated job.
     */
    jobId?: string;

    /**
     * Name of the associated job.
     */
    jobName?: string;

    /**
     * State of the simulation job.
     */
    state?: SimulationJobState;

    /**
     * ID of the associated simulation.
     */
    simulationId?: string;

    /**
     * Thing related to the simulation.
     */
    thing?: string;
  }

  /**
   * Interface representing a Task Survey.
   */
  export interface TaskSurveyInterface extends IMongooseObjectExt {
    /**
     * Name of the survey task.
     */
    name: string;

    /**
     * Description of the survey task.
     */
    description?: string;

    /**
     * Area to be surveyed (as a polygon).
     */
    area?: mongoose.Schema.Types.Polygon;

    /**
     * Zone reference for the survey task.
     */
    zone?: Types.ObjectId;
  }

  /**
   * Interface representing a Task Custom.
   */
  export interface TaskCustomInterface extends IMongooseObjectExt {}

  /**
   * Interface representing a Task Status Tracker.
   */
  export interface TaskStatusTracker extends IMongooseObjectExt {
    /**
     * Timestamp when the task was accepted.
     */
    acceptedAt?: Date;

    /**
     * Timestamp when the task started running.
     */
    runningAt?: Date;

    /**
     * Timestamp when the task arrived.
     */
    arrivedAt?: Date;

    /**
     * Timestamp when the task was in processing state.
     */
    processingAt?: Date;

    /**
     * Timestamp when the task was cancelled.
     */
    cancelledAt?: Date;

    /**
     * Timestamp when the task payment failed.
     */
    paymentFailedAt?: Date;

    /**
     * Timestamp when the task was refunded.
     */
    refundedAt?: Date;

    /**
     * Timestamp when the task was completed.
     */
    completedAt?: Date;
  }

  /**
   * Interface representing a Task.
   */
  export interface TaskInterface extends IMongooseObjectExt {
    /**
     * Type of the task.
     */
    type: TaskType;

    /**
     * Fare associated with the task.
     */
    fare?: number;

    /**
     * Code to deactivate or open the robot.
     */
    code?: number;

    /**
     * Count ID for the number of tasks with padded numbers.
     */
    taskId: string;

    /**
     * Reference to an Operator model.
     */
    operator?: Types.ObjectId;

    /**
     * Reference to a Customer model.
     */
    customer?: Types.ObjectId;

    /**
     * Reference to a Robot model.
     */
    robot?: Types.ObjectId;

    /**
     * Status of the task.
     */
    status?: TaskStatus;

    /**
     * Reference to a Task Status Tracker.
     * This is used to track the status of the task.
     */
    statusTracker?: Types.ObjectId;

    /**
     * Duration of the task.
     */
    duration?: number;

    /**
     * Number of assignment trial for a robot.
     */
    robotAssignmentTrial?: number;

    /**
     * Indicates whether the task has failed.
     */
    hasFailed?: boolean;

    /**
     * Tells why the task failed.
     */
    failureReason?: string;

    /**
     * Number of times the task has failed.
     */
    failureCount?: number;

    /**
     * Reference to a Delivery task.
     */
    delivery?: Types.ObjectId;

    /**
     * Reference to a Cleaning task.
     */
    cleaning?: Types.ObjectId;

    /**
     * Reference to a Simulation for the selected job.
     */
    simulationId?: Types.ObjectId;

    /**
     * Reference to a Simulation job task.
     */
    simulationJob?: Types.ObjectId;

    /**
     * Reference to an Inspection task.
     */
    inspection?: Types.ObjectId;

    /**
     * Reference to a Survey task.
     */
    survey?: Types.ObjectId;

    /**
     * Reference to a Custom task.
     */
    custom?: Types.ObjectId;
  }

  /**
   * Interface representing a Task Rep.
   */
  export interface TaskRepInterface extends IMongooseObjectExt {
    /**
     * ID of the task.
     */
    id: string;

    /**
     * Type of the task.
     */
    type: TaskType;

    /**
     * Fare associated with the task.
     */
    fare: number;

    /**
     * Code to deactivate or open the robot.
     * This is only used when the task is a delivery task.
     */
    code?: number;

    /**
     * Count ID for the number of tasks with padded numbers.
     */
    taskId: string;

    /**
     * Status of the task.
     */
    status: TaskStatus;

    /**
     * Reference to a Robot model.
     */
    robot?: Types.ObjectId;

    /**
     * Reference to an Operator model.
     */
    operator?: Types.ObjectId;

    /**
     * Reference to a Customer model.
     */
    customer: Types.ObjectId;
  }

  /**
   * Interface representing a Task Event.
   */
  export interface TaskEventInterface {
    /**
     * ID of the task.
     */
    id: string;

    /**
     * Type of the task.
     */
    type: TaskType;

    /**
     * Fare associated with the task.
     */
    fare: number;

    /**
     * Code to deactivate or open the robot.
     * This is only used when the task is a delivery task.
     */
    code?: number;

    /**
     * Count ID for the number of tasks with padded numbers.
     */
    taskId: string;

    /**
     * Status of the task.
     */
    status: TaskStatus;

    /**
     * Reference to a Robot model.
     */
    robot?: Types.ObjectId;

    /**
     * Reference to an Operator model.
     */
    operator?: Types.ObjectId;

    /**
     * Reference to a Customer model.
     */
    customer: Types.ObjectId;

    /**
     * Version number of the task.
     */
    version: number;
  }

  /**
   * Interface representing a Task Get Robot Candidate Event.
   */
  export interface TaskGetRobotCandidateEventInterface {
    /**
     * ID of the task.
     */
    id: string;

    /**
     * Type of the task.
     */
    type: TaskType;

    /**
     * Count ID for the number of tasks with padded numbers.
     */
    taskId: string;

    /**
     * Version number of the task.
     */
    version: number;
  }

  /**
   * User:
   */

  /**
   * Represents a user object with extended properties.
   */
  export interface UserInterface extends IMongooseObjectExt {
    /**
     * The username of the user.
     */
    username: string;

    /**
     * The first name of the user.
     */
    firstName: string;

    /**
     * The last name of the user.
     */
    lastName: string;

    /**
     * The phone number of the user (optional).
     */
    phone?: string;

    /**
     * The email address of the user.
     */
    email: string;

    /**
     * Indicates if the user's account is verified (optional).
     */
    isVerified?: boolean;

    /**
     * Indicates if the user's profile is completed (optional).
     */
    isCompleted?: boolean;

    /**
     * The Firebase Cloud Messaging (FCM) token of the user (optional).
     */
    fcmToken?: string;

    /**
     * The password of the user.
     */
    password: string;

    /**
     * The URL of the user's profile image (optional).
     */
    image?: string;

    /**
     * An array of user roles.
     */
    roles: UserRole[];

    /**
     * Array of user's allowed task types (optional).
     */
    allowedTaskTypes?: TaskType[] | string[];

    /**
     * The type of OAuth authentication used by the user (optional).
     */
    oauthType?: OauthType;

    /**
     * The membership status of the user (optional).
     */
    membershipStatus?: UserMembershipStatus;

    /**
     * The status of the user.
     */
    status?: UserStatuses;

    /**
     * The overall rating of the user (optional).
     */
    overallRating?: number;

    /**
     * The total time used by the user (optional).
     */
    overallTimeUsed?: number;

    /**
     * The total count of tasks completed by the user (optional).
     */
    overallTaskCount?: number;

    /**
     * The geographical position of the user (optional).
     */
    position?: mongoose.Schema.Types.Point & Point;

    /**
     * The organization to which the user belongs (optional).
     */
    organization?: Types.ObjectId;

    /**
     * The type of subscription the user has (optional).
     */
    subscriptionType?: SubscriptionType;

    /**
     * Indicates whether the user is currently online (optional).
     */
    isOnline?: boolean;
  }

  /**
   * Represents a simplified user object for representation purposes.
   */
  export interface UserRepInterface extends IMongooseObjectExt {
    /**
     * The unique identifier of the user.
     */
    id: string;

    /**
     * The username of the user.
     */
    username: string;

    /**
     * The first name of the user.
     */
    firstName: string;

    /**
     * The email address of the user.
     */
    email: string;

    /**
     * The URL of the user's profile image (optional).
     */
    image?: string;

    /**
     * An array of user roles (optional).
     */
    roles?: UserRole[];

    /**
     * Array of user's allowed task types (optional).
     */
    allowedTaskTypes?: TaskType[] | string[];

    /**
     * The last name of the user.
     */
    lastName: string;

    /**
     * The Firebase Cloud Messaging (FCM) token of the user (optional).
     */
    fcmToken?: string;

    /**
     * The organization to which the user belongs (optional).
     */
    organization?: Types.ObjectId;

    /**
     * The type of OAuth authentication used by the user (optional).
     */
    oauthType?: OauthType;

    /**
     * The membership status of the user (optional).
     */
    membershipStatus?: UserMembershipStatus;

    /**
     * Indicates if the user's account is verified (optional).
     */
    isVerified?: boolean;

    /**
     * The type of subscription the user has (optional).
     */
    subscriptionType?: SubscriptionType;

    /**
     * Indicates whether the user is currently online (optional).
     */
    isOnline?: boolean;

    /**
     * Indicates if the user's profile is completed (optional).
     */
    isCompleted?: boolean;
  }

  /**
   * Represents a user object for events with additional information.
   */
  export interface UserEventInterface {
    /**
     * The unique identifier of the user.
     */
    id: string;

    /**
     * The username of the user.
     */
    username: string;

    /**
     * The first name of the user.
     */
    firstName: string;

    /**
     * The email address of the user.
     */
    email: string;

    /**
     * The URL of the user's profile image (optional).
     */
    image?: string;

    /**
     * The last name of the user.
     */
    lastName: string;

    /**
     * An array of user roles (optional).
     */
    roles?: UserRole[];

    /**
     * Array of user's allowed task types (optional).
     */
    allowedTaskTypes?: TaskType[] | string[];

    /**
     * The Firebase Cloud Messaging (FCM) token of the user (optional).
     */
    fcmToken?: string;

    /**
     * Indicates if the user's account is verified (optional).
     */
    isVerified?: boolean;

    /**
     * The membership status of the user (optional).
     */
    membershipStatus?: UserMembershipStatus;

    /**
     * The organization to which the user belongs (optional).
     */
    organization?: Types.ObjectId;

    /**
     * The type of OAuth authentication used by the user (optional).
     */
    oauthType?: OauthType;

    /**
     * The type of subscription the user has (optional).
     */
    subscriptionType?: SubscriptionType;

    /**
     * Indicates whether the user is currently online (optional).
     */
    isOnline?: boolean;

    /**
     * Indicates if the user's profile is completed (optional).
     */
    isCompleted?: boolean;

    /**
     * The type of identity document being requested (optional).
     */
    identityType?: IDType;

    /**
     * The URL of the user's identity document photo (optional).
     */
    identityPhoto?: string;

    /**
     * The identity number associated with the user (optional).
     */
    identityNumber?: string;

    /**
     * The version number of the user event.
     */
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
   * Represents an area with a name and a location.
   */
  export interface Area {
    /**
     * The name of the area.
     */
    name: string;
    /**
     * The location of the area, represented as a nested array of coordinates.
     */
    location: [[[number, number]]];
  }

  /**
   * Zone:
   */

  /**
   * Interface representing a geographic zone.
   * @interface
   */
  export interface ZoneInterface extends IMongooseObjectExt {
    /** The region of the zone. */
    region?: string;
    /** The country of the zone. */
    country?: string;
    /** The name of the zone. */
    name: string;
    /** The surface of the zone. */
    surface?: number;
    /** The area of the zone. */
    area: Area;
  }

  /**
   * Represents a zone object with additional properties.
   * @interface
   */
  export interface ZoneRepInterface extends IMongooseObjectExt {
    /** The unique identifier for the zone. */
    id: string;
    /** The name of the zone. */
    name: string;
    /** Only use the location property */
    location: [[[number, number]]];
    /** The country that the zone belongs to. */
    country?: string;
  }

  /**
   * Represents a zone event.
   */
  export interface ZoneEventInterface {
    /**
     * The unique identifier of the zone event.
     */
    id: string;

    /**
     * The name of the zone event.
     */
    name: string;

    /**
     * Only use the location property if the zone event is a polygon.
     */
    location: [[[number, number]]];

    /**
     * The country where the zone event takes place.
     */
    country?: string;

    /**
     * The version of the zone event.
     */
    version: number;
  }
}

export default CTypes;
