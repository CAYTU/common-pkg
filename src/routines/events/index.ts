import { OnlyRequired } from "../../common";
import { Subjects } from "../../nats-events";
import { IDeviceRoutine } from "../models/routine-device";

export interface RoutineAddedEVent {
  subject: Subjects.RoutineCreated;
  data: Partial<IDeviceRoutine> & OnlyRequired;
}

export interface RoutineUpdatedEvent {
  subject: Subjects.RoutineUpdated;
  data: Partial<IDeviceRoutine> & OnlyRequired;
}

export interface RoutineDeletedEvent {
  subject: Subjects.RoutineDeleted;
  data: { id: string; version: number };
}
