/**
 * Enumerates the possible subscription statuses for a service.
 */
export enum SubscriptionStatus {
  Active = "active",
  Pending = "pending",
  Inactive = "inactive",
  Blocked = "blocked",
  Cancelled = "cancelled",

  PastDue = "past_due",
  Unpaid = "unpaid",
  Trial = "trial",

  CancelledPending = "cancelled_pending",
  Ended = "ended",
}
