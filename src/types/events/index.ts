// We'll export all events from here as ET (Event Types) namespace:
//

import * as PaymentEvents from "./payment-evt.types";
import * as UserEvents from "./user-evt.types";
import * as OperatorEvents from "./operator-evt.types";
import * as TaskEvents from "./task-evt.types";
import * as OrganizationEvents from "./organization-evt.types";
import * as EmailEvents from "./email-evt.types";
import * as AvatarEvents from "./avatar-evt.types";
import * as AvatarInstanceEvents from "./avatar-instance-evt.types";

export namespace ET {
  // Avatar Events
  export import AvatarCreatedEvent = AvatarEvents.AvatarCreatedEvent;
  export import AvatarUpdatedEvent = AvatarEvents.AvatarUpdatedEvent;
  export import AvatarDeletedEvent = AvatarEvents.AvatarDeletedEvent;

  // Avatar Instance Events
  export import AvatarInstanceCreatedEvent = AvatarInstanceEvents.AvatarInstanceCreatedEvent;
  export import AvatarInstanceUpdatedEvent = AvatarInstanceEvents.AvatarInstanceUpdatedEvent;
  export import AvatarInstanceDeletedEvent = AvatarInstanceEvents.AvatarInstanceDeletedEvent;
  export import AvatarInstanceTerminatingEvent = AvatarInstanceEvents.AvatarInstanceTerminatingEvent;

  // Export individual events directly under ET
  export import OrganizationUpdatedEvent = OrganizationEvents.OrganizationUpdatedEvent;
  export import OrganizationCreatedEvent = OrganizationEvents.OrganizationCreatedEvent;
  export import OrganizationDeletedEvent = OrganizationEvents.OrganizationDeletedEvent;
  export import OrganizationMemberAddedEvent = OrganizationEvents.OrganizationMemberAddedEvent;
  export import OrganizationMemberRemovedEvent = OrganizationEvents.OrganizationMemberRemovedEvent;
  export import OrganizationMemberInvitedEvent = OrganizationEvents.OrganizationMemberInvitedEvent;
  export import OrganizationMemberInviteExpiredEvent = OrganizationEvents.OrganizationMemberInviteExpired;
  export import OrganizationMemberRoleUpdatedEvent = OrganizationEvents.OrganizationMemberRoleUpdated;

  export import PaymentCreatedEvent = PaymentEvents.PaymentCreatedEvent;
  export import PaymentUpdatedEvent = PaymentEvents.PaymentUpdatedEvent;
  export import PaymentDeletedEvent = PaymentEvents.PaymentDeletedEvent;

  export import UserRegisteredEvent = UserEvents.UserRegisteredEvent;
  export import UserCreatedEvent = UserEvents.UserCreatedEvent;
  export import UserUpdatedEvent = UserEvents.UserUpdatedEvent;
  export import UserDeletedEvent = UserEvents.UserDeletedEvent;
  export import UserStatusEvent = UserEvents.UserStatusEvent;
  export import UserRegistrationExpiredEvent = UserEvents.UserRegistrationExpiredEvent;
  export import UserLoggedInEvent = UserEvents.UserLoggedInEvent;
  export import UserLoggedOutEvent = UserEvents.UserLoggedOutEvent;
  export import UserRegistrationCompletedEvent = UserEvents.UserRegistrationCompletedEvent;
  export import UserPasswordForgottenEvent = UserEvents.UserPasswordForgottenEvent;
  export import UserMembershipInvitationEvent = UserEvents.UserMembershipInvitationEvent;
  export import UserRoleUpdatedEvent = UserEvents.UserRoleUpdatedEvent;

  export import TaskCreatedEvent = TaskEvents.TaskCreatedEvent;
  export import TaskUpdatedEvent = TaskEvents.TaskUpdatedEvent;
  export import TaskDeletedEvent = TaskEvents.TaskDeletedEvent;
  export import TaskGetRobotCandidateEvent = TaskEvents.TaskGetRobotCandidateEvent;
  export import TaskRobotAssignedEvent = TaskEvents.TaskRobotAssignedEvent;
  export import TaskRobotUnAssignedEvent = TaskEvents.TaskRobotUnAssignedEvent;
  export import TaskGetOperatorCandidateEvent = TaskEvents.TaskGetOperatorCandidateEvent;
  export import TaskAcceptedEvent = TaskEvents.TaskAcceptedEvent;
  export import TaskSimulationCreatedEvent = TaskEvents.TaskSimulationCreatedEvent;
  export import TaskAvatarCreatedEvent = TaskEvents.TaskAvatarCreatedEvent;

  export import EmailLinkResendRequestEvent = EmailEvents.EmailLinkResendRequestEvent;

  // Operator Events
  export import OperatorCreatedEvent = OperatorEvents.OperatorCreatedEvent;
  export import OperatorUpdatedEvent = OperatorEvents.OperatorUpdatedEvent;
  export import OperatorDeletedEvent = OperatorEvents.OperatorDeletedEvent;
  export import OperatorAssignedEvent = OperatorEvents.OperatorAssignedEvent;
  export import OperatorRequestedEvent = OperatorEvents.OperatorRequestedEvent;
}
