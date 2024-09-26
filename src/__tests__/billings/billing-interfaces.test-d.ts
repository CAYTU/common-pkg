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
  BillingServices,
} from "../../types/utils";
import { expectType } from "tsd";
import { UsageStatus, UsageType } from "../../billings/enums";

// PlanInterface tests
const plan: PlanInterface = {
  title: "Premium Plan",
  type: PlanType.Professional,
  subcategories: [
    {
      type: PlanSubcategory.IoT,
      features: [
        new Types.ObjectId(),
        new Types.ObjectId(),
        new Types.ObjectId(),
      ],
    },
    {
      type: PlanSubcategory.Robot,
      features: [
        new Types.ObjectId(),
        new Types.ObjectId(),
        new Types.ObjectId(),
      ],
    },
  ],
  isCustom: false,
};

expectType<string>(plan.title);
expectType<PlanType>(plan.type);
expectType<Types.ObjectId[] | undefined>(plan.features);
expectType<PlanSubcategoryDetails[] | undefined>(plan.subcategories);
expectType<boolean>(plan.isCustom);

// PlanFeature tests
const planFeature_one: PlanFeature = {
  stripeProductId: "prod_12345",
  service: BillingServices.Device,
  displayName: "Devices",
  unitOfMeasurement: UnitOfMeasurement.Device,
  costPerUnit: 0.05,
  freeQuota: 1,
  isCustomizable: false,
};

expectType<string | undefined>(planFeature_one.stripeProductId);
expectType<number>(planFeature_one.costPerUnit);
expectType<number | undefined>(planFeature_one.freeQuota);
expectType<boolean>(planFeature_one.isCustomizable);
expectType<BillingServices>(planFeature_one.service);

const planFeature_two: PlanFeature = {
  service: BillingServices.Avatar,
  displayName: "Avatar",
  unitOfMeasurement: UnitOfMeasurement.Hour,
  costPerUnit: 3,
  isCustomizable: false,
};

expectType<number>(planFeature_two.costPerUnit);
expectType<number | undefined>(planFeature_two.freeQuota);
expectType<boolean>(planFeature_two.isCustomizable);
expectType<BillingServices>(planFeature_two.service);

// UsageInterface tests
const usage: UsageInterface = {
  organizationId: new Types.ObjectId(),
  subscriptionId: new Types.ObjectId(),
  service: BillingServices.Avatar,
  creditConsumed: 10,
  serviceRefId: new Types.ObjectId()?.toString(),
  creditRemaining: 90,
  userId: new Types.ObjectId(),
  totalCost: 100,
  duration: 0,
  usageType: UsageType.Recurring,
  status: UsageStatus.Waiting,
};

expectType<Types.ObjectId>(usage.organizationId);
expectType<Types.ObjectId>(usage.subscriptionId);
expectType<BillingServices | undefined>(usage.service);
expectType<number>(usage.creditConsumed);
expectType<number | undefined>(usage.creditRemaining);
expectType<number>(usage.totalCost);
expectType<UsageStatus>(usage.status);

describe("Billing Interfaces", () => {
  describe("PlanInterface", () => {
    it("should create a valid plan object", () => {
      const plan: PlanInterface = {
        title: "Enterprise Plan",
        type: PlanType.Enterprise,
        features: [
          new Types.ObjectId(),
          new Types.ObjectId(),
          new Types.ObjectId(),
        ],
        isCustom: true,
      };

      expect(plan).toHaveProperty("title");
      expect(plan).toHaveProperty("type");
      expect(plan).toHaveProperty("features");
      expect(plan).toHaveProperty("isCustom");
    });
  });

  describe("UsageInterface", () => {
    it("should create a valid usage object", () => {
      const usage: UsageInterface = {
        organizationId: new Types.ObjectId(),
        subscriptionId: new Types.ObjectId(),
        service: BillingServices.Avatar,
        creditConsumed: 5,
        creditRemaining: 45,
        userId: new Types.ObjectId(),
        serviceRefId: new Types.ObjectId()?.toString(),
        totalCost: 50,
        duration: 0,
        usageType: UsageType.Recurring,
        status: UsageStatus.Billed,
      };

      expect(usage).toHaveProperty("organizationId");
      expect(usage).toHaveProperty("subscriptionId");
      expect(usage).toHaveProperty("service");
      expect(usage).toHaveProperty("creditConsumed");
      expect(usage).toHaveProperty("creditRemaining");
      expect(usage).toHaveProperty("userId");
      expect(usage).toHaveProperty("serviceRefId");
      expect(usage).toHaveProperty("totalCost");
      expect(usage).toHaveProperty("duration");
      expect(usage).toHaveProperty("status");
    });
  });
});
