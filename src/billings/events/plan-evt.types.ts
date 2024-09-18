/**
 * @file plan-evt.types.ts
 * @description Defines TypeScript interfaces related to plan events.
 */

import { OnlyRequired } from "../../common";
import { Subjects } from "../../nats-events/subjects";
import { PlanInterface } from "../models";

/**
 * @interface PlanCreatedEvent
 * @description Defines a TypeScript interface for an event when a plan is created.
 * @property {Subjects.PlanCreated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the plan.
 * @property {string} [data.deviceId] - The ID of the device related to the plan (optional).
 * @property {number} data.version - The version number of the plan.
 */
interface PlanCreatedEvent {
  subject: Subjects.PlanCreated;
  data: PlanInterface;
}

/**
 * @interface PlanUpdatedEvent
 * @description Defines a TypeScript interface for an event when a plan is updated.
 * @property {Subjects.PlanUpdated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {object} data - A partial object of the plan details.
 * @property {OnlyRequired} data - The required properties of the plan.
 */
interface PlanUpdatedEvent {
  subject: Subjects.PlanUpdated;
  data: Partial<PlanInterface> & OnlyRequired;
}

/**
 * @interface PlanDeletedEvent
 * @description Defines a TypeScript interface for an event when a plan is deleted.
 * @property {Subjects.PlanDeleted} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the plan.
 * @property {number} data.version - The version number of the plan.
 */
interface PlanDeletedEvent {
  subject: Subjects.PlanDeleted;
  data: { id: string; version: number };
}

/**
 * @exports PlanEventTypes
 * @description Exporting plan event types for broader consumption.
 */
export { PlanCreatedEvent, PlanUpdatedEvent, PlanDeletedEvent };
