/**
 * Enumerates the possible subscription statuses for a service.
 */
export enum SubscriptionStatus {
  Active = "active",
  Pending = "pending",
  Blocked = "blocked",
  Cancelled = "cancelled",
  PastDue = "past_due",
  Unpaid = "unpaid",
  CancelledPending = "cancelled_pending",
  Ended = "ended",
}

/**
 * Enumerates the possible types of response for a subscription change request.
 */
export enum SubscriptionChangeResponseType {
  Approved = "approved",
  Rejected = "rejected",
  Pending = "pending",
  UnderReview = "under_review",
  NeedsInformation = "needs_information",
}
