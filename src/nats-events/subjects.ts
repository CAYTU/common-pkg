export enum Subjects {
  // Avatar Subjects
  AvatarCreated = "avatar:created",
  AvatarUpdated = "avatar:updated",
  AvatarDeleted = "avatar:deleted",

  // Avatar Instances Subjects
  AvatarInstanceCreated = "avatar:instance:created",
  AvatarInstanceUpdated = "avatar:instance:updated",
  AvatarInstanceDeleted = "avatar:instance:deleted",
  AvatarInstanceTerminated = "avatar:instance:terminated",
  AvatarInstanceFailed = "avatar:instance:failed",
  AvatarInstanceTerminating = "avatar:instance:terminating",

  // Avatar Pool Subjects
  AvatarPoolCreated = "avatar:instance:created",
  AvatarPoolUpdated = "avatar:instance:updated",
  AvatarPoolDeleted = "avatar:instance:deleted",
  AvatarPoolTerminated = "avatar:instance:terminated",
  AvatarPoolFailed = "avatar:instance:failed",
  AvatarPoolTerminating = "avatar:instance:terminating",

  ProductCreated = "product:created",
  ProductUpdated = "product:updated",
  ProductDeleted = "product:deleted",
  // Customer Subjects
  CustomerCreated = "customer:created",
  CustomerUpdated = "customer:updated",
  CustomerDeleted = "customer:deleted",
  // Notification Subjects
  NotificationCreated = "notification:created",
  NotificationUpdated = "notification:updated",
  NotificationDeleted = "notification:deleted",
  NotifyUserIsVerified = "notify:user:is:verified",
  // Derived
  EmailLinkResendRequest = "email:link:resend:request",
  // Robot Subjects
  RobotCreated = "robot:created",
  RobotUpdated = "robot:updated",
  RobotDeleted = "robot:deleted",
  RobotAssigned = "robot:assigned",
  RobotGetCandidate = "robot:get:candidate",
  RobotUnassigned = "robot:unassigned",
  RobotIsOnline = "robot:is:online",
  RobotIsOffline = "robot:is:offline",

  // Should replace the robot subject
  DeviceCreated = "device:created",
  DeviceUpdated = "device:updated",
  DeviceDeleted = "device:deleted",
  DeviceAssigned = "device:assigned",
  DeviceGetCandidate = "device:get:candidate",
  DeviceUnassigned = "device:unassigned",
  DeviceIsOnline = "device:is:online",
  DeviceIsOffline = "device:is:offline",

  RoutineSendNotification = "routine:send:notification",
  IotDeviceOrchestratorAdd = "iot:device:orchestrator:add",
  IotDeviceOrchestratorUpdate = "iot:device:orchestrator:update",
  IotDeviceOrchestratorRemove = "iot:device:orchestrator:remove",
  IotDeviceOrchestratorStatus = "iot:device:orchestrator:status",

  RoutineCreated = "routine:created",
  RoutineUpdated = "routine:updated",
  RoutineDeleted = "routine:deleted",

  // Taks Subjects
  TaskCreated = "task:created",
  TaskUpdated = "task:updated",
  TaskDeleted = "task:deleted",
  TaskProposal = "task:proposal",
  TaskAccepted = "task:accepted",
  TaskExhausted = "task:exhausted",
  TaskUsage = "task:usage",
  TaskExpired = "task:expired",
  TaskRobotAssigned = "task:robot:assigned",
  TaskRobotUnassigned = "task:robot:unassigned",
  // User Subjects
  UserRegistered = "user:registered",
  UserRegistrationCompleted = "user:registration:completed",
  UserRegistrationExpired = "user:registration:expired",
  UserCreated = "user:created",
  UserUpdated = "user:updated",
  UserDeleted = "user:deleted",
  UserPasswordForgotten = "user:password:forgotten",
  UserPasswordReset = "user:password:reset",
  UserUpgraded = "user:upgraded",
  UserLogout = "user:logout",
  UserLogin = "user:login",
  UserStatus = "user:status",
  UserRoleUpdated = "user:role:updated",
  UserMembershipInvitation = "user:membership:invitation",
  UserMembershipInvitationAccepted = "user:membership:invitation:accepted",
  UserMembershipInvitationRejected = "user:membership:invitation:rejected",

  // Transient User
  TransientUserCreated = "transient:user:created",
  TransientUserUpdated = "transient:user:updated",
  TransientUserDeleted = "transient:user:deleted",

  // Zone Subjects
  ZoneCreated = "zone:created",
  ZoneUpdated = "zone:updated",
  ZoneDeleted = "zone:deleted",
  ZoneRequestCreateInitiate = "zone:request:create:initiate",
  ZoneRequestCreateDone = "zone:request:create:done",

  // Vendor Subjects
  VendorCreated = "vendor:created",
  VendorUpdated = "vendor:updated",
  VendorDeleted = "vendor:deleted",
  // Category Subjects
  CategoryCreated = "category:created",
  CategoryUpdated = "category:updated",
  CategoryDeleted = "category:deleted",
  // Simulation Subjects
  SimulationCreated = "simulation:created",
  SimulationUpdated = "simulation:updated",
  SimulationDeleted = "simulation:deleted",
  SimulationJobCreated = "simulationjob:created",
  SimulationJobUpdated = "simulationjob:updated",
  SimulationJobDeleted = "simulationjob:deleted",
  SimulationJobSendCreds = "simulationjob:send:creds",
  SimulationJobTerminating = "simulationjob:terminating",
  // Operators Subjects
  OperatorCreated = "operator:created",
  OperatorUpdated = "operator:updated",
  OperatorDeleted = "operator:deleted",
  OperatorAssigned = "operator:assigned",
  OperatorGetCandidate = "operator:get:candidate",
  OperatorUnassigned = "operator:unassigned",
  OperatorRequest = "operator:request",
  OperatorStatusUpdated = "operator:status:updated",
  OperatorRequestStatusUpdated = "operator:request:status:updated",

  // FCM Tokens
  RobotFcmTokenUpdated = "robot:fcmToken:updated",
  UserFCMTokenUpdated = "user:fcmToken:updated",

  // Task Type
  TaskSimulationCreated = "task:simulation:created",
  TaskSimulationTerminated = "task:simulation:terminated",
  TaskAvatarCreated = "task:avatar:created",
  TaskAvatarTerminated = "task:avatar:terminated",
  TaskAvatarPoolCreated = "task:avatar:created",
  TaskAvatarPoolTerminated = "task:avatar:terminated",

  // Payment
  PaymentCreated = "payment:created",
  PaymentUpdated = "payment:updated",
  PaymentDeleted = "payment:deleted",
  PaymentRefunded = "payment:refunded",
  PaymentFailed = "payment:failed",
  PaymentSucceeded = "payment:succeeded",
  PaymentCaptured = "payment:captured",
  PaymentScheduled = "payment:scheduled",
  PaymentScheduledDateReached = "payment:scheduled:date:reached",

  // Organization
  OrganizationCreated = "organization:created",
  OrganizationUpdated = "organization:updated",
  OrganizationDeleted = "organization:deleted",
  OrganizationCreditUpdated = "organization:credit:updated",
  OrganizationMemberInvited = "organization:member:invited",
  OrganizationMemberInviteExpired = "organization:member:invite:expired",
  OrganizationMemberAdded = "organization:member:added",
  OrganizationMemberRemoved = "organization:member:removed",
  OrganizationMemberRoleUpdated = "organization:member:role:updated",
  OrganizationMemberStatusUpdated = "organization:member:status:updated",
  OrganizationMemberInviteCanceled = "organization:member:invite:canceled",
  OrganizationMemberInviteAccepted = "organization:member:invite:accepted",
  OrganizationMemberInviteRejected = "organization:member:invite:rejected",
  OrganizationMemberInviteResend = "organization:member:invite:resend",
  OrganizationCreditConsumed = "organization:credit:consumed",
  OrganizationCreditFinished = "organization:credit:finished",
  OrganizationCreditThresholdReached = "organization:credit:threshold:reached",
  // Estimation credit
  OrganizationCreditEstimationThresholdReached = "organization:credit:estimation:threshold:reached",
  OrganizationCreditEstimationFinished = "organization:credit:estimation:finished",
  OrganizationEnabledTaskType = "organization:enabled:task:type",

  // Order Subjects
  OrderCreated = "order:created",
  OrderUpdated = "order:updated",
  OrderDeleted = "order:deleted",

  // Plan subjects
  PlanCreated = "plan:created",
  PlanUpdated = "plan:updated",
  PlanDeleted = "plan:deleted",

  // Plan features
  PlanFeatureCreated = "plan:feature:created",
  PlanFeatureUpdated = "plan:feature:updated",
  PlanFeatureDeleted = "plan:feature:deleted",

  // Billing
  BillingCreated = "billing:created",
  BillingUpdated = "billing:updated",
  BillingDeleted = "billing:deleted",
  BillingPaymentMethodCreated = "billing:payment:method:create",
  BillingPaymentMethodUpdated = "billing:payment:method:update",

  // Subscription
  SubscriptionCreated = "subscription:created",
  SubscriptionUpdated = "subscription:updated",
  SubscriptionDeleted = "subscription:deleted",
  SubscriptionChangeRequest = "subscription:change:request",
  SubscriptionActivated = "subscription:activated",
  SubscriptionDeactivated = "subscription:deactivated",
  SubscriptionRenewed = "subscription:renewed",
  SubscriptionCancelled = "subscription:cancelled",
  SubscriptionPaymentFailed = "subscription:payment:failed",
  SubscriptionPaymentSucceeded = "subscription:payment:succeeded",
  SubscriptionPaymentCaptured = "subscription:payment:captured",
  SubscriptionPaymentRefunded = "subscription:payment:refunded",

  // Invoice
  InvoiceCreated = "invoice:created",
  InvoiceUpdated = "invoice:updated",
  InvoiceDeleted = "invoice:deleted",

  // Settings
  SettingsCreated = "settings:created",
  SettingsUpdated = "settings:updated",
  SettingsDeleted = "settings:deleted",

  // URL Shortener Expiration
  UrlExpirationCreated = "url:expiration:created",
  UrlExpirationUpdated = "url:expiration:updated",
  UrlExpirationDeleted = "url:expiration:deleted",

  // Usage Subjects
  UsageCreated = "usage:created",
  UsageUpdated = "usage:updated",
  UsageDeleted = "usage:deleted",
  UsageStarted = "usage:started",
  UsageEnded = "usage:ended",
  UsageFailed = "usage:failed",
  UsageRecorded = "usage:recorded",
}
