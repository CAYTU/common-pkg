import { Subjects } from "../../nats-events/subjects";
import { AddonOwner, OnlyRequired } from "../../common";
import { DeviceBaseInterface, IoTDeviceInterface } from "../models";
import { StatusResponse } from "../enums";

/**
 * @interface DeviceCreatedEvent
 * @description Defines a TypeScript interface for an event when a task is created.

 */
interface DeviceCreatedEvent {
  subject: Subjects.TaskCreated;
  data: Partial<DeviceBaseInterface> & AddonOwner & OnlyRequired;
}

/**
 * @interface DeviceUpdatedEvent
 * @description Defines a TypeScript interface for an event when a task is updated.

 */
interface DeviceUpdatedEvent {
  subject: Subjects.TaskUpdated;
  data: Partial<DeviceBaseInterface> & OnlyRequired & AddonOwner;
}

/**
 * @interface DeviceDeletedEvent
 * @description Defines a TypeScript interface for an event when a task is deleted.

 */
interface DeviceDeletedEvent {
  subject: Subjects.TaskDeleted;
  data: { id: string; jobId?: string; version: number } & AddonOwner;
}

/**
 * @interface DeviceGetRobotCandidateEvent
 * @description Defines a TypeScript interface for an event when requesting a robot candidate for a task.

 */
interface DeviceGetRobotCandidateEvent {
  subject: Subjects.RobotGetCandidate;
  data: { taskId: string; version: number };
}

/**
 * Event interface for when an IoT device should be added to device orchestator.
 *
 * @interface IotDeviceOrchestratorAddEvent
 *
 * @property {Subjects.IotDeviceOrchestrator} subject - The subject of the event, indicating that an IoT device scheduler has been added.
 * @property {IoTDeviceInterface & { version: number }} data - The data associated with the event, including the version number.
 */
interface IotDeviceOrchestratorAddEvent {
  subject: Subjects.IotDeviceOrchestratorAdd;
  data: IoTDeviceInterface & { version: number };
}

interface IotDeviceOrchestratorUpdateEvent {
  subject: Subjects.IotDeviceOrchestratorUpdate;
  data: Partial<IoTDeviceInterface>;
}

interface IotDeviceOrchestratorRemoveEvent {
  subject: Subjects.IotDeviceOrchestratorRemove;
  data: { deviceId: string; version: number };
}

interface IotDeviceOrchestratorStatusEvent {
  subject: Subjects.IotDeviceOrchestratorStatus;
  data: {
    status: StatusResponse;
    data: IoTDeviceInterface;
  };
}

export {
  DeviceCreatedEvent,
  DeviceDeletedEvent,
  DeviceUpdatedEvent,
  DeviceGetRobotCandidateEvent,
  IotDeviceOrchestratorAddEvent,
  IotDeviceOrchestratorUpdateEvent,
  IotDeviceOrchestratorRemoveEvent,
  IotDeviceOrchestratorStatusEvent,
};
