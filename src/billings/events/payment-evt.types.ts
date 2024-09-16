/**
 * @file payment-evt.types.ts
 * @description Defines TypeScript interfaces related to payment events.
 */

import { OnlyRequired } from "../../common";
import { Subjects } from "../../nats-events/subjects";
import { PaymentInterface } from "../models";

/**
 * @interface PaymentCreatedEvent
 * @description Defines a TypeScript interface for an event when a payment is created.
 * @property {Subjects.PaymentCreated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the payment.
 * @property {string} [data.deviceId] - The ID of the device related to the payment (optional).
 * @property {number} data.version - The version number of the payment.
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
 * @description Defines a TypeScript interface for an event when a payment is updated.
 * @property {Subjects.PaymentUpdated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {object} data - A partial object of the payment details.
 * @property {OnlyRequired} data - The required properties of the payment.
 */
interface PaymentUpdatedEvent {
  subject: Subjects.PaymentUpdated;
  data: Partial<PaymentInterface> & OnlyRequired;
}

/**
 * @interface PaymentDeletedEvent
 * @description Defines a TypeScript interface for an event when a payment is deleted.
 * @property {Subjects.PaymentDeleted} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the payment.
 * @property {number} data.version - The version number of the payment.
 */
interface PaymentDeletedEvent {
  subject: Subjects.PaymentDeleted;
  data: { id: string; version: number };
}

/**
 * @exports PaymentEventTypes
 * @description Exporting payment event types for broader consumption.
 */
export { PaymentCreatedEvent, PaymentUpdatedEvent, PaymentDeletedEvent };
