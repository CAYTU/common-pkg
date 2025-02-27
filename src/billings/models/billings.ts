import { Types } from "mongoose";
import {
  PlanType,
  UnitOfMeasurement,
  BillingServices,
} from "../../types/utils";
import { IMongooseObjectExt } from "../../types/utils/models";
import {
  CreditSourceOrigin,
  CreditType,
  PaymentMethod,
  PaymentStatus,
  SubscriptionChangeResponseType,
  SubscriptionStatus,
  UsageStatus,
  UsageType,
} from "../enums";

/**
 * Represents the payment model executed by an organization for a subscription or usage.
 */
export interface PaymentInterface {
  /** The unique identifier of the organization to which the payment is made. */
  organizationId: Types.ObjectId;
  /** @deprecated A unique identifier of the order for which the payment is made. */
  orderId?: Types.ObjectId;
  /** @deprecated Unique identifier of the transient user if the payment is not from a registered user. */
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
  paymentMethod: PaymentMethod;
  /** The subscription which the user is paying for. */
  subscriptionId?: Types.ObjectId;
  /** The unique identifier of the transaction. */
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
  /** URL to the invoice for the payment */
  invoiceUrl?: string;

  /**
   * Indicates whether the payment was made to purchase credits.
   * If `true`, the payment is for credit purchase.
   * If `false`, the payment is for a subscription charge.
   */
  isCreditPurchase?: boolean;

  /** The type of credit added: could be free, bonus, or transferred. */
  creditType?: CreditType;

  /**
   * The source from which the credits are received.
   * Specifies the origin of the credit and includes the name of the entity/person who performed the transfer if applicable.
   */
  source?: {
    origin: CreditSourceOrigin;
    name?: string; // Name of the person or entity who initiated the transfer (if applicable)
  };
}

/**
 * Represents a feature of a plan with its properties and pricing details.
 */
export interface PlanFeature {
  /** The id of the product in the stripe system */
  stripeProductId?: string;
  /** The service it involves */
  service: BillingServices;
  /** The human-readable name of the feature */
  displayName: string;
  /** The unit of measurement for this feature's usage */
  unitOfMeasurement: UnitOfMeasurement;
  /** The cost per unit of usage */
  costPerUnit: number;
  /** Any free quota included in the plan */
  freeQuota?: number;
  /** Indicates if the feature is already in use */
  isUsed?: boolean;
  /** Indicates if the feature is used as a base feature (case: Avatar & Simulation) */
  isBaseFeature?: boolean;
}

/**
 * Represents a subcategory of a plan with its specific features.
 */
export interface PlanSubcategoryDetails {
  /** The type of subcategory (e.g., 'iot', 'robot') */
  type: string;
  /** The price set for this subcategory */
  price?: number | string;
  /** The stripe product ID for this subcategory */
  stripeProductId?: string;
  /** Features specific to this subcategory */
  features: Types.ObjectId[];
}

/**
 * Represents a subscription plan with its details, features, and subcategories.
 */
export interface PlanInterface extends IMongooseObjectExt {
  /** The name of the plan */
  title: string;
  /** The type of the plan */
  type: PlanType;
  /** Price set for the plan */
  price?: number | string;
  /** Features common to all subcategories of the plan */
  features?: Types.ObjectId[];
  /** Subcategories of the plan with their specific details */
  subcategories?: PlanSubcategoryDetails[];
  /** Indicates if this is a base plan */
  isBasePlan: boolean;
  /** The ID of the organization for custom enterprise plans */
  organizationId?: Types.ObjectId;
  /** Reference to the base plan for custom plans */
  baseplanId?: Types.ObjectId;
  /** Indicates if the plan is published */
  isPublished?: boolean;
}

/**
 * Represents the subscription interface chosen by an organization.
 */
export interface SubscriptionInterface extends IMongooseObjectExt {
  /** The ID of the plan associated with this subscription. */
  planId: Types.ObjectId;

  /** The unique identifier of the organization that owns the subscription. */
  organizationId: Types.ObjectId;

  /** To disable the billing for the organization so that the payment is done manually. */
  isBillingDisabled?: boolean;

  /** The status of the subscription. */
  subscriptionStatus: SubscriptionStatus;

  /** The start date of the current subscription period. */
  currentPeriodStart?: Date;

  /** The end date of the current subscription period. */
  currentPeriodEnd?: Date;

  /** The ID of the subscription in the Stripe system. */
  stripeSubscriptionId?: string;

  /** The ID of the customer in the Stripe system. */
  stripeCustomerId?: string;

  /** The type of subscription plan the user wants to change to. */
  requestPlanChangeType?: PlanType;

  /** Whether the user has requested a change of plan. */
  hasRequestedChange?: boolean;

  /**  The status of the request to change the subscription plan. */
  changePlanRequestStatus?: SubscriptionChangeResponseType;

  /** The ID of the plan the user wants to change to. */
  changePlanId?: Types.ObjectId;

  /** A stringified JSON object containing the payload of the change request. */
  requestPayload?: string;

  /** Indicates whether payment was bypassed for this subscription. */
  paymentBypassed?: boolean;

  /** The ID of the admin who last modified this subscription. */
  lastModifiedBy?: Types.ObjectId;

  /** The date when this subscription was last modified. */
  lastModifiedDate?: Date;

  /** The reason for bypassing payment, if applicable. */
  bypassReason?: string;

  /** The date until which this subscription is valid, if different from currentPeriodEnd. */
  validUntil?: Date;

  /** Any additional notes or comments about this subscription. */
  notes?: string;

  /** The reason for rejecting the change request, if applicable. */
  rejectedChangeReason?: string;
}

/**
 * Represents the usage tracking for a subscription.
 */
export interface UsageInterface extends IMongooseObjectExt {
  /** The ID of the organization associated with this usage */
  organizationId: Types.ObjectId;
  /** The ID of the subscription associated with this usage */
  subscriptionId: Types.ObjectId;
  /** The service for which the usage is tracked */
  service?: BillingServices;
  /** The id of the service instance */
  serviceRefId?: string;
  /** The amount of credit units remaining */
  creditRemaining?: number;
  /** The amount of credit units consumed */
  creditConsumed: number;
  /** The user id of the user who consumed the credit */
  userId?: Types.ObjectId;
  /** Total cost for the current billing period */
  totalCost: number;
  /** Duration of the usage */
  duration: number;
  /** The amount of usage for quantity-based services */
  quantity?: number;
  /** Metadata for the usage */
  metadata?: any;
  /** The status of the usage */
  status: UsageStatus;
  /** The type of usage */
  usageType: UsageType;
  /** Indicates whether the usage has been billed */
  isBilled: boolean;
}
