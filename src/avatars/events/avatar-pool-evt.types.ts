/**
 * @file avatar-instance-evt.types.ts
 * @description Defines TypeScript interfaces related to avatar instance events.
 */

import { Subjects } from "../../nats-events/subjects";
import { AvatarPoolInterface } from "../models";

/**
 * @interface AvatarPoolCreatedEvent
 * @description Defines a TypeScript interface for an event when an avatar instance is created.
 * @property {Subjects.AvatarPoolCreated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<AvatarPoolInterface>} data - A partial object of the avatar instance details.
 * @property {string} data.id - The ID of the avatar instance.
 * @property {number} data.version - The version number of the avatar instance.
 */
interface AvatarPoolCreatedEvent {
  subject: Subjects.AvatarPoolCreated;
  data: AvatarPoolInterface & {
    id: string;
    version: number;
  };
}

/**
 * @interface AvatarPoolUpdatedEvent
 * @description Defines a TypeScript interface for an event when an avatar instance is updated.
 * @property {Subjects.AvatarPoolUpdated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<AvatarPoolInterface>} data - A partial object of the avatar instance details.
 * @property {string} data.id - The ID of the avatar instance.
 * @property {number} data.version - The version number of the avatar instance.
 */
interface AvatarPoolUpdatedEvent {
  subject: Subjects.AvatarPoolUpdated;
  data: Partial<AvatarPoolInterface> & {
    id: string;
    taskId?: string;
    version: number;
  };
}

/**
 * @interface AvatarPoolDeletedEvent
 * @description Defines a TypeScript interface for an event when an avatar instance is deleted.
 * @property {Subjects.AvatarPoolDeleted} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the avatar instance.
 */
interface AvatarPoolDeletedEvent {
  subject: Subjects.AvatarPoolDeleted;
  data: {
    id: string;
    taskId?: string;
    version: number;
  };
}

/**
 * @interface AvatarPoolTerminatingEvent
 * @description Defines a TypeScript interface for an event when an avatar instance is terminating.
 * @property {Subjects.AvatarPoolTerminating} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the avatar instance.
 */
interface AvatarPoolTerminatingEvent {
  subject: Subjects.AvatarPoolTerminating;
  data: {
    id: string;
    taskId?: string;
    version: number;
  };
}

/**
 * @interface AvatarPoolFailedEvent
 * @description Defines a TypeScript interface for an event when an avatar instance has failed.
 * @property {Subjects.AvatarPoolFailed} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the avatar instance.
 */
interface AvatarPoolFailedEvent {
  subject: Subjects.AvatarPoolFailed;
  data: {
    id: string;
    taskId?: string;
    reason?: string;
    version: number;
  };
}

/**
 * @interface AvatarPoolTerminatedEvent
 * @description Defines a TypeScript interface for an event when an avatar instance has terminated.
 * @property {Subjects.AvatarPoolTerminated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the avatar instance.
 */
interface AvatarPoolTerminatedEvent {
  subject: Subjects.AvatarPoolTerminated;
  data: {
    id: string;
    taskId?: string;
    version: number;
  };
}

export {
  AvatarPoolCreatedEvent,
  AvatarPoolUpdatedEvent,
  AvatarPoolDeletedEvent,
  AvatarPoolFailedEvent,
  AvatarPoolTerminatedEvent,
  AvatarPoolTerminatingEvent,
};
