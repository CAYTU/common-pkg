/************ Operator *************/

import { Subjects } from "../../nats-events/subjects";
import CTypes from "../models";
import { OnlyRequired } from "./common";

export interface OperatorCreatedEvent {
  subject: Subjects.OperatorCreated;
  data: Partial<CTypes.OperatorInterface> & OnlyRequired;
}

export interface OperatorUpdatedEvent {
  subject: Subjects.OperatorUpdated;
  data: Partial<CTypes.OperatorInterface> & OnlyRequired;
}

export interface OperatorDeletedEvent {
  subject: Subjects.OperatorDeleted;
  data: { id: string; version: number };
}

export interface OperatorAssignedEvent {
  subject: Subjects.OperatorAssigned;
  data: { id: string; taskId: string; version: number }; // id of the operator
}

export interface OperatorRequestedEvent {
  subject: Subjects.OperatorRequested;
  data: Partial<CTypes.OperatorRequestedEventInterface>;
}

/************ End Operator *************/
