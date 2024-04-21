/**
 * @file user-evt.types.ts
 * @description Defines TypeScript interfaces related to user events.
 */

import mongoose from "mongoose";
import { Subjects } from "../../nats-events/subjects";
import CTypes from "../models";
import { OauthType, UserRole, UserStatuses } from "../utils";
import { OperatorAddons } from "./common";

/**
 * @interface UserRegisteredEvent
 * @description Defines a TypeScript interface for an event when a user is registered.
 * @property {Subjects.UserRegistered} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<CTypes.UserInterface>} data - A partial object of the user details.
 * @property {OperatorAddons} data - The operator addons details.
 */
interface UserRegisteredEvent {
  subject: Subjects.UserRegistered;
  data: Partial<CTypes.UserInterface> & OperatorAddons;
}

/**
 * @interface UserCreatedEvent
 * @description Defines a TypeScript interface for an event when a user is created.
 * @property {Subjects.UserCreated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<CTypes.UserInterface>} data - A partial object of the user details.
 * @property {string} data.id - The ID of the user.
 * @property {boolean} [data.isPublic] - Flag indicating if the user is public (optional).
 * @property {boolean} [data.operatorRequestIntent] - Flag indicating operator request intent (optional).
 * @property {string} [data.organizationId] - The ID of the organization (optional).
 * @property {number} data.version - The version number of the user.
 */
interface UserCreatedEvent {
  subject: Subjects.UserCreated;
  data: Partial<CTypes.UserInterface> & {
    id: string;
    isPublic?: boolean;
    operatorRequestIntent?: boolean;
    organizationId?: string;
    version: number;
  };
}

/**
 * @interface UserUpdatedEvent
 * @description Defines a TypeScript interface for an event when a user is updated.
 * @property {Subjects.UserUpdated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<CTypes.UserInterface>} data - A partial object of the user details.
 * @property {string} data.id - The ID of the user.
 * @property {number} data.version - The version number of the user.
 * @property {boolean} [data.operatorRequestIntent] - Flag indicating operator request intent (optional).
 */
interface UserUpdatedEvent {
  subject: Subjects.UserUpdated;
  data: Partial<CTypes.UserInterface> & {
    id: string;
    version: number;
    operatorRequestIntent?: boolean;
  };
}

/**
 * @interface UserDeletedEvent
 * @description Defines a TypeScript interface for an event when a user is deleted.
 * @property {Subjects.UserDeleted} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the user.
 * @property {string} [data.ownedOrganizationId] - The ID of the owned organization (optional).
 * @property {number} data.version - The version number of the user.
 */
interface UserDeletedEvent {
  subject: Subjects.UserDeleted;
  data: { id: string; ownedOrganizationId?: string; version: number };
}

/**
 * @interface UserStatusEvent
 * @description Defines a TypeScript interface for an event when a user's status is updated.
 * @property {Subjects.UserStatus} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the user.
 * @property {UserStatuses} data.status - The status of the user.
 * @property {number} data.version - The version number of the user.
 */
interface UserStatusEvent {
  subject: Subjects.UserStatus;
  data: { id: string; status: UserStatuses; version: number };
}

/**
 * @interface UserRegistrationExpiredEvent
 * @description Defines a TypeScript interface for an event when a user registration expires.
 * @property {Subjects.UserRegistrationExpired} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.userId - The ID of the user.
 */
interface UserRegistrationExpiredEvent {
  subject: Subjects.UserRegistrationExpired;
  data: { userId: string };
}

/**
 * @interface UserLoggedInEvent
 * @description Defines a TypeScript interface for an event when a user logs in.
 * @property {Subjects.UserLogin} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the user.
 * @property {number} data.version - The version number of the user.
 */
interface UserLoggedInEvent {
  subject: Subjects.UserLogin;
  data: { id: string; version: number };
}

/**
 * @interface UserLoggedOutEvent
 * @description Defines a TypeScript interface for an event when a user logs out.
 * @property {Subjects.UserLogout} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the user.
 * @property {number} data.version - The version number of the user.
 */
interface UserLoggedOutEvent {
  subject: Subjects.UserLogout;
  data: { id: string; version: number };
}

/**
 * @interface FcmTokenUpdatedEvent
 * @description Defines a TypeScript interface for an event when a user's FCM token is updated.
 * @property {Subjects.UserFCMTokenUpdated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.fcmToken - The FCM token of the user.
 * @property {string | mongoose.Types.ObjectId} data.issuerId - The issuer ID (either user or robot).
 */
interface FcmTokenUpdatedEvent {
  subject: Subjects.UserFCMTokenUpdated;
  data: { fcmToken: string; issuerId: string | mongoose.Types.ObjectId };
}

/**
 * @interface UserRegistrationCompletedEvent
 * @description Defines a TypeScript interface for an event when a user registration is completed.
 * @property {Subjects.UserRegistrationCompleted} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the user.
 * @property {string} data.firstName - The first name of the user.
 * @property {string} data.lastName - The last name of the user.
 * @property {string} data.username - The username of the user.
 * @property {OauthType} [data.oauthType] - The OAuth type (optional).
 * @property {string} data.email - The email of the user.
 * @property {boolean} data.isVerified - Flag indicating if the user is verified.
 * @property {boolean} data.isCompleted - Flag indicating if the registration is completed.
 * @property {string} [data.fcmToken] - The FCM token of the user (optional).
 * @property {string} [data.image] - The image URL of the user (optional).
 * @property {number} data.version - The version number of the user.
 */
interface UserRegistrationCompletedEvent {
  subject: Subjects.UserRegistrationCompleted;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    oauthType?: OauthType;
    email: string;
    isVerified: boolean;
    isCompleted: boolean;
    fcmToken?: string;
    image?: string;
    version: number;
  };
}

/**
 * @interface UserPasswordForgottenEvent
 * @description Defines a TypeScript interface for an event when a user forgets their password.
 * @property {Subjects.UserPasswordForgotten} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the user.
 * @property {string} data.token - The token for password reset.
 * @property {string} data.username - The username of the user.
 * @property {string} data.email - The email of the user.
 * @property {number} data.version - The version number of the user.
 */
interface UserPasswordForgottenEvent {
  subject: Subjects.UserPasswordForgotten;
  data: {
    id: string;
    token: string;
    username: string;
    email: string;
    version: number;
  };
}

/**
 * @interface UserMembershipInvitationEvent
 * @description Defines a TypeScript interface for an event when a user receives a membership invitation.
 * @property {Subjects.UserMembershipInvitation} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.userId - The ID of the user.
 * @property {string} data.organizationId - The ID of the organization.
 * @property {number} data.version - The version number of the user.
 */
interface UserMembershipInvitationEvent {
  subject: Subjects.UserMembershipInvitation;
  data: {
    userId: string;
    organizationId: string;
    version: number;
  };
}

/**
 * @interface UserRoleUpdatedEvent
 * @description Defines a TypeScript interface for an event when a user's roles are updated.
 * @property {Subjects.UserRoleUpdated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the user.
 * @property {UserRole[]} data.roles - The roles assigned to the user.
 * @property {number} data.version - The version number of the user.
 */
interface UserRoleUpdatedEvent {
  subject: Subjects.UserRoleUpdated;
  data: {
    id: string;
    roles: UserRole[];
    version: number;
  };
}

/**
 * @exports UserEventTypes
 * @description Exporting user event types for broader consumption.
 */
export {
  UserRegisteredEvent,
  UserCreatedEvent,
  UserUpdatedEvent,
  UserDeletedEvent,
  UserStatusEvent,
  UserRegistrationExpiredEvent,
  UserLoggedInEvent,
  UserLoggedOutEvent,
  FcmTokenUpdatedEvent,
  UserRegistrationCompletedEvent,
  UserPasswordForgottenEvent,
  UserMembershipInvitationEvent,
  UserRoleUpdatedEvent,
};
