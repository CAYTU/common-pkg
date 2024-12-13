/**
 * Enum representing the status of an operator.
 *
 * @enum {string}
 * @property {string} SUSPENDED - The operator is suspended.
 * @property {string} ACTIVE - The operator is active.
 * @property {string} INACTIVE - The operator is inactive.
 * @property {string} DENIED - The operator is denied.
 */
export enum OperatorStatus {
  SUSPENDED = "SUSPENDED",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DENIED = "DENIED",
}
