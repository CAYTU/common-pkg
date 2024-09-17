//

export enum PaymentStatus {
  Pending = "pending",
  Succeeded = "succeeded",
  Cancelled = "cancelled",
  Failed = "failed",
}

export enum PaymentMethod {
  CreditCard = "creditCard",
  // Local payment method
  Wave = "wave",
  OrangeMoney = "orangeMoney",
}
