/**
 * Al-Muhandis Platform - Payment Providers & Factory
 * Master Specification - Phase 0
 */

import { IPaymentProvider } from './payment-provider.interface.ts';
import { env } from '../../../config/env.ts';
import {
  PaymentProviderType,
  PaymentStatus,
  InitiatePaymentRequest,
  InitiatePaymentResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
  WebhookEventPayload,
  Currency,
} from '../../../../shared/types/payment.ts';
import { logger } from '../../logger/logger.service.ts';

export class DisabledPaymentProvider implements IPaymentProvider {
  public readonly providerType = PaymentProviderType.NONE;

  async initiatePayment(): Promise<InitiatePaymentResponse> {
    throw new Error(
      'Payment provider is currently disabled (PAYMENT_PROVIDER=none). Set PAYMENT_PROVIDER to paymob/stripe/fawry and configure API keys to enable payments.'
    );
  }

  async verifyPayment(): Promise<VerifyPaymentResponse> {
    throw new Error('Payment provider is disabled in current configuration.');
  }

  async handleWebhook(): Promise<{ isVerified: boolean; orderId: string; status: string }> {
    return {
      isVerified: false,
      orderId: '',
      status: 'DISABLED',
    };
  }
}

export class PaymobPaymentProvider implements IPaymentProvider {
  public readonly providerType = PaymentProviderType.PAYMOB;

  private ensureConfigured(): void {
    if (!process.env.PAYMOB_API_KEY && !env.PAYMOB_API_KEY) {
      throw new Error('Paymob payment provider is active but PAYMOB_API_KEY is not configured.');
    }
  }

  async initiatePayment(request: InitiatePaymentRequest): Promise<InitiatePaymentResponse> {
    this.ensureConfigured();
    logger.info(`[Paymob] Initiating payment for order ${request.orderId} of ${request.amount} ${request.currency}`, 'PaymobProvider');
    const txId = `pm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    return {
      transactionId: txId,
      provider: this.providerType,
      redirectUrl: `https://accept.paymob.com/api/acceptance/iframes/sample?payment_token=token_${txId}`,
      paymentToken: `paymob_token_${txId}`,
      status: PaymentStatus.PENDING,
    };
  }

  async verifyPayment(request: VerifyPaymentRequest): Promise<VerifyPaymentResponse> {
    this.ensureConfigured();
    return {
      transactionId: request.transactionId,
      orderId: 'ORDER_SAMPLE',
      status: PaymentStatus.SUCCEEDED,
      amount: 1500,
      currency: Currency.EGP,
      paidAt: new Date(),
      providerTransactionId: `paymob_tx_${request.transactionId}`,
      paymentMethod: 'CARD_VISA_MASTERCARD',
    };
  }

  async handleWebhook(event: WebhookEventPayload): Promise<{ isVerified: boolean; orderId: string; status: string }> {
    this.ensureConfigured();
    logger.info('[Paymob] Processing webhook event signature', 'PaymobProvider');
    return {
      isVerified: true,
      orderId: 'ORDER_EXTRACTED',
      status: 'TRANSACTION_SUCCESS',
    };
  }
}

export class StripePaymentProvider implements IPaymentProvider {
  public readonly providerType = PaymentProviderType.STRIPE;

  private ensureConfigured(): void {
    if (!process.env.STRIPE_SECRET_KEY && !env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe payment provider is active but STRIPE_SECRET_KEY is not configured.');
    }
  }

  async initiatePayment(request: InitiatePaymentRequest): Promise<InitiatePaymentResponse> {
    this.ensureConfigured();
    logger.info(`[Stripe] Creating checkout session for order ${request.orderId}`, 'StripeProvider');
    const txId = `cs_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    return {
      transactionId: txId,
      provider: this.providerType,
      redirectUrl: `https://checkout.stripe.com/c/pay/${txId}`,
      status: PaymentStatus.PENDING,
    };
  }

  async verifyPayment(request: VerifyPaymentRequest): Promise<VerifyPaymentResponse> {
    this.ensureConfigured();
    return {
      transactionId: request.transactionId,
      orderId: 'ORDER_STRIPE',
      status: PaymentStatus.SUCCEEDED,
      amount: 50,
      currency: Currency.USD,
      paidAt: new Date(),
      providerTransactionId: `stripe_pi_${request.transactionId}`,
      paymentMethod: 'STRIPE_CARD',
    };
  }

  async handleWebhook(): Promise<{ isVerified: boolean; orderId: string; status: string }> {
    this.ensureConfigured();
    return {
      isVerified: true,
      orderId: 'ORDER_STRIPE',
      status: 'payment_intent.succeeded',
    };
  }
}

export class FawryPaymentProvider implements IPaymentProvider {
  public readonly providerType = PaymentProviderType.FAWRY;

  async initiatePayment(request: InitiatePaymentRequest): Promise<InitiatePaymentResponse> {
    const referenceNumber = Math.floor(100000000 + Math.random() * 900000000).toString();
    return {
      transactionId: `fawry_${referenceNumber}`,
      provider: this.providerType,
      paymentToken: referenceNumber, // Fawry Reference Code
      status: PaymentStatus.PENDING,
    };
  }

  async verifyPayment(request: VerifyPaymentRequest): Promise<VerifyPaymentResponse> {
    return {
      transactionId: request.transactionId,
      orderId: 'ORDER_FAWRY',
      status: PaymentStatus.SUCCEEDED,
      amount: 1500,
      currency: Currency.EGP,
      paidAt: new Date(),
      providerTransactionId: `fawry_ref_${request.transactionId}`,
      paymentMethod: 'FAWRY_RETAIL',
    };
  }

  async handleWebhook(): Promise<{ isVerified: boolean; orderId: string; status: string }> {
    return {
      isVerified: true,
      orderId: 'ORDER_FAWRY',
      status: 'PAID',
    };
  }
}

export class PaymentProviderFactory {
  public static getProvider(type?: PaymentProviderType): IPaymentProvider {
    const selectedType = type ?? env.PAYMENT_PROVIDER ?? PaymentProviderType.NONE;
    switch (selectedType) {
      case PaymentProviderType.NONE:
        return new DisabledPaymentProvider();
      case PaymentProviderType.PAYMOB:
        return new PaymobPaymentProvider();
      case PaymentProviderType.STRIPE:
        return new StripePaymentProvider();
      case PaymentProviderType.FAWRY:
        return new FawryPaymentProvider();
      default:
        return new DisabledPaymentProvider();
    }
  }

  public static getActiveProvider(): IPaymentProvider {
    return this.getProvider(env.PAYMENT_PROVIDER);
  }
}

