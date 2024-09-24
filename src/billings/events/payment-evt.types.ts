/**
 * @file payment-evt.types.ts
 * @description Defines TypeScript interfaces related to various payment events in the system.
 * These events include creation, update, deletion, and scheduling of payments.
 */

import { OnlyRequired } from "../../common";
import { Subjects } from "../../nats-events/subjects";
import { PaymentInterface } from "../models";

/**
 * @interface PaymentCreatedEvent
 * @description Represents the structure of the event triggered when a payment is created.
 * This event provides the initial details of the payment, such as its unique identifier,
 * the related device (if applicable), and the current version for concurrency control.
 *
 * @property {Subjects.PaymentCreated} subject - The subject type representing the event.
 * @property {object} data - The payload containing payment details.
 * @property {string} data.id - The unique identifier of the payment.
 * @property {string} [data.deviceId] - Optional identifier for the related device (e.g., terminal).
 * @property {number} data.version - The version of the payment to handle event versioning.
 * @property {PaymentInterface} - All other fields required for payment, inherited from PaymentInterface.
 */
interface PaymentCreatedEvent {
  subject: Subjects.PaymentCreated;
  data: PaymentInterface & {
    id: string;
    deviceId?: string;
    version: number;
  };
}

/**
 * @interface PaymentUpdatedEvent
 * @description Represents the structure of the event triggered when a payment is updated.
 * This event contains the partial payment details that have been modified. It uses a utility type
 * to only require the mandatory fields to be present in the payload.
 *
 * @property {Subjects.PaymentUpdated} subject - The subject type representing the event.
 * @property {Partial<PaymentInterface> & OnlyRequired} data - A partial object containing the updated payment details.
 * This includes only the required properties from `PaymentInterface` that are necessary for the update.
 */
interface PaymentUpdatedEvent {
  subject: Subjects.PaymentUpdated;
  data: Partial<PaymentInterface> & OnlyRequired;
}

/**
 * @interface PaymentDeletedEvent
 * @description Represents the structure of the event triggered when a payment is deleted.
 * This event provides the payment's unique identifier and version for concurrency control.
 *
 * @property {Subjects.PaymentDeleted} subject - The subject type representing the event.
 * @property {object} data - The payload containing the deleted payment's information.
 * @property {string} data.id - The unique identifier of the deleted payment.
 * @property {number} data.version - The version of the payment to handle event versioning.
 */
interface PaymentDeletedEvent {
  subject: Subjects.PaymentDeleted;
  data: { id: string; version: number };
}

/**
 * @interface PaymentScheduledEvent
 * @description Represents the structure of the event triggered when a payment is scheduled.
 * This event contains details about the scheduled payment such as the plan, organization, and subscription IDs.
 *
 * @property {Subjects.PaymentScheduled} subject - The subject type representing the event.
 * @property {object} data - The payload containing the details of the scheduled payment.
 * @property {string} data.planId - The ID of the payment plan associated with the scheduled payment.
 * @property {string} data.organizationId - The ID of the organization for which the payment is scheduled.
 * @property {string} data.subscriptionId - The ID of the subscription associated with the scheduled payment.
 */
interface PaymentScheduledEvent {
  subject: Subjects.PaymentScheduled;
  data: {
    planId: string;
    organizationId: string;
    subscriptionId: string;
  };
}

/**
 * @interface PaymentScheduledDateReachedEvent
 * @description Represents the structure of the event triggered when a scheduled payment date is reached.
 * This event contains the same information as `PaymentScheduledEvent`, providing the necessary data for
 * when the payment date is due.
 *
 * @property {Subjects.PaymentScheduledDateReached} subject - The subject type representing the event.
 * @property {object} data - The payload containing the details when the scheduled payment date is reached.
 * @property {string} data.planId - The ID of the payment plan associated with the scheduled payment.
 * @property {string} data.organizationId - The ID of the organization for which the payment date has been reached.
 * @property {string} data.subscriptionId - The ID of the subscription related to the payment.
 */
interface PaymentScheduledDateReachedEvent {
  subject: Subjects.PaymentScheduledDateReached;
  data: {
    planId: string;
    organizationId: string;
    subscriptionId: string;
  };
}

/**
 * @exports PaymentEventTypes
 * @description Exporting all payment event types for broader consumption in the codebase.
 */
export {
  PaymentCreatedEvent,
  PaymentUpdatedEvent,
  PaymentDeletedEvent,
  PaymentScheduledEvent,
  PaymentScheduledDateReachedEvent,
};
