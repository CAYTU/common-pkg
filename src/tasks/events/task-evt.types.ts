/**
 * @file task-evt.types.ts
 * @description Defines TypeScript interfaces related to task events.
 */

import { Subjects } from "../../nats-events/subjects";
import { AddonOwner, OnlyRequired } from "../../common";
import { TaskInterface } from "../models";
import { TemplateSetupData } from "../../avatars/utils";
import { TaskStatus, TaskType } from "../enums";

/**
 * @interface TaskCreatedEvent
 * @description Defines a TypeScript interface for an event when a task is created.
 * @property {Subjects.TaskCreated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<CTypes.TaskInterface>} data - A partial object of the task details.
 * @property {AddonOwner} data - The addon owner details.
 */
interface TaskCreatedEvent {
  subject: Subjects.TaskCreated;
  data: Partial<TaskInterface> & AddonOwner & OnlyRequired;
}

/**
 * @interface TaskUpdatedEvent
 * @description Defines a TypeScript interface for an event when a task is updated.
 * @property {Subjects.TaskUpdated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {Partial<TaskInterface>} data - A partial object of the task details.
 * @property {OnlyRequired} data - The required properties of the task.
 * @property {AddonOwner} data - The addon owner details.
 */
interface TaskUpdatedEvent {
  subject: Subjects.TaskUpdated;
  data: Partial<TaskInterface> & OnlyRequired & AddonOwner;
}

/**
 * @interface TaskDeletedEvent
 * @description Defines a TypeScript interface for an event when a task is deleted.
 * @property {Subjects.TaskDeleted} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.id - The ID of the task.
 * @property {string} [data.jobId] - The ID of the related job (optional).
 * @property {number} data.version - The version number of the task.
 * @property {AddonOwner} data - The addon owner details.
 */
interface TaskDeletedEvent {
  subject: Subjects.TaskDeleted;
  data: { id: string; jobId?: string; version: number } & AddonOwner;
}

/**
 * @interface TaskGetRobotCandidateEvent
 * @description Defines a TypeScript interface for an event when requesting a robot candidate for a task.
 * @property {Subjects.RobotGetCandidate} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.taskId - The ID of the task.
 * @property {number} data.version - The version number of the task.
 */
interface TaskGetRobotCandidateEvent {
  subject: Subjects.RobotGetCandidate;
  data: { taskId: string; deviceId: string; version: number };
}

/**
 * @interface TaskRobotAssignedEvent
 * @description Defines a TypeScript interface for an event when a robot is assigned to a task.
 * @property {Subjects.TaskRobotAssigned} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.robotId - The ID of the robot.
 * @property {string} data.currentTask - The ID of the current task assigned to the robot.
 */
interface TaskRobotAssignedEvent {
  subject: Subjects.TaskRobotAssigned;
  data: { robotId: string; currentTask: string };
}

/**
 * @interface TaskRobotUnAssignedEvent
 * @description Defines a TypeScript interface for an event when a robot is unassigned from a task.
 * @property {Subjects.TaskRobotUnassigned} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {string} data.robotId - The ID of the robot.
 * @property {number} data.version - The version number of the task.
 */
interface TaskRobotUnAssignedEvent {
  subject: Subjects.TaskRobotUnassigned;
  data: { robotId: string; version: number };
}

/**
 * @interface TaskGetOperatorCandidateEvent
 * @description Defines a TypeScript interface for an event when requesting an operator candidate for a task.
 * @property {Subjects.OperatorGetCandidate} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 */
interface TaskGetOperatorCandidateEvent {
  subject: Subjects.OperatorGetCandidate;
  data: {
    taskId: string;
    operatorId?: string;
    deviceId?: string;
    version: number;
  };
}

/**
 * @interface TaskAcceptedEvent
 * @description Defines a TypeScript interface for an event when a task is accepted.
 * @property {Subjects.TaskAccepted} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.

 */
interface TaskAcceptedEvent {
  subject: Subjects.TaskAccepted;
  data: { owner: string; taskId?: string; version: number };
}

/**
 * @interface TaskSimulationCreatedEvent
 * @description Defines a TypeScript interface for an event when a task simulation is created.
 * @property {Subjects.TaskSimulationCreated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {AddonOwner} data - The addon owner details.
 */
interface TaskSimulationCreatedEvent {
  subject: Subjects.TaskSimulationCreated;
  data: {
    userId?: string;
    simulationId: string;
    taskId?: string;
    version: number;
  } & AddonOwner;
}

/**
 * @interface TaskSimulationTerminatedEvent
 * @description Defines a TypeScript interface for an event when a task simulation is terminated.
 * @property {Subjects.TaskSimulationTerminated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 */
interface TaskSimulationTerminatedEvent {
  subject: Subjects.TaskSimulationTerminated;
  data: {
    simulationId?: string;
    simulationJobId?: string;
    taskId: string;
    version: number;
  } & AddonOwner;
}

/**
 * @interface TaskAvatarCreatedEvent
 * @description Defines a TypeScript interface for an event when a task simulation is created.
 * @property {Subjects.TaskAvatarCreated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 * @property {AddonOwner} data - The addon owner details.
 */
interface TaskAvatarCreatedEvent {
  subject: Subjects.TaskAvatarCreated;
  data: {
    taskId?: string;
    avatarId?: string;
    templateSetupData?: TemplateSetupData;
    version: number;
  } & AddonOwner;
}

/**
 * @interface TaskAvatarTerminatedEvent
 * @description Defines a TypeScript interface for an event when a task avatar is terminated.
 * @property {Subjects.TaskAvatarTerminated} subject - The subject type of the event.
 * @property {object} data - The data payload of the event.
 */
interface TaskAvatarTerminatedEvent {
  subject: Subjects.TaskAvatarTerminated;
  data: {
    avatarId?: string;
    avatarInstanceId?: string;
    taskId: string;
    version: number;
  } & AddonOwner;
}

/**
 * @interface TaskUsageEvent
 * @description Defines a TypeScript interface for an event when a task is used.
 */
interface TaskUsageEvent {
  subject: Subjects.TaskUsage;
  data: {
    organizationId: string;
    taskId: string;
    taskType: TaskType;
    userId?: string;
    duration: number;
    status: TaskStatus;
  };
}

/**
 * @exports TaskEventTypes
 * @description Exporting task event types for broader consumption.
 */
export {
  TaskCreatedEvent,
  TaskUpdatedEvent,
  TaskDeletedEvent,
  TaskGetRobotCandidateEvent,
  TaskRobotAssignedEvent,
  TaskRobotUnAssignedEvent,
  TaskGetOperatorCandidateEvent,
  TaskAcceptedEvent,
  TaskSimulationCreatedEvent,
  TaskSimulationTerminatedEvent,
  TaskAvatarCreatedEvent,
  TaskAvatarTerminatedEvent,
  TaskUsageEvent,
};
