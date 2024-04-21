import mongoose from "mongoose";
import { Subjects } from "../../nats-events/subjects";
import CTypes from "../models";
import { OauthType, UserRole, UserStatuses } from "../utils";
import { OperatorAddons } from "./common";

export interface UserRegisteredEvent {
  subject: Subjects.UserRegistered;
  data: Partial<CTypes.UserInterface> & OperatorAddons;
}

export interface UserCreatedEvent {
  subject: Subjects.UserCreated;
  data: Partial<CTypes.UserInterface> & {
    id: string;
    isPublic?: boolean; // Needed when the operator request is made through an invitation from an org
    operatorRequestIntent?: boolean;
    organizationId?: string; // Organization where the user was invited from
    version: number;
  };
}

export interface UserUpdatedEvent {
  subject: Subjects.UserUpdated;
  data: Partial<CTypes.UserInterface> & {
    id: string;
    version: number;
    operatorRequestIntent?: boolean;
  };
}

export interface UserDeletedEvent {
  subject: Subjects.UserDeleted;
  data: { id: string; ownedOrganizationId?: string; version: number };
}

export interface UserStatusEvent {
  subject: Subjects.UserStatus;
  data: { id: string; status: UserStatuses; version: number };
}

export interface UserRegistrationExpiredEvent {
  subject: Subjects.UserRegistrationExpired;
  data: { userId: string };
}

export interface UserLoggedInEvent {
  subject: Subjects.UserLogin;
  data: { id: string; version: number };
}

export interface UserLoggedOutEvent {
  subject: Subjects.UserLogout;
  data: { id: string; version: number };
}

export interface FcmTokenUpdatedvent {
  subject: Subjects.UserFCMTokenUpdated;
  // The issuerId means that it can be a user or a robot
  data: { fcmToken: string; issuerId: string | mongoose.Types.ObjectId };
}

export interface UserRegistrationCompletedEvent {
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

export interface UserPasswordForgottenEvent {
  subject: Subjects.UserPasswordForgotten;
  data: {
    id: string;
    token: string;
    username: string;
    email: string;
    version: number;
  };
}

export interface UserMembershipInvitationEvent {
  subject: Subjects.UserMembershipInvitation;
  data: {
    userId: string;
    organizationId: string;
    version: number;
  };
}

export interface UserRoleUpdatedEvent {
  subject: Subjects.UserRoleUpdated;
  data: {
    id: string;
    roles: UserRole[];
    version: number;
  };
}
