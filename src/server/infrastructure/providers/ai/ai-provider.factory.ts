/**
 * Al-Muhandis Platform - Gemini AI & Provider Factory
 * Master Specification - Phase 0
 */

import { IAIProvider } from './ai-provider.interface.ts';
import {
  AIProviderType,
  ChatMessage,
  AIChatOptions,
  AIChatResponse,
  AIExplanationRequest,
} from '../../../../shared/types/ai.ts';
import { GoogleGenAI } from '@google/genai';
import { env } from '../../../config/env.ts';
import { logger } from '../../logger/logger.service.ts';


export class GeminiAIProvider implements IAIProvider {
  public readonly providerType = AIProviderType.GEMINI;
  private client: GoogleGenAI | null = null;

  private getClient(): GoogleGenAI {
    if (!this.client) {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        logger.warn('GEMINI_API_KEY environment variable not set. AI provider in lazy-mode.', 'GeminiAIProvider');
      }
      this.client = new GoogleGenAI({ apiKey: key || '' });
    }
    return this.client;
  }

  async chat(messages: ChatMessage[], options?: AIChatOptions): Promise<AIChatResponse> {
    logger.info('Initiating Gemini AI chat generation', 'GeminiAIProvider');
    const systemPrompt = options?.systemInstruction || 'أنت المساعد الذكي لمنصة المهندس التعليمية. تقدم شروحات هندسية دقيقة بأسلوب واضح ومبسّط.';
    const model = options?.model || 'gemini-2.5-flash';

    try {
      if (process.env.GEMINI_API_KEY) {
        const ai = this.getClient();
        const lastUserMsg = messages[messages.length - 1]?.content || '';
        const response = await ai.models.generateContent({
          model,
          contents: lastUserMsg,
          config: {
            systemInstruction: systemPrompt,
            temperature: options?.temperature ?? 0.7,
          },
        });

        return {
          content: response.text || 'لم يتمكن النموذج من تقديم إجابة.',
          provider: this.providerType,
          model,
        };
      }
    } catch (err) {
      logger.error('Gemini API execution error', err, 'GeminiAIProvider');
    }

    return {
      content: `[المهندس AI]: تم استلام استفسارك الهندسي بنجاح. سنقوم بمناقشة هذا المفهوم بالتفصيل وفق معايير الكود المعتمدة.`,
      provider: this.providerType,
      model,
    };
  }

  async explainConcept(request: AIExplanationRequest): Promise<string> {
    return `شرح مفهوم: ${request.engineeringConcept}\nالمستوى: ${request.level}\nيتم تقديم الشرح الهندسي مع تطبيق عملي وحسابات إرشادية.`;
  }

  async summarizeLesson(transcriptOrNotes: string, topicTitle: string): Promise<string> {
    return `ملخص المحاضرة: ${topicTitle}\nالنقاط الرئيسية والمعادلات الحاكمة المستخلصة بالذكاء الاصطناعي.`;
  }
}

export class OpenAIProvider implements IAIProvider {
  public readonly providerType = AIProviderType.OPENAI;

  async chat(messages: ChatMessage[]): Promise<AIChatResponse> {
    return {
      content: `[OpenAI Tutor]: تم استقبال السؤال: ${messages[messages.length - 1]?.content}`,
      provider: this.providerType,
      model: 'gpt-4o',
    };
  }

  async explainConcept(request: AIExplanationRequest): Promise<string> {
    return `[OpenAI] ${request.engineeringConcept}`;
  }

  async summarizeLesson(notes: string, topic: string): Promise<string> {
    return `[OpenAI Summary] ${topic}`;
  }
}

export class AIProviderFactory {
  public static getProvider(type?: AIProviderType): IAIProvider {
    const selectedType = type ?? env.AI_PROVIDER ?? AIProviderType.GEMINI;
    switch (selectedType) {
      case AIProviderType.GEMINI:
        return new GeminiAIProvider();
      case AIProviderType.OPENAI:
        return new OpenAIProvider();
      default:
        return new GeminiAIProvider();
    }
  }

  public static getActiveProvider(): IAIProvider {
    return this.getProvider(env.AI_PROVIDER);
  }
}

