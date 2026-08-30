/**
 * Al-Muhandis Platform - AI Provider Interface & Abstraction
 * Master Specification - Phase 0
 */

import {
  AIProviderType,
  ChatMessage,
  AIChatOptions,
  AIChatResponse,
  AIExplanationRequest,
} from '../../../../shared/types/ai.ts';

export interface IAIProvider {
  readonly providerType: AIProviderType;

  /**
   * Generates a chat completion for engineering tutor discussions
   */
  chat(messages: ChatMessage[], options?: AIChatOptions): Promise<AIChatResponse>;

  /**
   * Explains a complex engineering concept adapted to student knowledge level
   */
  explainConcept(request: AIExplanationRequest): Promise<string>;

  /**
   * Generates a structured summary with engineering takeaways for a lesson
   */
  summarizeLesson(transcriptOrNotes: string, topicTitle: string): Promise<string>;
}
