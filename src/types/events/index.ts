// We'll export all events from here as ET (Event Types) namespace:
//

import * as PaymentEvents from "../../billings/events/payment-evt.types";
import * as UserEvents from "./user-evt.types";
import * as OperatorEvents from "./operator-evt.types";
import * as EmailEvents from "./email-evt.types";
import * as AvatarEvents from "./avatar-evt.types";
import * as AvatarInstanceEvents from "./avatar-instance-evt.types";
import * as ZoneEvents from "./zone-evt.types";
import * as SubscriptionEvents from "../../billings/events/subscription-evt.types";

export namespace ET {
  // Avatar Events
  export import AvatarCreatedEvent = AvatarEvents.AvatarCreatedEvent;
  export import AvatarUpdatedEvent = AvatarEvents.AvatarUpdatedEvent;
  export import AvatarDeletedEvent = AvatarEvents.AvatarDeletedEvent;

  // Avatar Instance Events
  export import AvatarInstanceCreatedEvent = AvatarInstanceEvents.AvatarInstanceCreatedEvent;
  export import AvatarInstanceUpdatedEvent = AvatarInstanceEvents.AvatarInstanceUpdatedEvent;
  export import AvatarInstanceDeletedEvent = AvatarInstanceEvents.AvatarInstanceDeletedEvent;
  export import AvatarInstanceTerminatedEvent = AvatarInstanceEvents.AvatarInstanceTerminatedEvent;
  export import AvatarInstanceFailedEvent = AvatarInstanceEvents.AvatarInstanceFailedEvent;
  export import AvatarInstanceTerminatingEvent = AvatarInstanceEvents.AvatarInstanceTerminatingEvent;

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

  export import EmailLinkResendRequestEvent = EmailEvents.EmailLinkResendRequestEvent;

  // Operator Events
  export import OperatorCreatedEvent = OperatorEvents.OperatorCreatedEvent;
  export import OperatorUpdatedEvent = OperatorEvents.OperatorUpdatedEvent;
  export import OperatorDeletedEvent = OperatorEvents.OperatorDeletedEvent;
  export import OperatorAssignedEvent = OperatorEvents.OperatorAssignedEvent;
  export import OperatorRequestedEvent = OperatorEvents.OperatorRequestedEvent;

  // Zone Events
  export import ZoneCreatedEvent = ZoneEvents.ZoneCreatedEvent;
  export import ZoneUpdatedEvent = ZoneEvents.ZoneUpdatedEvent;
  export import ZoneDeletedEvent = ZoneEvents.ZoneDeletedEvent;
  export import ZoneRequestCreateInitiateEvent = ZoneEvents.ZoneRequestCreateInitiateEvent;
  export import ZoneRequestCreateDoneEvent = ZoneEvents.ZoneRequestCreateDoneEvent;

  // Subscription Events
  export import SubscriptionCreatedEvent = SubscriptionEvents.SubscriptionCreatedEvent;
  export import SubscriptionUpdatedEvent = SubscriptionEvents.SubscriptionUpdatedEvent;
  export import SubscriptionDeletedEvent = SubscriptionEvents.SubscriptionDeletedEvent;
  export import SubscriptionCancelledEvent = SubscriptionEvents.SubscriptionCancelledEvent;
  export import SubscriptionChangeRequestEvent = SubscriptionEvents.SubscriptionChangeRequestEvent;
}
