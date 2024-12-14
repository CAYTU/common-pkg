/**
 * @file operator-evt.types.ts
 * @description Defines TypeScript interfaces related to operator events.
 */

import { OnlyRequired } from "../../common";
import { Subjects } from "../../nats-events/subjects";
import { OperatorRequestStatus, OperatorStatus } from "../enums";
import { OperatorInterface, OperatorRequestedEventInterface } from "../models";

/**
 * @interface OperatorCreatedEvent
 * @description Defines a TypeScript interface for an event where an operator is created.
 * @property {Subjects.OperatorCreated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<OperatorInterface> & OnlyRequired} data - The partial operator interface containing only required fields.
 */
interface OperatorCreatedEvent {
  subject: Subjects.OperatorCreated;
  data: Partial<OperatorInterface> & OnlyRequired;
}

/**
 * @interface OperatorUpdatedEvent
 * @description Defines a TypeScript interface for an event where an operator is updated.
 * @property {Subjects.OperatorUpdated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<OperatorInterface> & OnlyRequired} data - The partial operator interface containing only required fields.
 */
interface OperatorUpdatedEvent {
  subject: Subjects.OperatorUpdated;
  data: Partial<OperatorInterface> & OnlyRequired;
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
 * @property {Partial<OperatorRequestedEventInterface>} data - The partial operator requested event interface.
 */
interface OperatorRequestEvent {
  subject: Subjects.OperatorRequest;
  data: Partial<OperatorRequestedEventInterface>;
}

/**
 * @interface OperatorStatusUpdatedEvent
 * @description Defines a TypeScript interface for an event where an operator's status is updated.
 *
 * @property {Subjects.OperatorStatusUpdated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the operator whose status is being updated.
 * @property {OperatorStatus} data.status - The new status of the operator.
 * @property {number} data.version - The version number of the operator whose status is being updated.
 */
interface OperatorStatusUpdatedEvent {
  subject: Subjects.OperatorStatusUpdated;
  data: { id: string; status: OperatorStatus; version?: number };
}

/**
 * Event interface for when the status of an operator request is updated.
 *
 * @interface OperatorRequestStatusUpdatedEvent
 *
 * @property {Subjects.OperatorRequestStatusUpdated} subject - The subject of the event.
 * @property {Object} data - The data associated with the event.
 * @property {string} data.id - The unique identifier of the operator request.
 * @property {OperatorRequestStatus} data.status - The new status of the operator request.
 * @property {number} [data.version] - The optional version number of the event.
 */
interface OperatorRequestStatusUpdatedEvent {
  subject: Subjects.OperatorRequestStatusUpdated;
  data: { id: string; status: OperatorRequestStatus; version?: number };
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
  OperatorRequestEvent,
  OperatorStatusUpdatedEvent,
  OperatorRequestStatusUpdatedEvent,
};
