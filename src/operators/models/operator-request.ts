import { OperatorRequestStatus } from "../enums";
import { IdentityType } from "../types";

/**
 * Interface representing the data required for an operator request.
 */
export interface OperatorRequestData {
  /**
   * The type of identity associated with the operator request.
   * This field is optional.
   */
  identityType?: IdentityType;

  /**
   * The status of the operator request.
   */
  status: OperatorRequestStatus;

  /**
   * The photo of the identity associated with the operator request.
   * This field is optional.
   */
  identityPhoto?: string;

  /**
   * The number of the identity associated with the operator request.
   * This field is optional.
   */
  identityNumber?: string;

  /**
   * The message associated with the operator request.
   */
  message: string;
}
