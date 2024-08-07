/**
 * @file avatar-instance-evt.types.ts
 * @description Defines TypeScript interfaces related to avatar instance events.
 */

import { Subjects } from "../../nats-events/subjects";
import CTypes from "../models";

/**
 * @interface AvatarInstanceCreatedEvent
 * @description Defines a TypeScript interface for an event when an avatar instance is created.
 * @property {Subjects.AvatarInstanceCreated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<CTypes.AvatarInstanceInterface>} data - A partial object of the avatar instance details.
 * @property {string} data.id - The ID of the avatar instance.
 * @property {number} data.version - The version number of the avatar instance.
 */
interface AvatarInstanceCreatedEvent {
  subject: Subjects.AvatarInstanceCreated;
  data: CTypes.AvatarInstanceInterface & {
    id: string;
    version: number;
  };
}

/**
 * @interface AvatarInstanceUpdatedEvent
 * @description Defines a TypeScript interface for an event when an avatar instance is updated.
 * @property {Subjects.AvatarInstanceUpdated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<CTypes.AvatarInstanceInterface>} data - A partial object of the avatar instance details.
 * @property {string} data.id - The ID of the avatar instance.
 * @property {number} data.version - The version number of the avatar instance.
 */
interface AvatarInstanceUpdatedEvent {
  subject: Subjects.AvatarInstanceUpdated;
  data: Partial<CTypes.AvatarInstanceInterface> & {
    id: string;
    version: number;
  };
}

/**
 * @interface AvatarInstanceDeletedEvent
 * @description Defines a TypeScript interface for an event when an avatar instance is deleted.
 * @property {Subjects.AvatarInstanceDeleted} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the avatar instance.
 */
interface AvatarInstanceDeletedEvent {
  subject: Subjects.AvatarInstanceDeleted;
  data: {
    id: string;
  };
}

/**
 * @interface AvatarInstanceTerminatingEvent
 * @description Defines a TypeScript interface for an event when an avatar instance is terminating.
 * @property {Subjects.AvatarInstanceTerminating} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the avatar instance.
 */
interface AvatarInstanceTerminatingEvent {
  subject: Subjects.AvatarInstanceTerminating;
  data: {
    id: string;
  };
}

export {
  AvatarInstanceCreatedEvent,
  AvatarInstanceUpdatedEvent,
  AvatarInstanceDeletedEvent,
  AvatarInstanceTerminatingEvent,
};
