import { Subjects } from "../../nats-events/subjects";
import CTypes from "../models";
import { TaskType, UserRole } from "../utils";

interface OnlyRequired {
  id: string;
  version: number;
}

export interface OrganizationCreatedEvent {
  subject: Subjects.OrganizationCreated;
  data: CTypes.OrganizationInterface & {
    id: string;
    version: number;
    userId?: string;
  };
}

export interface OrganizationUpdatedEvent {
  subject: Subjects.OrganizationUpdated;
  data: Partial<CTypes.OrganizationInterface> & OnlyRequired;
}

export interface OrganizationDeletedEvent {
  subject: Subjects.OrganizationDeleted;
  data: { id: string; version: number };
}

export interface OrganizationMemberAddedEvent {
  subject: Subjects.OrganizationMemberAdded;
  data: {
    organizationId: string;
    email: string;
    userId: string;
    version: number;
  };
}

export interface OrganizationMemberRemovedEvent {
  subject: Subjects.OrganizationMemberRemoved;
  data: {
    organizationId: string;
    email: string;
    userId: string;
    version: number;
  };
}

export interface OrganizationMemberInvitedEvent {
  subject: Subjects.OrganizationMemberInvited;
  data: {
    organizationId: string;
    roles?: UserRole[];
    allowedTasks?: TaskType[];
    email: string;
    version: number;
  };
}

export interface OrganizationMemberInviteExpired {
  subject: Subjects.OrganizationMemberInviteExpired;
  data: {
    organizationId: string;
    email: string;
    version: number;
  };
}

export interface OrganizationMemberRoleUpdated {
  subject: Subjects.OrganizationMemberRoleUpdated;
  data: {
    organizationId: string;
    email: string;
    roles: UserRole[];
    allowedTasks?: TaskType[];
  };
}
