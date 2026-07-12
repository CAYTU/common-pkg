import { Subjects } from "../../nats-events/subjects";

/**
 * Billings asks for a device license to be minted for an organization.
 *
 * Published when a super-admin approves an Enterprise subscription request and
 * grants a license with it. The licenses service listens and mints the signed
 * token.
 *
 * The payload deliberately carries the subscription state the licenses service
 * needs — plan type, expiry, entitled feature flags. Licenses otherwise reads
 * that from billings over HTTP by forwarding the *caller's* JWT, and an event
 * has no caller: it has no credential of its own to call back with. Carrying
 * the state makes the event self-contained and keeps the two services from
 * depending on each other at request time.
 */
export interface LicenseGrantRequestedEvent {
  subject: Subjects.LicenseGrantRequested;
  data: {
    organizationId: string;
    organizationName?: string;
    subscriptionId: string;
    /** Who approved it — the license is issued on their behalf. */
    requestedById: string;
    /** Days the license should run for; clamped to `subscriptionValidUntil`. */
    requestedDays?: number;
    /** Flags baked into the signed token. Defaults to the plan's. */
    features?: string[];
    /** Guard: licensing is an Enterprise entitlement. */
    planType?: string;
    planTitle?: string;
    /** A license must never outlive the subscription backing it. */
    subscriptionValidUntil?: string | null;
    version: number;
  };
}

/** A signed device license was minted. */
export interface LicenseIssuedEvent {
  subject: Subjects.LicenseIssued;
  data: {
    organizationId: string;
    licenseId: string;
    subscriptionId?: string;
    features: string[];
    notAfter: number;
    version: number;
  };
}
