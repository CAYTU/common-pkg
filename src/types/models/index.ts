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
  Services,
  UserMembershipStatus,
  OrganizationType,
  RobotType,
  RobotCategory,
  SubscriptionTier,
  ItineraryType,
  OrderStatus,
  TelepresenceType,
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
     * The unique identifier of the service reference associated with the notification. (Optional)
     */
    serviceRefId?: string;

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
     * A unique identifier of the organization to which the notification is sent. (Optional)
     */
    organizationId?: Types.ObjectId;

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
   * Represents an operator.
   */
  export type IdentityType = "nationalId" | "passport" | "driverLicense";

  export interface OperatorInterface extends IMongooseObjectExt {
    /**
     * The type of identity document used by the operator.
     */
    identityType?: IdentityType;

    /**
     * The path to the operator's identity photo.
     */
    identityPhoto?: string;

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
     * Indicates whether the operator is public. (Optional)
     */
    isPublic?: boolean;

    /**
     * The unique identifier of the operator's current task. (Optional)
     */
    currentTask?: Types.ObjectId;
  }

  /**
   * Represents an event where an operator's identity is requested.
   */

  export interface OperatorRequestedEventInterface {
    /**
     * The type of identity document requested.
     */
    identityType?: IdentityType;

    /**
     * The path to the requested identity photo.
     */
    identityPhoto?: string;

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
   * Transient user:
   * Represents users who are not registered in the system but have access to some features.
   */
  export interface TransientUserInterface extends IMongooseObjectExt {
    /**
     * The email address of the transient user.
     */
    email: string;

    /**
     * First name of the transient user.
     */
    firstName?: string;

    /**
     * Last name of the transient user.
     */
    lastName?: string;

    /**
     * Full name of the transient user (in case the first and last names are not provided).
     */
    fullName?: string;

    /**
     * Address of the transient user.
     */
    address?: string;
  }

  /**
   * Product Interface:
   * Defines the structure of a product model
   */
  export interface ProductInterface extends IMongooseObjectExt {
    /**
     * Name of the product
     */
    name: string;

    /**
     * Description of the product (optional)
     */
    description?: string;

    /**
     * Price of the product
     */
    price: number;

    /**
     * Keywords associated with the product (optional)
     */
    keywords?: string[];

    /**
     * Image URL of the product (optional)
     */
    imageUrl?: string;

    /**
     * Organization to which the product belongs (optional)
     */
    organizationId?: Types.ObjectId;

    /**
     * Category to which the product belongs (optional)
     */
    category?: string;

    /**
     * Tags associated with the product (optional)
     */
    tags?: string[];

    /**
     * Options associated with the product (optional)
     * Must be an array of objects with dynamic properties
     */
    options?: any[];
    /**
     * Stock quantity of the product (optional)
     */
    stock?: number;
  }

  /**
   * Order:
   * A model to save user's orders
   */
  export interface OrderInterface extends IMongooseObjectExt {
    /**
     * The first name of the user who placed the order.
     */
    firstName?: string;

    /**
     * The last name of the user who placed the order.
     */
    lastName?: string;

    /**
     * The email of the user who placed the order.
     */
    email?: string;

    /**
     * The unique identifier of the product in the order.
     */
    products?: {
      productId: Types.ObjectId;

      /**
       * The amount of the product in the order.
       */
      quantity: number;
      /**
       * The options associated with the order.
       */
      options?: any[];
    }[];

    /**
     * The deviceId (if any) associated with the order.
     * Can be a robot
     */
    deviceId?: Types.ObjectId;

    /**
     * The total amount of the order.
     */
    totalAmount: number;

    /**
     * Discount applied to the order.
     * in percentage
     */
    discount?: number;

    /**
     * The status of the order.
     */
    status: OrderStatus;
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
    domain?: string;

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
     * The state where the organization is located (optional).
     */
    state?: string;

    /**
     * The city where the organization is located (optional).
     */
    city?: string;

    /**
     * The address of the organization (optional).
     */
    address?: string;

    /**
     * Array of task types allowed for the organization (optional).
     */
    defaultAllowedTaskTypes?: TaskType[];

    /**
     * The number of members in the organization (optional).
     */
    membersCount?: number;

    /**
     * The maximum number of members allowed in the organization (optional).
     */
    memberLimitReached?: boolean;

    /**
     * The unique identifier of the owner of the organization (optional).
     */
    owner?: Types.ObjectId;

    /**
     * The type of organization (optional).
     * @remarks This property is used to differentiate between different types of organizations.
     * For example, one can be a principal organization while another can be a subsidiary.
     */
    type?: OrganizationType;
  }

  /**
   * Represents an organization membership object with extended properties.
   */
  interface OrganizationMemberInterface extends IMongooseObjectExt {
    /**
     * The email of the user. Use for invitation.
     */
    email: string;

    /**
     * The unique identifier of the organization to which the user is invited.
     */
    organizationId: string;

    /**
     * The role of the user in the organization.
     */
    rolesInOrganization: UserRole[];

    /**
     * The type of tasks the user is allowed to execute within the organization
     */
    allowedTasksInOrganization: TaskType[];

    /**
     * The status of the membership.
     */
    status: UserMembershipStatus;

    /**
     * The unique identifier of the user. Populated when the user accepts the invitation.
     */
    user?: Types.ObjectId;
  }

  /**
   * Payment
   */
  export interface PaymentInterface extends IMongooseObjectExt {
    /**
     * The unique identifier of the user making the payment.
     * The organization is already known from the user.
     */
    user?: Types.ObjectId;

    /**
     * The id of the order for which the payment is made.
     */
    orderId?: Types.ObjectId;

    /**
     * If payment is not from a user who is registered in the system
     * then the user must be a transient user.
     */
    transientUser?: Types.ObjectId;

    /**
     * The amount of the payment.
     */
    amount?: number;

    /**
     * The currency of the payment.
     */
    currency?: string;

    /**
     * The status of the payment.
     */
    status?: PaymentStatus;

    /**
     * The method of payment.
     */
    paymentMethod?: PaymentMethod; // Can be "card" or "wallet"

    /**
     * Whether the user is subscribed to a plan or not.
     */
    isSubscribed?: boolean;

    /**
     * A description of the payment (optional).
     */
    description?: string;

    /**
     * If the payment is from stripe, this is the stripe payment intent id.
     */
    stripeId?: Types.ObjectId;

    /**
     * The type of subscription the user has (optional).
     */
    subscriptionType?: SubscriptionType;

    /**
     * The tier of subscription the user has (optional).
     */
    subscriptionTier?: SubscriptionTier;

    /**
     * A boolean to tell if the user wants a
     * change of plan
     */
    requestSubscriptionChange?: boolean;

    /**
     * Organization to which the payment is made to. (optional)
     * Let's say a customer is paying for a service for which the device that
     * was used belongs to an organization, then the payment is made to the organization
     */
    organizationId?: Types.ObjectId;

    /**
     * The type of subscription the user wants to change to
     */
    subscriptionChangeType?: SubscriptionType;

    /**
     *  The tier of subscription the user wants to change to
     */
    subscriptionChangeTier?: SubscriptionTier;
  }

  /**
   * Robot:
   */

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
    type: RobotType;

    /**
     * The category of the robot
     */
    category: RobotCategory;

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
    image?: string;

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
     * The organization where the robot belongs.
     */
    organizationId?: Types.ObjectId;

    /**
     * Indicates whether the robot is public.
     */
    public?: boolean;

    /**
     * The organizations with which the robot is shared.
     */
    sharedWith?: Types.ObjectId[];

    /**
     * The last recorded geographical location of the robot (optional).
     */
    lastRecordedLocation?: {
      lng: number;
      lat: number;
    };

    /**
     * The unique identifier of the current task assigned to the robot (optional).
     */
    currentTask?: Types.ObjectId;

    /**
     * The unique identifier of the state tracker associated with the robot (optional).
     */
    stateTracker?: {
      currentStatus: RobotStates;
      startedAt: Date;
    };
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
     * The organization to which the setting belongs (optional).
     */
    organizationId?: Types.ObjectId;

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
    /**
     * Name of the simulation.
     */
    name: string;

    /**
     * The image of the simulation.
     */
    image?: string;

    /**
     * Description of the simulation.
     */
    description?: string;

    /**
     * The ID of the organization where the simulation belongs.
     */
    organizationId: Types.ObjectId;

    /**
     * Indicates whether the simulation is public.
     */
    public?: boolean;

    /**
     * The organizations with which the simulation is shared.
     */
    sharedWith?: Types.ObjectId[];

    /**
     * The job definition of the simulation.
     * @desc A job definition is a blueprint for a job that
     * specifies parameters for jobs that run on AWS Batch.
     */
    jobDefinition: string;

    /**
     * The job queue of the simulation.
     * @desc A job queue is a collection of jobs with the same job priority.
     */
    jobQueue: string;

    /**
     * The template URL of the simulation.
     * @desc The URL of the simulation template.
     */
    templateURL: string;

    /**
     * The role of the simulation.
     * @desc The role associated with the simulation.
     */
    role: string;

    /**
     * The region of the simulation.
     * @desc The region where the simulation is located.
     */
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
    /**
     * The organization where the simulation job belongs.
     */
    organizationId?: Types.ObjectId;

    /**
     * Indicates whether the simulation job is public.
     */
    public?: boolean;

    /**
     * The organizations with which the simulation job is shared.
     */
    sharedWith?: Types.ObjectId[];
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

  export type DeliveryType = "indoor" | "outdoor";

  /**
   * Interface representing a Task Delivery.
   */
  export interface TaskDeliveryInterface extends IMongooseObjectExt {
    /**
     * Reference to the order.
     */
    order?: Types.ObjectId;

    deliveryType?: DeliveryType;

    /**
     * Delivery Attributes
     */
    itinerary?: {
      from: {
        lat: number;
        lng: number;
      };
      to: {
        lat: number;
        lng: number;
      };
    };
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

    /**
     * Choose a mission for the flight task.
     */
    mission?: Types.ObjectId;
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
   * Interface representing a Task Flight.
   */
  export interface TaskFlightInterface extends IMongooseObjectExt {
    /**
     * Name of the flight task.
     */
    name: string;

    /**
     * Description of the flight task.
     */
    description?: string;

    /**
     * Choose a mission for the flight task.
     */
    mission?: Types.ObjectId;
  }

  /**
   * Interface representing a Telepresence Task
   */
  export interface TaskTelepresenceInterface extends IMongooseObjectExt {
    /**
     * Name of the telepresence task.
     */
    name: string;

    /**
     * Connection link for the telepresence task.
     */
    connectionLink?: string;

    /**
     * Description of the telepresence task.
     */
    description?: string;

    type: TelepresenceType;

    /**
     * Video data
     */
    videoData?: {
      url: string;
      duration: number;
    };

    /**
     * Shop data
     */
    shopData?: {
      shopId?: string;
      shopName?: string;
      discount?: number;
      paymentLink?: string;
    };

    /**
     * Sub-Task that can be performed by the robot
     */
    subTasks?: Types.ObjectId[];
  }

  export interface MissionInterface extends IMongooseObjectExt {
    /**
     * Name of the mission. Must be unique.
     */
    reference: string;
    /**
     * Type of the mission.
     */
    type: ItineraryType;

    /**
     * Extra mission configuration.
     */
    configuration?: any;

    /**
     * Mission data
     */
    missionData?: any;

    /**
     * The organization where the mission belongs.
     */
    organizationId?: Types.ObjectId;

    /**
     * Indicates whether the mission is public.
     */
    public?: boolean;

    /**
     * The organizations with which the mission is shared.
     */
    sharedWith?: Types.ObjectId[];
  }

  /**
   * Interface representing a Task Custom.
   */
  export interface TaskCustomInterface extends IMongooseObjectExt {}

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
    statusTracker?: {
      currentStatus: TaskStatus;
      startedAt: Date;
    };

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
     * The organization where the task belong.
     */
    organizationId?: Types.ObjectId;

    /**
     * Indicates whether the task is public.
     */
    public?: boolean;

    /**
     * The organizations with which the task is shared.
     */
    sharedWith?: Types.ObjectId[];

    /**
     * Reference to an Inspection task.
     */
    inspection?: Types.ObjectId;

    /**
     * Reference to a Flight task.
     */
    flight?: Types.ObjectId;

    /**
     * Reference to a Telepresence task.
     */
    telepresence?: Types.ObjectId;

    /**
     * Reference to a Custom task.
     */
    custom?: Types.ObjectId;
  }

  /**
   * URL SHORTENER INTERFACE
   */
  export interface UrlShortenerInterface extends IMongooseObjectExt {
    /**
     * The original URL.
     */
    longUrl: string;

    /**
     * The short appended unique identifier.
     */
    shortKey: string;

    /**
     * The domain associated with the URL.
     */
    domain?: string;

    /**
     *  Indicates whether the URL is permanent.
     */
    permanent?: boolean;

    /**
     * The duration of the URL. (in days)
     */
    duration?: number;
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
    position?: [number, number];

    /**
     * The organization to which the user belongs (optional).
     */
    ownedOrganizationId?: Types.ObjectId;

    /**
     * The current organization that the user is connected to (optional).
     */
    currentOrganizationId?: Types.ObjectId;

    /**
     * Roles in the organization.
     */
    rolesInOrganization?: {
      organizationId: Types.ObjectId;
      roles: UserRole[];
      allowedTaskTypes?: TaskType[] | string[];
    }[];

    /**
     * The payment object associated with the user (optional).
     */
    paymentId?: Types.ObjectId;

    /**
     * Indicates whether the user is currently online (optional).
     */
    isOnline?: boolean;
  }

  /**
   * Interface representing a geographic zone.
   * @interface
   */
  export interface ZoneInterface extends IMongooseObjectExt {
    /** The region of the zone. */
    region?: string;

    /** The country of the zone. */
    country?: string;

    /** extra tags for the zone - can be used for filtering */
    tags?: string[];

    /** The name of the zone. */
    name: string;

    /**
     * Type of itinerary or shape drawn in the map
     * could be a line, area or point
     */
    type: ItineraryType;

    /** The surface of the zone if it's an area. */
    surface?: number;

    /** The distance of the zone if it's a line. */
    distance?: number;

    /**
     * The organization where the zone belongs.
     */
    organizationId?: Types.ObjectId;

    /**
     * Indicates whether the zone is public.
     */
    public?: boolean;

    /**
     * The organizations with which the zone is shared.
     */
    sharedWith?: Types.ObjectId[];

    /**
     * The geographical position of the zone,
     * specified by longitude and latitude (optional).
     */
    zoneCenter?: [number, number];

    /**
     * Based on the type of the zone, the location can be an Area or way points,
     * or a Point.
     */
    location: mongoose.Schema.Types.Mixed;
  }
}

export default CTypes;
