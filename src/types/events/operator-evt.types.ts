/**
 * @file operator-evt.types.ts
 * @description Defines TypeScript interfaces related to operator events.
 */

import { Subjects } from "../../nats-events/subjects";
import CTypes from "../models";
import { OnlyRequired } from "../../common";

/**
 * @interface OperatorCreatedEvent
 * @description Defines a TypeScript interface for an event where an operator is created.
 * @property {Subjects.OperatorCreated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<CTypes.OperatorInterface> & OnlyRequired} data - The partial operator interface containing only required fields.
 */
interface OperatorCreatedEvent {
  subject: Subjects.OperatorCreated;
  data: Partial<CTypes.OperatorInterface> & OnlyRequired;
}

/**
 * @interface OperatorUpdatedEvent
 * @description Defines a TypeScript interface for an event where an operator is updated.
 * @property {Subjects.OperatorUpdated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<CTypes.OperatorInterface> & OnlyRequired} data - The partial operator interface containing only required fields.
 */
interface OperatorUpdatedEvent {
  subject: Subjects.OperatorUpdated;
  data: Partial<CTypes.OperatorInterface> & OnlyRequired;
}

/**
 * @interface OperatorDeletedEvent
 * @description Defines a TypeScript interface for an event where an operator is deleted.
 * @property {Subjects.OperatorDeleted} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the operator being deleted.
 * @property {number} data.version - The version number of the operator being deleted.
 */
interface OperatorDeletedEvent {
  subject: Subjects.OperatorDeleted;
  data: { id: string; version: number };
}

/**
 * @interface OperatorAssignedEvent
 * @description Defines a TypeScript interface for an event where an operator is assigned to a task.
 * @property {Subjects.OperatorAssigned} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the operator being assigned.
 * @property {string} data.taskId - The ID of the task to which the operator is being assigned.
 * @property {number} data.version - The version number of the operator being assigned.
 */
interface OperatorAssignedEvent {
  subject: Subjects.OperatorAssigned;
  data: { id: string; taskId: string; version: number };
}

/**
 * @interface OperatorRequestedEvent
 * @description Defines a TypeScript interface for an event where an operator request is made.
 * @property {Subjects.OperatorRequested} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<CTypes.OperatorRequestedEventInterface>} data - The partial operator requested event interface.
 */
interface OperatorRequestedEvent {
  subject: Subjects.OperatorRequested;
  data: Partial<CTypes.OperatorRequestedEventInterface>;
}

/**
 * @exports OperatorEvents
 * @description Exporting operator event types for broader consumption.
 */
export {
  OperatorCreatedEvent,
  OperatorUpdatedEvent,
  OperatorDeletedEvent,
  OperatorAssignedEvent,
  OperatorRequestedEvent,
};
