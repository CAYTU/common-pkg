/**
 * @fileoverview Defines the event types and interfaces for the billing system's usage tracking.
 * @packageDocumentation
 * @module billings/events
 *
 * This module contains type definitions for all usage-related events in the billing system.
 * Events are categorized into lifecycle events (creation, updates, deletion) and
 * operational events (starting, ending, recording, failures).
 */

import { OnlyRequired } from "../../common";
import { Subjects } from "../../nats-events/subjects";
import { BillingServices } from "../../types/utils";
import { UsageInterface } from "../models";

// ============================================================================
// Base Types
// ============================================================================

/**
 * Common properties shared across usage events that involve service interaction
 */
interface BaseServiceEventData {
  /** Unique identifier for the service reference */
  serviceRefId: string;
  /** Type of billing service */
  service: BillingServices;
  /** Organization identifier */
  organizationId: string;
  /** Optional user identifier */
  userId?: string;
  /** Optional rate identifier for billing calculations */
  rateId?: string;
  /** Optional metadata for additional context */
  metadata?: any;
}

// ============================================================================
// Lifecycle Events
// ============================================================================

/**
 * Event emitted when a new usage record is created
 * @interface UsageCreatedEvent
 */
interface UsageCreatedEvent {
  subject: Subjects.UsageCreated;
  data: UsageInterface & OnlyRequired;
}

/**
 * Event emitted when an existing usage record is updated
 * @interface UsageUpdatedEvent
 */
interface UsageUpdatedEvent {
  subject: Subjects.UsageUpdated;
  data: Partial<UsageInterface> & OnlyRequired;
}

/**
 * Event emitted when a usage record is deleted
 * @interface UsageDeletedEvent
 */
interface UsageDeletedEvent {
  subject: Subjects.UsageDeleted;
  data: {
    /** Unique identifier of the deleted usage record */
    id: string;
    /** Version number for optimistic concurrency control */
    version: number;
  };
}

// ============================================================================
// Operational Events
// ============================================================================

/**
 * Event emitted when a service usage period begins
 * @interface UsageStartedEvent
 */
interface UsageStartedEvent {
  subject: Subjects.UsageStarted;
  data: BaseServiceEventData;
}

/**
 * Event emitted when a service usage period ends
 * @interface UsageEndedEvent
 */
interface UsageEndedEvent {
  subject: Subjects.UsageEnded;
  data: BaseServiceEventData;
}

/**
 * Event emitted when usage metrics are recorded
 * @interface UsageRecordedEvent
 * @extends Adds duration to BaseServiceEventData
 */
interface UsageRecordedEvent {
  subject: Subjects.UsageRecorded;
  data: BaseServiceEventData & {
    /** Duration of the usage in milliseconds */
    duration: number;
  };
}

/**
 * Event emitted when a usage operation fails
 * @interface UsageFailedEvent
 */
interface UsageFailedEvent {
  subject: Subjects.UsageFailed;
  data: {
    /** Identifier of the failed usage record */
    id: string;
    /** Associated task identifier */
    taskId: string;
  };
}

// ============================================================================
// Exports
// ============================================================================

export {
  // Base Types
  BaseServiceEventData,

  // Lifecycle Events
  UsageCreatedEvent,
  UsageUpdatedEvent,
  UsageDeletedEvent,

  // Operational Events
  UsageStartedEvent,
  UsageEndedEvent,
  UsageRecordedEvent,
  UsageFailedEvent,
};
