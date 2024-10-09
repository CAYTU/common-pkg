/**
 * @file avatar-evt.types.ts
 * @description Defines TypeScript interfaces related to avatar events.
 */

import { OnlyRequired } from "../../common";
import { Subjects } from "../../nats-events/subjects";
import { AvatarInterface } from "../models";

/**
 * @interface AvatarCreatedEvent
 * @description Defines a TypeScript interface for an event when an avatar is created.
 * @property {Subjects.AvatarCreated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<AvatarInterface>} data - A partial object of the avatar details.
 * @property {string} data.id - The ID of the avatar.
 * @property {number} data.version - The version number of the avatar.
 */
interface AvatarCreatedEvent {
  subject: Subjects.AvatarCreated;
  data: AvatarInterface & OnlyRequired;
}

/**
 * @interface AvatarUpdatedEvent
 * @description Defines a TypeScript interface for an event when an avatar is updated.
 * @property {Subjects.AvatarUpdated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<AvatarInterface>} data - A partial object of the avatar details.
 * @property {string} data.id - The ID of the avatar.
 * @property {number} data.version - The version number of the avatar.
 */
interface AvatarUpdatedEvent {
  subject: Subjects.AvatarUpdated;
  data: Partial<AvatarInterface> & OnlyRequired;
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
