import { Subjects } from "../../nats-events/subjects";
import CTypes from "../models";

interface OnlyRequired {
  id: string;
  version: number;
}

export interface PaymentCreatedEvent {
  subject: Subjects.PaymentCreated;
  data: CTypes.PaymentInterface & {
    id: string;
    deviceId?: string;
    version: number;
  };
}

export interface PaymentUpdatedEvent {
  subject: Subjects.PaymentUpdated;
  data: Partial<CTypes.PaymentInterface> & OnlyRequired;
}

export interface PaymentDeletedEvent {
  subject: Subjects.PaymentDeleted;
  data: { id: string; version: number };
}
