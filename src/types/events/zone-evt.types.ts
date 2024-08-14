/**
 * @file zone-evt.types.ts
 * @description Defines TypeScript interfaces related to zone events.
 */

import { Subjects } from "../../nats-events/subjects";
import CTypes from "../models";
import { Services } from "../utils";
import { OnlyRequired } from "./common";

/**
 * @interface ZoneCreatedEvent
 * @description Defines a TypeScript interface for an event where an zone is created.
 * @property {Subjects.ZoneCreated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<CTypes.ZoneInterface> & OnlyRequired} data - The partial zone interface containing only required fields.
 */
interface ZoneCreatedEvent {
  subject: Subjects.ZoneCreated;
  data: CTypes.ZoneInterface & OnlyRequired;
}

/**
 * @interface ZoneUpdatedEvent
 * @description Defines a TypeScript interface for an event where an zone is updated.
 * @property {Subjects.ZoneUpdated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<CTypes.ZoneInterface> & OnlyRequired} data - The partial zone interface containing only required fields.
 */
interface ZoneUpdatedEvent {
  subject: Subjects.ZoneUpdated;
  data: Partial<CTypes.ZoneInterface> & OnlyRequired;
}

/**
 * @interface ZoneDeletedEvent
 * @description Defines a TypeScript interface for an event where an zone is deleted.
 * @property {Subjects.ZoneDeleted} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the zone being deleted.
 * @property {number} data.version - The version number of the zone being deleted.
 */
interface ZoneDeletedEvent {
  subject: Subjects.ZoneDeleted;
  data: { id: string; version: number };
}

/**
 * @interface ZoneRequestCreateInitiateEvent
 * @description Defines a TypeScript interface for an event where an zone request is made.
 * @property {Subjects.ZoneRequestCreateInitiate} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 */
interface ZoneRequestCreateInitiateEvent {
  subject: Subjects.ZoneRequestCreateInitiate;
  data: {
    serviceObjId: string;
    service: Services;
    location: { lat: number; lng: number };
    version: number;
  };
}

/**
 * @interface ZoneRequestCreateDoneEvent
 * @description Defines a TypeScript interface for an event where an zone request is made.
 * @property {Subjects.ZoneRequestCreateDone} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 */
interface ZoneRequestCreateDoneEvent {
  subject: Subjects.ZoneRequestCreateDone;
  data: {
    serviceObjId: string;
    service: Services;
    zoneId: string;
    location: { lat: number; lng: number };
    version: number;
  };
}

/**
 * @exports ZoneEvents
 * @description Exporting zone event types for broader consumption.
 */
export {
  ZoneCreatedEvent,
  ZoneUpdatedEvent,
  ZoneDeletedEvent,
  ZoneRequestCreateInitiateEvent,
  ZoneRequestCreateDoneEvent,
};
