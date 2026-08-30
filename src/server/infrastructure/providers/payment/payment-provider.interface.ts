/**
 * Al-Muhandis Platform - Payment Provider Interface & Abstraction
 * Master Specification - Phase 0
 */

import {
  PaymentProviderType,
  InitiatePaymentRequest,
  InitiatePaymentResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
  WebhookEventPayload,
} from '../../../../shared/types/payment.ts';

export interface IPaymentProvider {
  readonly providerType: PaymentProviderType;

  /**
   * Initializes a payment checkout transaction with the gateway
   */
  initiatePayment(request: InitiatePaymentRequest): Promise<InitiatePaymentResponse>;

  /**
   * Verifies the authenticity and status of a payment transaction
   */
  verifyPayment(request: VerifyPaymentRequest): Promise<VerifyPaymentResponse>;

  /**
   * Validates and parses gateway incoming webhooks
   */
  handleWebhook(event: WebhookEventPayload): Promise<{ isVerified: boolean; orderId: string; status: string }>;
}
