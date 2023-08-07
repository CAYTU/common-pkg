export enum Subjects {
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
  // Taks Subjects
  TaskCreated = "task:created",
  TaskUpdated = "task:updated",
  TaskDeleted = "task:deleted",
  TaskProposal = "task:proposal",
  TaskAccepted = "task:accepted",
  TaskExhausted = "task:exhausted",
  TaskExpired = "task:expired",
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
  UserMembershipInvitation = "user:membership:invitation",
  UserMembershipInvitationAccepted = "user:membership:invitation:accepted",
  UserMembershipInvitationRejected = "user:membership:invitation:rejected",
  // Zone Subjects
  ZoneCreated = "zone:created",
  ZoneUpdated = "zone:updated",
  ZoneDeleted = "zone:deleted",
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
  // Operators Subjects
  OperatorCreated = "operator:created",
  OperatorUpdated = "operator:updated",
  OperatorDeleted = "operator:deleted",
  OperatorAssigned = "operator:assigned",
  OperatorGetCandidate = "operator:get:candidate",
  OperatorUnassigned = "operator:unassigned",
  OperatorRequested = "operator:requested",
  // FCM Tokens
  RobotFcmTokenUpdated = "robot:fcmToken:updated",
  UserFCMTokenUpdated = "user:fcmToken:updated",

  // Task Type
  TaskSimulationCreated = "task:simulation:created",

  // Payment
  PaymentCreated = "payment:created",
  PaymentUpdated = "payment:updated",
  PaymentDeleted = "payment:deleted",
  PaymentRefunded = "payment:refunded",
  PaymentFailed = "payment:failed",
  PaymentSucceeded = "payment:succeeded",
  PaymentCaptured = "payment:captured",

  // Organization
  OrganizationCreated = "organization:created",
  OrganizationUpdated = "organization:updated",
  OrganizationDeleted = "organization:deleted",
  OrganizationMemberAdded = "organization:member:added",
  OrganizationMemberRemoved = "organization:member:removed",

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
  SubscriptionActivated = "subscription:activated",
  SubscriptionDeactivated = "subscription:deactivated",
  SubscriptionRenewed = "subscription:renewed",
  SubscriptionCanceled = "subscription:canceled",
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
}
