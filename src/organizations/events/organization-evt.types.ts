/**
 * @file organization-evt.types.ts
 * @description Defines TypeScript interfaces for organization-related events.
 */

import { CreditSourceOrigin, CreditType } from "../../billings/enums";
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

interface OrganizationCreditEstimationThresholdReachedEvent {
  subject: Subjects.OrganizationCreditEstimationThresholdReached;
  data: {
    organizationId: string;
    creditRemaining: number;
    estimatedCreditConsumed: number;
    userId?: string;
    version: number;
  };
}

interface OrganizationCreditEstimationFinishedEvent {
  subject: Subjects.OrganizationCreditEstimationFinished;
  data: {
    organizationId: string;
    estimatedCreditConsumed: number;
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

interface OrganizationCreditUpdatedEvent {
  subject: Subjects.OrganizationCreditUpdated;
  data: {
    organizationId: string;
    creditUnits: number;
    amount: number;
    creditType: CreditType;
    source: {
      origin: CreditSourceOrigin;
      name?: string;
    };
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
  OrganizationCreditUpdatedEvent,
  OrganizationCreditConsumedEvent,
  OrganizationCreditFinishedEvent,
  OrganizationCreditThresholdReachedEvent,
  OrganizationCreditEstimationThresholdReachedEvent,
  OrganizationCreditEstimationFinishedEvent,
};
