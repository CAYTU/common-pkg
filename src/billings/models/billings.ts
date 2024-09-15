import { Types } from "mongoose";
import {
  PlanType,
  PlanSubcategory,
  UnitOfMeasurement,
} from "../../types/utils";
import { IMongooseObjectExt } from "../../types/utils/models";

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
  /** The billing cycle of the plan */
  billingCycle: "monthly" | "yearly";
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
 * Represents the usage tracking for a subscription.
 */
export interface UsageInterface extends IMongooseObjectExt {
  /** The ID of the organization associated with this usage */
  organizationId: Types.ObjectId;
  /** The ID of the subscription associated with this usage */
  subscriptionId: Types.ObjectId;
  /** The billing period start date */
  billingPeriodStart: Date;
  /** The billing period end date */
  billingPeriodEnd: Date;
  /** Usage details for each feature */
  featureUsage: Record<
    string,
    {
      quantity: number;
      cost: number;
    }
  >;
  /** Total cost for the current billing period */
  totalCost: number;
}
