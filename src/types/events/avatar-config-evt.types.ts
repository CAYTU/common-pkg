/**
 * @file avatar-config-evt.types.ts
 * @description Defines TypeScript interfaces related to avatar config events.
 */

import { Subjects } from "../../nats-events/subjects";
import CTypes from "../models";

/**
 * @interface AvatarConfigCreatedEvent
 * @description Defines a TypeScript interface for an event when an avatar config is created.
 * @property {Subjects.AvatarConfigCreated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<CTypes.AvatarConfigInterface>} data - A partial object of the avatar config details.
 * @property {string} data.id - The ID of the avatar config.
 * @property {number} data.version - The version number of the avatar config.
 */
interface AvatarConfigCreatedEvent {
  subject: Subjects.AvatarConfigCreated;
  data: CTypes.AvatarConfig & {
    id: string;
    version: number;
  };
}

/**
 * @interface AvatarConfigUpdatedEvent
 * @description Defines a TypeScript interface for an event when an avatar config is updated.
 * @property {Subjects.AvatarConfigUpdated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<CTypes.AvatarConfigInterface>} data - A partial object of the avatar config details.
 * @property {string} data.id - The ID of the avatar config.
 * @property {number} data.version - The version number of the avatar config.
 */
interface AvatarConfigUpdatedEvent {
  subject: Subjects.AvatarConfigUpdated;
  data: Partial<CTypes.AvatarConfig> & {
    id: string;
    version: number;
  };
}

/**
 * @interface AvatarConfigDeletedEvent
 * @description Defines a TypeScript interface for an event when an avatar config is deleted.
 * @property {Subjects.AvatarConfigDeleted} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the avatar config.
 */
interface AvatarConfigDeletedEvent {
  subject: Subjects.AvatarConfigDeleted;
  data: {
    id: string;
  };
}

export {
  AvatarConfigCreatedEvent,
  AvatarConfigUpdatedEvent,
  AvatarConfigDeletedEvent,
};
