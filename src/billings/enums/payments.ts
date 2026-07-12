export enum PaymentStatus {
  Pending = "pending",
  Succeeded = "succeeded",
  Cancelled = "cancelled",
  Failed = "failed",
  /**
   * Money returned to the customer. A payment can be refunded in several
   * partial steps, so this marks a payment refunded in full — how much came
   * back overall is the sum of its refund records.
   */
  Refunded = "refunded",
}

export enum PaymentMethod {
  CreditCard = "creditCard",
  Wave = "wave", // Local payment method
  OrangeMoney = "orangeMoney",
}

/** Enum for types of credits: free, bonus, or transferred */
export enum CreditType {
  Free = "free",
  Bonus = "bonus",
  Transferred = "transferred",
}

/** Enum for the origin of credits (who or what initiated the credit addition) */
export enum CreditSourceOrigin {
  System = "system", // System-generated credits (e.g., promotion)
  User = "user", // Transferred from another user
  Admin = "admin", // Admin manually added credits
  Promotion = "promotion", // Credits from a promotional event
  Referral = "referral", // Credits from referral programs
}
