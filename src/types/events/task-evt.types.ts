/**
 * Event Interfaces
 */

import { Subjects } from "../../nats-events/subjects";
import CTypes from "../models";
import { AddonOwner, OnlyRequired } from "./common";

/************ Task *************/
export interface TaskCreatedEvent {
  subject: Subjects.TaskCreated;
  data: Partial<CTypes.TaskInterface> & AddonOwner;
}

export interface TaskUpdatedEvent {
  subject: Subjects.TaskUpdated;
  data: Partial<CTypes.TaskInterface> & OnlyRequired & AddonOwner;
}

export interface TaskDeletedEvent {
  subject: Subjects.TaskDeleted;
  data: { id: string; jobId?: string; version: number } & AddonOwner;
}

export interface TaskGetRobotCandidateEvent {
  subject: Subjects.RobotGetCandidate;
  data: { taskId: string; version: number };
}

export interface TaskRobotAssignedEvent {
  subject: Subjects.TaskRobotAssigned;
  data: {
    robotId: string;
    currentTask: string;
  };
}

export interface TaskRobotUnAssignedEvent {
  subject: Subjects.TaskRobotUnassigned;
  data: { robotId: string; version: number };
}

export interface TaskGetOperatorCandidateEvent {
  subject: Subjects.OperatorGetCandidate;
  data: { taskId: string; version: number };
}

export interface TaskAcceptedEvent {
  subject: Subjects.TaskAccepted;
  data: { customer: string; taskId?: string; version: number };
}

export interface TaskSimulationCreatedEvent {
  subject: Subjects.TaskSimulationCreated;
  data: {
    userId?: string;
    simulationId: string;
    taskId?: string;
    version: number;
  } & AddonOwner;
}
