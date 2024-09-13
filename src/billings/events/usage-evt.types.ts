/**
 * @fileoverview Usage event types.
 * @packageDocumentation
 * @module billings/events
 *
 * @remarks
 * This file contains interfaces related to usage events.
 *
 */

import { Subjects } from "../../nats-events/subjects";
import { Services } from "../../types/utils";
import { UsageInterface } from "../models";

/**
 * @interface UsageCreatedEvent
 * @description Defines a TypeScript interface for an event when a usage is created.
 */
interface UsageCreatedEvent {
  subject: Subjects.UsageCreated;
  data: UsageInterface;
}

/**
 * @interface UsageUpdatedEvent
 * @description Defines a TypeScript interface for an event when a usage is updated.
 */
interface UsageUpdatedEvent {
  subject: Subjects.UsageUpdated;
  data: Partial<UsageInterface>;
}

/**
 * @interface UsageDeletedEvent
 * @description Defines a TypeScript interface for an event when a usage is deleted.
 */
interface UsageDeletedEvent {
  subject: Subjects.UsageDeleted;
  data: { id: string };
}

/**
 * @interface UsageStartedEvent
 * @description Defines a TypeScript interface for an event when a usage is started.
 */
interface UsageStartedEvent {
  subject: Subjects.UsageStarted;
  data: {
    id: string;
    serviceRefId: string;
    service: Services;
    organizationId?: string;
    ratePerHour?: number;
  };
}

/**
 * @interface UsageEndedEvent
 * @description Defines a TypeScript interface for an event when a usage is ended.
 */
interface UsageEndedEvent {
  subject: Subjects.UsageEnded;
  data: { id: string; serviceRefId: string };
}

/**
 * @interface UsageFailedEvent
 * @description Defines a TypeScript interface for an event when a usage fails.
 */
interface UsageFailedEvent {
  subject: Subjects.UsageFailed;
  data: { id: string; serviceRefId: string };
}

/**
 * @exports UsageEventTypes
 * @description Exporting usage event types for broader consumption.
 */
export {
  UsageCreatedEvent,
  UsageUpdatedEvent,
  UsageDeletedEvent,
  UsageStartedEvent,
  UsageEndedEvent,
  UsageFailedEvent,
};
