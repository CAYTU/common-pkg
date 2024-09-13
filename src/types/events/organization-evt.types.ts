/**
 * @file organization-evt.types.ts
 * @description Defines TypeScript interfaces for organization-related events.
 */

import { Subjects } from "../../nats-events/subjects";
import CTypes from "../models/users";
import { TaskType, UserRole } from "../utils";
import { OnlyRequired } from "./common";

/**
 * @interface OrganizationCreatedEvent
 * @description Defines a TypeScript interface for the 'OrganizationCreated' event.
 */
interface OrganizationCreatedEvent {
  subject: Subjects.OrganizationCreated;
  data: CTypes.OrganizationInterface & {
    id: string;
    version: number;
    userId?: string;
  };
}

/**
 * @interface OrganizationUpdatedEvent
 * @description Defines a TypeScript interface for the 'OrganizationUpdated' event.
 */
interface OrganizationUpdatedEvent {
  subject: Subjects.OrganizationUpdated;
  data: Partial<CTypes.OrganizationInterface> & OnlyRequired;
}

/**
 * @interface OrganizationDeletedEvent
 * @description Defines a TypeScript interface for the 'OrganizationDeleted' event.
 */
interface OrganizationDeletedEvent {
  subject: Subjects.OrganizationDeleted;
  data: { id: string; version: number };
}

/**
 * @interface OrganizationMemberAddedEvent
 * @description Defines a TypeScript interface for the 'OrganizationMemberAdded' event.
 */
interface OrganizationMemberAddedEvent {
  subject: Subjects.OrganizationMemberAdded;
  data: {
    organizationId: string;
    email: string;
    userId: string;
    version: number;
  };
}

/**
 * @interface OrganizationMemberRemovedEvent
 * @description Defines a TypeScript interface for the 'OrganizationMemberRemoved' event.
 */
interface OrganizationMemberRemovedEvent {
  subject: Subjects.OrganizationMemberRemoved;
  data: {
    organizationId: string;
    email: string;
    userId: string;
    version: number;
  };
}

/**
 * @interface OrganizationMemberInvitedEvent
 * @description Defines a TypeScript interface for the 'OrganizationMemberInvited' event.
 */
interface OrganizationMemberInvitedEvent {
  subject: Subjects.OrganizationMemberInvited;
  data: {
    organizationId: string;
    roles?: UserRole[];
    allowedTasks?: TaskType[];
    email: string;
    version: number;
  };
}

/**
 * @interface OrganizationMemberInviteExpired
 * @description Defines a TypeScript interface for the 'OrganizationMemberInviteExpired' event.
 */
interface OrganizationMemberInviteExpired {
  subject: Subjects.OrganizationMemberInviteExpired;
  data: {
    organizationId: string;
    email: string;
    version: number;
  };
}

/**
 * @interface OrganizationMemberRoleUpdated
 * @description Defines a TypeScript interface for the 'OrganizationMemberRoleUpdated' event.
 */
interface OrganizationMemberRoleUpdated {
  subject: Subjects.OrganizationMemberRoleUpdated;
  data: {
    organizationId: string;
    email: string;
    roles: UserRole[];
    allowedTasks?: TaskType[];
  };
}

/**
 * @exports OrganizationEventTypes
 * @description Exporting each event type directly for easier consumption.
 */
export {
  OrganizationCreatedEvent,
  OrganizationUpdatedEvent,
  OrganizationDeletedEvent,
  OrganizationMemberAddedEvent,
  OrganizationMemberRemovedEvent,
  OrganizationMemberInvitedEvent,
  OrganizationMemberInviteExpired,
  OrganizationMemberRoleUpdated,
};
