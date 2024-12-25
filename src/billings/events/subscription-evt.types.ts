/**
 * @file subscription-evt.types.ts
 * @description Defines TypeScript interfaces related to subscription events.
 */

import { Subjects } from "../../nats-events/subjects";
import { PlanType } from "../../types/utils";
import { SubscriptionChangeResponseType } from "../enums";
import { SubscriptionInterface } from "../models";

/**
 * @interface SubscriptionCreatedEvent
 * @description Defines a TypeScript interface for an event when an subscription is created.
 * @property {Subjects.SubscriptionCreated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<CTypes.SubscriptionInterface>} data - A partial object of the subscription details.
 * @property {string} data.id - The ID of the subscription.
 * @property {number} data.version - The version number of the subscription.
 */
interface SubscriptionCreatedEvent {
  subject: Subjects.SubscriptionCreated;
  data: SubscriptionInterface & {
    id: string;
    organizationId?: string;
    version: number;
  };
}

/**
 * @interface SubscriptionUpdatedEvent
 * @description Defines a TypeScript interface for an event when an subscription is updated.
 * @property {Subjects.SubscriptionUpdated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<CTypes.SubscriptionInterface>} data - A partial object of the subscription details.
 * @property {string} data.id - The ID of the subscription.
 * @property {number} data.version - The version number of the subscription.
 */
interface SubscriptionUpdatedEvent {
  subject: Subjects.SubscriptionUpdated;
  data: Partial<SubscriptionInterface> & {
    id: string;
    version: number;
  };
}

/**
 * @interface SubscriptionDeletedEvent
 * @description Defines a TypeScript interface for an event when an subscription is deleted.
 * @property {Subjects.SubscriptionDeleted} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the subscription.
 */
interface SubscriptionDeletedEvent {
  subject: Subjects.SubscriptionDeleted;
  data: {
    id: string;
  };
}

/**
 * @interface SubscriptionCancelledEvent
 * @description Defines a TypeScript interface for an event when an subscription is cancelled.
 *
 * @property {Subjects.SubscriptionCancelled} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 */
export interface SubscriptionCancelledEvent {
  subject: Subjects.SubscriptionCancelled;
  data: {
    id: string;
    organizationId: string;
    version: number;
  };
}

/**
 * @interface SubscriptionChangeRequestEvent
 * @description Defines a TypeScript interface for an event when a subscription change request is made.
 * @property {Subjects.SubscriptionChangeRequest} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 */
export interface SubscriptionChangeRequestEvent {
  subject: Subjects.SubscriptionChangeRequest;
  data: {
    organizationId: string;
    subscriptionType?: string;
    reuestChangeType?: PlanType;
    changePlanId?: string;
    approvalStatus?: SubscriptionChangeResponseType;
    requestPayload?: string;
    version: number;
  };
}

export {
  SubscriptionCreatedEvent,
  SubscriptionUpdatedEvent,
  SubscriptionDeletedEvent,
};
