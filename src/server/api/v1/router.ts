/**
 * Al-Muhandis Platform - API v1 Aggregator Router
 * Master Specification - Phase 0
 */

import { Router } from 'express';
import { healthRouter } from './health/health.router.ts';
import { metaRouter } from './meta/meta.router.ts';
import { featureFlagsRouter } from './feature-flags/feature-flags.router.ts';

const v1Router = Router();

// Modular v1 Route Mounts
v1Router.use('/health', healthRouter);
v1Router.use('/meta', metaRouter);
v1Router.use('/feature-flags', featureFlagsRouter);

export { v1Router };
