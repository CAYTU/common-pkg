/**
 * Enumerates the possible subscription statuses for a service.
 */
export enum SubscriptionStatus {
  Active = "active",
  Pending = "pending",
  Inactive = "inactive",
  PastDue = "pastDue",
  Blocked = "blocked",
  Cancelled = "cancelled",
}
