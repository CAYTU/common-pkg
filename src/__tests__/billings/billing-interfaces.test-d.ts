// File: src/__tests__/billings/billing-interfaces.test.ts

import {
  PlanInterface,
  PaymentInterface,
  SubscriptionInterface,
  UsageInterface,
} from "../../billings/models";
import { Types } from "mongoose";
import {
  PaymentMethod,
  PaymentStatus,
  Services,
  SubscriptionStatus,
  SubscriptionType,
} from "../../types/utils";

import { expectType } from "tsd";
import {
  PlanFeatureInterface,
  OrganizationPlanFeatureInterface,
} from "../../billings/models";

// PlanInterface tests
const plan: PlanInterface = {
  title: "Basic Plan",
  price: 9.99,
  billingCycle: "monthly",
  type: "free" as SubscriptionType,
  features: { users: 5, storage: "5GB" },
};

expectType<string>(plan.title);
expectType<number | undefined>(plan.price);
expectType<"monthly" | "yearly">(plan.billingCycle);
expectType<SubscriptionType>(plan.type);
expectType<Record<string, any>>(plan.features);

// PlanFeatureInterface tests
const planFeature: PlanFeatureInterface = {
  name: "storage",
  displayName: "Storage",
  type: "string",
  isCustomizable: true,
};

expectType<"boolean" | "string" | "number">(planFeature.type);
expectType<boolean>(planFeature.isCustomizable);

// OrganizationPlanFeatureInterface tests
const orgPlanFeature: OrganizationPlanFeatureInterface = {
  organizationId: new Types.ObjectId(),
  planId: new Types.ObjectId(),
  featureName: "storage",
  value: "10GB",
};

expectType<Types.ObjectId>(orgPlanFeature.organizationId);
expectType<Types.ObjectId>(orgPlanFeature.planId);
expectType<string>(orgPlanFeature.featureName);
expectType<any>(orgPlanFeature.value);

// PaymentInterface tests
const payment: PaymentInterface = {
  organizationId: new Types.ObjectId(),
  amount: 99.99,
  currency: "USD",
  paymentStatus: "completed" as PaymentStatus,
  paymentMethod: "CreditCard" as PaymentMethod,
  isSubscribed: true,
  transactionId: "txn_123456",
};

expectType<Types.ObjectId>(payment.organizationId);
expectType<number>(payment.amount);
expectType<PaymentStatus>(payment.paymentStatus);
expectType<PaymentMethod>(payment.paymentMethod);
expectType<boolean>(payment.isSubscribed);

// SubscriptionInterface tests
const subscription: SubscriptionInterface = {
  planId: new Types.ObjectId(),
  subscriptionType: "premium" as SubscriptionType,
  organizationId: new Types.ObjectId(),
  subscriptionStatus: "active" as SubscriptionStatus,
};

expectType<Types.ObjectId>(subscription.planId);
expectType<SubscriptionType>(subscription.subscriptionType);
expectType<SubscriptionStatus | undefined>(subscription.subscriptionStatus);

// UsageInterface tests
const usage: UsageInterface = {
  service: "billing" as Services,
  organizationId: new Types.ObjectId(),
  subscriptionId: new Types.ObjectId(),
  creditUsed: 100,
  creditInAmount: 50,
  ratePerHour: 10,
};

expectType<Services>(usage.service);
expectType<Types.ObjectId>(usage.organizationId);
expectType<number>(usage.creditUsed);

describe("Billing Interfaces", () => {
  describe("PlanInterface", () => {
    it("should create a valid plan object", () => {
      const plan: PlanInterface = {
        title: "Premium Plan",
        price: 19.99,
        billingCycle: "yearly",
        type: SubscriptionType.Professional,
        features: { users: "unlimited", storage: "100GB" },
      };

      expect(plan).toHaveProperty("title");
      expect(plan).toHaveProperty("price");
      expect(plan).toHaveProperty("billingCycle");
      expect(plan).toHaveProperty("type");
      expect(plan).toHaveProperty("features");
    });
  });

  describe("PaymentInterface", () => {
    it("should create a valid payment object", () => {
      const payment: PaymentInterface = {
        organizationId: new Types.ObjectId(),
        amount: 99.99,
        currency: "USD",
        paymentStatus: PaymentStatus.Succeeded,
        paymentMethod: PaymentMethod.CreditCard,
        isSubscribed: true,
        transactionId: "txn_123456",
      };

      expect(payment).toHaveProperty("organizationId");
      expect(payment).toHaveProperty("amount");
      expect(payment).toHaveProperty("currency");
      expect(payment).toHaveProperty("paymentStatus");
      expect(payment).toHaveProperty("paymentMethod");
      expect(payment).toHaveProperty("isSubscribed");
      expect(payment).toHaveProperty("transactionId");
    });
  });

  describe("SubscriptionInterface", () => {
    it("should create a valid subscription object", () => {
      const subscription: SubscriptionInterface = {
        planId: new Types.ObjectId(),
        subscriptionType: SubscriptionType.Professional,
        organizationId: new Types.ObjectId(),
        subscriptionStatus: SubscriptionStatus.Active,
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(),
      };

      expect(subscription).toHaveProperty("planId");
      expect(subscription).toHaveProperty("subscriptionType");
      expect(subscription).toHaveProperty("organizationId");
      expect(subscription).toHaveProperty("subscriptionStatus");
      expect(subscription).toHaveProperty("currentPeriodStart");
      expect(subscription).toHaveProperty("currentPeriodEnd");
    });
  });

  describe("UsageInterface", () => {
    it("should create a valid usage object", () => {
      const usage: UsageInterface = {
        service: Services.Payment,
        organizationId: new Types.ObjectId(),
        subscriptionId: new Types.ObjectId(),
        creditUsed: 100,
        creditInAmount: 50,
        ratePerHour: 10,
      };

      expect(usage).toHaveProperty("service");
      expect(usage).toHaveProperty("organizationId");
      expect(usage).toHaveProperty("subscriptionId");
      expect(usage).toHaveProperty("creditUsed");
      expect(usage).toHaveProperty("creditInAmount");
      expect(usage).toHaveProperty("ratePerHour");
    });
  });
});
