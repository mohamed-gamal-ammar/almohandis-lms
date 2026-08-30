/**
 * Al-Muhandis Platform - AI Provider Abstraction Types
 * Master Specification - Phase 0
 */

export enum AIProviderType {
  GEMINI = 'GEMINI',
  OPENAI = 'OPENAI',
  ANTHROPIC = 'ANTHROPIC',
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
}

export interface AIChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemInstruction?: string;
  courseContext?: {
    courseId?: string;
    courseName?: string;
    lessonTitle?: string;
    lessonTranscript?: string;
  };
}

export interface AIChatResponse {
  content: string;
  provider: AIProviderType;
  model: string;
  tokensUsed?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AIExplanationRequest {
  engineeringConcept: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  language?: 'ar' | 'en';
  contextSnippet?: string;
}
