/**
 * Enumerates the possible status values for an operator.
 */
export enum OperatorStatus {
  /** The operator's status is pending approval. */
  Pending = "pending",
  /** The operator's application has been denied. */
  Denied = "denied",
  /** The operator's application has been approved. */
  Approved = "approved",
  /** The operator's access level has been blocked. */
  Blocked = "blocked",
}
