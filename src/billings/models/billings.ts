import { Types } from "mongoose";
import {
  PlanType,
  PlanSubcategory,
  UnitOfMeasurement,
  SubscriptionStatus,
  PaymentStatus,
  PaymentMethod,
} from "../../types/utils";
import { IMongooseObjectExt } from "../../types/utils/models";
import { TaskType } from "../../tasks/enums";

/**
 * Represents the payment model executed by an organization for a subscription or usage.
 */
export interface PaymentInterface {
  /** The unique identifier of the organization to which the payment is made. */
  organizationId: Types.ObjectId;
  /** @deprecated A unique identifier of the order for which the payment is made. */
  orderId?: Types.ObjectId;
  /**  @deprecated unique identifier of the transient user if the payment is not from a registered user. */
  transientUserId?: Types.ObjectId;
  /** The amount of the payment. */
  amount: number;
  /** The equivalent amount in credit units. */
  creditUnits?: number;
  /** The currency of the payment. */
  currency: string;
  /** The status of the payment. */
  paymentStatus: PaymentStatus;
  /** The method of payment. */
  paymentMethod: PaymentMethod; // e.g., "CreditCard", "OrangeMoney", "Wave"
  /** the subscription which the user is paying for.*/
  subscriptionId?: Types.ObjectId;
  /**  The unique identifier of the transaction.*/
  transactionId?: string;
  /** The URL for payment if the payment method requires scanning a code. */
  paymentUrl?: string;
  /**
   * The code received after scanning the payment URL.
   * This applies to methods like Orange Money and Wave.
   */
  paymentCode?: string;
  /** A description or memo for the payment. */
  description?: string;
}

/**
 * Represents a feature of a plan with its properties and pricing details.
 */
export interface PlanFeature {
  /** The unique identifier of the feature */
  name: string;
  /** The human-readable name of the feature */
  displayName: string;
  /** The unit of measurement for this feature's usage */
  unitOfMeasurement: UnitOfMeasurement;
  /** The cost per unit of usage */
  costPerUnit: number;
  /** Any free quota included in the plan */
  freeQuota?: number;
  /** Indicates if the feature can be customized for specific organizations */
  isCustomizable: boolean;
  /** Any constraints or limits on the feature's usage */
  constraints?: {
    min?: number;
    max?: number;
    step?: number;
  };
}

/**
 * Represents a subcategory of a plan with its specific features.
 */
export interface PlanSubcategoryDetails {
  /** The type of subcategory (e.g., 'iot', 'robot') */
  type: PlanSubcategory;
  /** Features specific to this subcategory */
  features: Record<string, PlanFeature>;
}

/**
 * Represents a subscription plan with its details, features, and subcategories.
 */
export interface PlanInterface extends IMongooseObjectExt {
  /** The name of the plan */
  title: string;
  /** The type of the plan */
  type: PlanType;
  /** Features common to all subcategories of the plan */
  commonFeatures: Record<string, PlanFeature>;
  /** Subcategories of the plan with their specific details */
  subcategories: PlanSubcategoryDetails[];
  /** Minimum commitment amount, if any */
  minimumCommitment?: number;
  /** Indicates if this is a custom enterprise plan */
  isCustom: boolean;
  /** The ID of the organization for custom enterprise plans */
  organizationId?: Types.ObjectId;
  /** Reference to the base plan for custom plans */
  baseplanId?: Types.ObjectId;
}

/**
 * Represents the subscription interface chosen by an organization.
 */
export interface SubscriptionInterface extends IMongooseObjectExt {
  planId: Types.ObjectId;
  /** The unique identifier of the user who owns the subscription. */
  organizationId: Types.ObjectId;
  /** The status of the subscription. */
  subscriptionStatus?: SubscriptionStatus;
  /** The start date of the subscription. */
  currentPeriodStart?: Date;
  /**  The end date of the subscription. */
  currentPeriodEnd?: Date;
  /** The id of the subscription in the stripe system */
  stripeSubscriptionId?: string;
  /**  The id of the customer in the stripe system */
  stripeCustomerId?: string;
  /** The type of subscription plan the user wants to change to. */
  requestPlanChangeType?: PlanType;
  /** Whether the user has requested a change of plan. */
  hasRequestedChange?: boolean;
  /**  A stringified JSON object containing the payload of the request. */
  requestPayload?: string;
}

/**
 * Represents the usage tracking for a subscription.
 */
export interface UsageInterface extends IMongooseObjectExt {
  /** The ID of the organization associated with this usage */
  organizationId: Types.ObjectId;
  /** The ID of the subscription associated with this usage */
  subscriptionId: Types.ObjectId;
  /** The type for which the usage is tracked */
  taskType?: TaskType;
  /** The id of the task */
  taskId?: string;
  /** The amount of credit units remaining */
  creditRemaining?: number;
  /** The amount of credit units consumed */
  creditConsumed: number;
  /** The user id of the user who consumed the credit */
  userId?: Types.ObjectId;
  /** Total cost for the current billing period */
  totalCost: number;
}
