import { Types } from "mongoose";

import {
  PaymentMethod,
  PaymentStatus,
  Services,
  SubscriptionStatus,
  SubscriptionType,
} from "../../types/utils";

/**
 * Plans Interface:
 */
export interface PlanInterface {
  title: string;
  price?: number;
  billingCycle: "monthly" | "yearly";
  type: SubscriptionType;
  features: Record<string, any>;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface PlanFeatureInterface {
  name: string;
  displayName: string;
  type: "boolean" | "string" | "number";
  isCustomizable: boolean; // Whether the feature is customizable by the organization

  createdAt?: Date;
  updatedAt?: Date;
}

// Organization-specific Plan Feature Schema
export interface OrganizationPlanFeatureInterface {
  organizationId: Types.ObjectId;
  planId: Types.ObjectId;
  featureName: string;
  value: any;

  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Payment
 */
export interface PaymentInterface {
  /**
   * The unique identifier of the organization to which the payment is made.
   */
  organizationId: Types.ObjectId;

  /**
   * The unique identifier of the order for which the payment is made.
   *
   * @deprecated this field is deprecated and will be removed in the future.
   */
  orderId?: Types.ObjectId;

  /**
   * The unique identifier of the transient user if the payment is not from a registered user.
   *
   * @deprecated this field is deprecated and will be removed in the future.
   */
  transientUserId?: Types.ObjectId;

  /**
   * The amount of the payment.
   */
  amount: number;

  /**
   * The equivalent amount in credit units.
   */
  creditUnits?: number;

  /**
   * The currency of the payment.
   */
  currency: string;

  /**
   * The status of the payment.
   */
  paymentStatus: PaymentStatus;

  /**
   * The method of payment.
   */
  paymentMethod: PaymentMethod; // e.g., "CreditCard", "OrangeMoney", "Wave"

  /**
   * the subscription which the user is paying for.
   */
  subscriptionId?: Types.ObjectId;

  /**
   * Whether the user is subscribed to a plan or not.
   */
  isSubscribed: boolean;

  /**
   * The unique identifier of the transaction.
   * For Stripe, this is the charge ID.
   * For Wave or Orange Money, this is the transaction ID.
   */
  transactionId?: string;

  /**
   * The URL for payment if the payment method requires scanning a code.
   * This applies to methods like Orange Money and Wave.
   */
  paymentUrl?: string;

  /**
   * The code received after scanning the payment URL.
   * This applies to methods like Orange Money and Wave.
   */
  paymentCode?: string;

  /**
   * A description or memo for the payment.
   */
  description?: string;
}

export interface SubscriptionInterface {
  planId: Types.ObjectId;
  /**
   * The type of subscription.
   */
  subscriptionType: SubscriptionType;

  /**
   * The unique identifier of the user who owns the subscription.
   */
  organizationId: Types.ObjectId;

  /**
   * The status of the subscription.
   */
  subscriptionStatus?: SubscriptionStatus;

  /**
   * The start date of the subscription.
   */
  currentPeriodStart?: Date;

  /**
   * The end date of the subscription.
   */
  currentPeriodEnd?: Date;

  stripeSubscriptionId?: string;

  stripeCustomerId?: string;

  /**
   * The type of subscription the user wants to change to.
   */
  requestedChangeType?: SubscriptionType;

  /**
   * Whether the user has requested a change of plan.
   */
  hasRequestedChange?: boolean;

  requestPayload?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Usage Interface for tracking usage of a subscription.
 *
 * It tracks per device, user-member, tasks, etc
 */
export interface UsageInterface {
  service: Services;
  serviceRefId?: Types.ObjectId;
  organizationId: Types.ObjectId;
  subscriptionId: Types.ObjectId;
  creditUsed: number;
  user?: Types.ObjectId;
  creditInAmount?: number;
  ratePerHour?: number;

  createdAt?: Date;
  updatedAt?: Date;
}
