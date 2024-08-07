/**
 * @file avatar-evt.types.ts
 * @description Defines TypeScript interfaces related to avatar events.
 */

import { Subjects } from "../../nats-events/subjects";
import CTypes from "../models";

/**
 * @interface AvatarCreatedEvent
 * @description Defines a TypeScript interface for an event when an avatar is created.
 * @property {Subjects.AvatarCreated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<CTypes.AvatarInterface>} data - A partial object of the avatar details.
 * @property {string} data.id - The ID of the avatar.
 * @property {number} data.version - The version number of the avatar.
 */
interface AvatarCreatedEvent {
  subject: Subjects.AvatarCreated;
  data: CTypes.AvatarInterface & {
    id: string;
    version: number;
  };
}

/**
 * @interface AvatarUpdatedEvent
 * @description Defines a TypeScript interface for an event when an avatar is updated.
 * @property {Subjects.AvatarUpdated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<CTypes.AvatarInterface>} data - A partial object of the avatar details.
 * @property {string} data.id - The ID of the avatar.
 * @property {number} data.version - The version number of the avatar.
 */
interface AvatarUpdatedEvent {
  subject: Subjects.AvatarUpdated;
  data: Partial<CTypes.AvatarInterface> & {
    id: string;
    version: number;
  };
}

/**
 * @interface AvatarDeletedEvent
 * @description Defines a TypeScript interface for an event when an avatar is deleted.
 * @property {Subjects.AvatarDeleted} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the avatar.
 */
interface AvatarDeletedEvent {
  subject: Subjects.AvatarDeleted;
  data: {
    id: string;
  };
}

export { AvatarCreatedEvent, AvatarUpdatedEvent, AvatarDeletedEvent };
