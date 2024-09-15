import {
  PlanInterface,
  PlanFeature,
  PlanSubcategoryDetails,
  UsageInterface,
} from "../../billings/models";
import { Types } from "mongoose";
import {
  PlanType,
  PlanSubcategory,
  UnitOfMeasurement,
} from "../../types/utils";
import { expectType } from "tsd";

// PlanInterface tests
const plan: PlanInterface = {
  title: "Premium Plan",
  type: PlanType.Professional,
  commonFeatures: {
    users: {
      name: "users",
      displayName: "Users",
      unitOfMeasurement: UnitOfMeasurement.Count,
      costPerUnit: 10,
      freeQuota: 5,
      isCustomizable: false,
    },
  },
  subcategories: [
    {
      type: PlanSubcategory.IoT,
      features: {
        storage: {
          name: "storage",
          displayName: "Storage",
          unitOfMeasurement: UnitOfMeasurement.Gigabyte,
          costPerUnit: 0.05,
          freeQuota: 10,
          isCustomizable: true,
        },
      },
    },
  ],
  isCustom: false,
};

expectType<string>(plan.title);
expectType<PlanType>(plan.type);
expectType<Record<string, PlanFeature>>(plan.commonFeatures);
expectType<PlanSubcategoryDetails[]>(plan.subcategories);
expectType<boolean>(plan.isCustom);

// PlanFeature tests
const planFeature: PlanFeature = {
  name: "storage",
  displayName: "Storage",
  unitOfMeasurement: UnitOfMeasurement.Gigabyte,
  costPerUnit: 0.05,
  freeQuota: 10,
  isCustomizable: true,
  constraints: {
    min: 0,
    max: 100,
    step: 10,
  },
};

expectType<string>(planFeature.name);
expectType<number>(planFeature.costPerUnit);
expectType<number | undefined>(planFeature.freeQuota);
expectType<boolean>(planFeature.isCustomizable);
expectType<{ min?: number; max?: number; step?: number } | undefined>(
  planFeature.constraints
);

// UsageInterface tests
const usage: UsageInterface = {
  organizationId: new Types.ObjectId(),
  subscriptionId: new Types.ObjectId(),
  billingPeriodStart: new Date(),
  billingPeriodEnd: new Date(),
  featureUsage: {
    users: {
      quantity: 10,
      cost: 100,
    },
  },
  totalCost: 100,
};

expectType<Types.ObjectId>(usage.organizationId);
expectType<Types.ObjectId>(usage.subscriptionId);
expectType<Date>(usage.billingPeriodStart);
expectType<Date>(usage.billingPeriodEnd);
expectType<Record<string, { quantity: number; cost: number }>>(
  usage.featureUsage
);
expectType<number>(usage.totalCost);

describe("Billing Interfaces", () => {
  describe("PlanInterface", () => {
    it("should create a valid plan object", () => {
      const plan: PlanInterface = {
        title: "Enterprise Plan",
        type: PlanType.Enterprise,
        commonFeatures: {
          support: {
            name: "support",
            displayName: "Priority Support",
            unitOfMeasurement: UnitOfMeasurement.Boolean,
            costPerUnit: 0,
            freeQuota: 1,
            isCustomizable: false,
          },
        },
        subcategories: [
          {
            type: PlanSubcategory.IoT,
            features: {
              devices: {
                name: "devices",
                displayName: "Connected Devices",
                unitOfMeasurement: UnitOfMeasurement.Count,
                costPerUnit: 1,
                freeQuota: 50,
                isCustomizable: true,
              },
            },
          },
        ],
        isCustom: false,
      };

      expect(plan).toHaveProperty("title");
      expect(plan).toHaveProperty("type");
      expect(plan).toHaveProperty("commonFeatures");
      expect(plan).toHaveProperty("subcategories");
      expect(plan).toHaveProperty("isCustom");
    });
  });

  describe("UsageInterface", () => {
    it("should create a valid usage object", () => {
      const usage: UsageInterface = {
        organizationId: new Types.ObjectId(),
        subscriptionId: new Types.ObjectId(),
        billingPeriodStart: new Date(),
        billingPeriodEnd: new Date(),
        featureUsage: {
          storage: {
            quantity: 50,
            cost: 2.5,
          },
        },
        totalCost: 50,
      };

      expect(usage).toHaveProperty("organizationId");
      expect(usage).toHaveProperty("subscriptionId");
      expect(usage).toHaveProperty("billingPeriodStart");
      expect(usage).toHaveProperty("billingPeriodEnd");
      expect(usage).toHaveProperty("featureUsage");
      expect(usage).toHaveProperty("totalCost");
    });
  });
});
