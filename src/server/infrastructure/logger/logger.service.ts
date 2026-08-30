/**
 * Al-Muhandis Platform - Structured JSON Logger with Secret Masking
 * Master Specification - Phase 0
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

const SENSITIVE_KEYS = [
  'password',
  'token',
  'secret',
  'authorization',
  'apikey',
  'api_key',
  'creditcard',
  'cvv',
  'refreshtoken',
];

export class LoggerService {
  private static instance: LoggerService;
  private currentLevel: LogLevel = LogLevel.INFO;

  private constructor() {
    if (process.env.NODE_ENV === 'development') {
      this.currentLevel = LogLevel.DEBUG;
    }
  }

  public static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }

  public setLogLevel(level: LogLevel): void {
    this.currentLevel = level;
  }

  private maskSensitiveData(data: unknown): unknown {
    if (data === null || data === undefined) return data;
    if (typeof data === 'string') {
      // Check if string contains token-like structures
      if (data.length > 30 && (data.includes('Bearer ') || data.startsWith('ey'))) {
        return `${data.substring(0, 6)}...[REDACTED]`;
      }
      return data;
    }
    if (Array.isArray(data)) {
      return data.map((item) => this.maskSensitiveData(item));
    }
    if (typeof data === 'object') {
      const maskedObj: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
        const lowerKey = key.toLowerCase();
        const isSensitive = SENSITIVE_KEYS.some((k) => lowerKey.includes(k));
        if (isSensitive) {
          maskedObj[key] = '[REDACTED_SECRET]';
        } else {
          maskedObj[key] = this.maskSensitiveData(value);
        }
      }
      return maskedObj;
    }
    return data;
  }

  private formatOutput(
    levelName: string,
    message: string,
    context?: string,
    metadata?: Record<string, unknown>,
  ): string {
    const timestamp = new Date().toISOString();
    const sanitizedMeta = metadata ? this.maskSensitiveData(metadata) : undefined;

    return JSON.stringify({
      timestamp,
      level: levelName,
      service: 'al-muhandis-backend',
      context: context || 'Application',
      message,
      ...(sanitizedMeta && typeof sanitizedMeta === 'object' ? sanitizedMeta : {}),
    });
  }

  public debug(message: string, context?: string, metadata?: Record<string, unknown>): void {
    if (this.currentLevel <= LogLevel.DEBUG) {
      console.debug(this.formatOutput('DEBUG', message, context, metadata));
    }
  }

  public info(message: string, context?: string, metadata?: Record<string, unknown>): void {
    if (this.currentLevel <= LogLevel.INFO) {
      console.log(this.formatOutput('INFO', message, context, metadata));
    }
  }

  public warn(message: string, context?: string, metadata?: Record<string, unknown>): void {
    if (this.currentLevel <= LogLevel.WARN) {
      console.warn(this.formatOutput('WARN', message, context, metadata));
    }
  }

  public error(
    message: string,
    error?: unknown,
    context?: string,
    metadata?: Record<string, unknown>,
  ): void {
    if (this.currentLevel <= LogLevel.ERROR) {
      const errObj: Record<string, unknown> = { ...(metadata || {}) };
      let ctx = context || 'Application';

      if (typeof error === 'string') {
        ctx = error;
      } else if (error instanceof Error) {
        errObj.errorName = error.name;
        errObj.errorMessage = error.message;
        errObj.stack = error.stack;
      }

      console.error(this.formatOutput('ERROR', message, ctx, errObj));
    }
  }
}

export const logger = LoggerService.getInstance();
