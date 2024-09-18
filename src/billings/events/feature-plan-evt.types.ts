/**
 * @file plan-evt.types.ts
 * @description Defines TypeScript interfaces related to plan events.
 */

import { OnlyRequired } from "../../common";
import { Subjects } from "../../nats-events/subjects";
import { PlanFeature } from "../models";

/**
 * @interface PlanFeatureCreatedEvent
 * @description Defines a TypeScript interface for an event when a PlanFeature is created.
 * @property {Subjects.PlanFeatureCreated} subject - The subject type of the event.
 */
interface PlanFeatureCreatedEvent {
  subject: Subjects.PlanFeatureCreated;
  data: PlanFeature;
}

/**
 * @interface PlanFeatureUpdatedEvent
 * @description Defines a TypeScript interface for an event when a plan feature is updated.
 * @property {Subjects.PlanFeature} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {object} data - A partial object of the plan details.
 * @property {OnlyRequired} data - The required properties of the plan.
 */
interface PlanFeatureUpdatedEvent {
  subject: Subjects.PlanFeatureUpdated;
  data: Partial<PlanFeature> & OnlyRequired;
}

/**
 * @interface PlanFeatureDeletedEvent
 * @description Defines a TypeScript interface for an event when a PlanFeature is deleted.
 * @property {Subjects.PlanFeatureDeleted} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the PlanFeature.
 * @property {number} data.version - The version number of the PlanFeature.
 */
interface PlanFeatureDeletedEvent {
  subject: Subjects.PlanFeatureDeleted;
  data: { id: string; version: number };
}

/**
 * @exports PlanFeatureEventTypes
 * @description Exporting plan event types for broader consumption.
 */
export {
  PlanFeatureCreatedEvent,
  PlanFeatureUpdatedEvent,
  PlanFeatureDeletedEvent,
};
