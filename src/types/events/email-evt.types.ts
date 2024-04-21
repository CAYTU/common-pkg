/**
 * @file email-evt.types.ts
 * @description Defines TypeScript interfaces related to email events.
 */

import { Subjects } from "../../nats-events/subjects";

/**
 * @interface EmailLinkResendRequestEvent
 * @description Defines a TypeScript interface for an event where an email link resend request is made.
 * @property {Subjects.EmailLinkResendRequest} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID associated with the request.
 * @property {string} data.username - The username associated with the request.
 * @property {string} data.email - The email address associated with the request.
 */
interface EmailLinkResendRequestEvent {
  subject: Subjects.EmailLinkResendRequest;
  data: {
    id: string;
    username: string;
    email: string;
  };
}

/**
 * @exports EmailEventTypes
 * @description Exporting email event types for broader consumption.
 */
export { EmailLinkResendRequestEvent };
