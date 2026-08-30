/**
 * Al-Muhandis Platform - Payment Provider Abstraction Types
 * Master Specification - Phase 0
 */

export enum PaymentProviderType {
  NONE = 'NONE',
  PAYMOB = 'PAYMOB',
  STRIPE = 'STRIPE',
  FAWRY = 'FAWRY',
  KASHIER = 'KASHIER',
  MOCK = 'MOCK',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  CANCELED = 'CANCELED',
}

export enum Currency {
  EGP = 'EGP',
  USD = 'USD',
  SAR = 'SAR',
  AED = 'AED',
  EUR = 'EUR',
}

export interface InitiatePaymentRequest {
  orderId: string;
  amount: number;
  currency: Currency;
  customer: {
    id: string;
    email: string;
    name: string;
    phone?: string;
  };
  description: string;
  metadata?: Record<string, unknown>;
  callbackUrl: string;
  cancelUrl: string;
}

export interface InitiatePaymentResponse {
  transactionId: string;
  provider: PaymentProviderType;
  redirectUrl?: string;
  clientSecret?: string;
  paymentToken?: string;
  rawResponse?: Record<string, unknown>;
  status: PaymentStatus;
}

export interface VerifyPaymentRequest {
  transactionId: string;
  rawPayload?: Record<string, unknown>;
  signature?: string;
}

export interface VerifyPaymentResponse {
  transactionId: string;
  orderId: string;
  status: PaymentStatus;
  amount: number;
  currency: Currency;
  paidAt?: Date;
  providerTransactionId: string;
  paymentMethod?: string;
  rawResponse?: Record<string, unknown>;
}

export interface WebhookEventPayload {
  provider: PaymentProviderType;
  eventType: string;
  signature: string;
  rawBody: string | Buffer;
  headers: Record<string, string | string[] | undefined>;
}
