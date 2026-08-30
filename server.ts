/**
 * Al-Muhandis Platform - Backend Application Entry Point
 * Master Specification - Phase 0: Project Foundation & Architecture
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { v1Router } from './src/server/api/v1/router.ts';
import { requestIdMiddleware } from './src/server/middleware/request-id.middleware.ts';
import { loggingMiddleware } from './src/server/middleware/logging.middleware.ts';
import { errorMiddleware } from './src/server/middleware/error.middleware.ts';
import { logger } from './src/server/infrastructure/logger/logger.service.ts';
import { dbService } from './src/server/infrastructure/database/prisma.client.ts';

const PORT = 3000;

async function bootstrap() {
  const app = express();

  // 1. Security & Core Middlewares
  app.use(
    helmet({
      contentSecurityPolicy: false, // Allows Vite inline scripts and styles in dev/preview
      crossOriginEmbedderPolicy: false,
    }),
  );

  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id', 'X-Mock-Role'],
    }),
  );

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // 2. Request Tracing & Structured Logging
  app.use(requestIdMiddleware);
  app.use(loggingMiddleware);

  // 3. API Versioning Mounts
  app.use('/api/v1', v1Router);

  // Quick Health Route for container ingress
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'al-muhandis-backend',
      phase: 'Phase 0: Foundation',
      timestamp: new Date().toISOString(),
    });
  });

  // 4. API Error Handler (before static / vite fallback)
  app.use('/api', errorMiddleware);

  // 5. Frontend Integration (Vite Middleware in dev / Static in prod)
  if (process.env.NODE_ENV !== 'production') {
    logger.info('Bootstrapping Vite middleware for client-side SPA...', 'Bootstrap');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    logger.info('Serving static production bundle from dist/...', 'Bootstrap');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // 6. Start HTTP Server
  const server = app.listen(PORT, '0.0.0.0', () => {
    logger.info(`🚀 Al-Muhandis Backend & Frontend Server running on http://0.0.0.0:${PORT}`, 'Bootstrap');
    logger.info(`📋 API v1 Base Route: http://localhost:${PORT}/api/v1/health`, 'Bootstrap');
  });

  // 7. Graceful Shutdown Handlers
  const gracefulShutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Starting graceful shutdown...`, 'Shutdown');
    server.close(async () => {
      await dbService.disconnect();
      logger.info('HTTP server and Database connections closed successfully.', 'Shutdown');
      process.exit(0);
    });

    setTimeout(() => {
      logger.error('Could not close connections in time, forcefully terminating', 'Shutdown');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}

bootstrap().catch((err) => {
  logger.error('Fatal error during application startup', err, 'Bootstrap');
  process.exit(1);
});
