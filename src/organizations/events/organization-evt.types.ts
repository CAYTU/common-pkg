/**
 * @file organization-evt.types.ts
 * @description Defines TypeScript interfaces for organization-related events.
 */

import { OnlyRequired } from "../../common";
import { Subjects } from "../../nats-events/subjects";
import { BillingServices } from "../../types/utils";
import { OrganizationInterface } from "../models";

/**
 * @interface OrganizationCreatedEvent
 * @description Defines a TypeScript interface for the 'OrganizationCreated' event.
 */
interface OrganizationCreatedEvent {
  subject: Subjects.OrganizationCreated;
  data: OrganizationInterface & {
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
  data: Partial<OrganizationInterface> & OnlyRequired;
}

/**
 * @interface OrganizationDeletedEvent
 * @description Defines a TypeScript interface for the 'OrganizationDeleted' event.
 */
interface OrganizationDeletedEvent {
  subject: Subjects.OrganizationDeleted;
  data: { id: string; version: number };
}

interface OrganizationCreditConsumedEvent {
  subject: Subjects.OrganizationCreditConsumed;
  data: {
    organizationId: string;
    subscriptionId?: string;
    creditConsumed: number;
    version: number;
  };
}

interface OrganizationCreditFinishedEvent {
  subject: Subjects.OrganizationCreditFinished;
  data: {
    id: string;
    version: number;
  };
}

interface OrganizationCreditThresholdReachedEvent {
  subject: Subjects.OrganizationCreditThresholdReached;
  data: {
    id: string;
    creditRemaining: number;
    userId?: string;
    version: number;
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
  OrganizationCreditConsumedEvent,
  OrganizationCreditFinishedEvent,
  OrganizationCreditThresholdReachedEvent,
};
