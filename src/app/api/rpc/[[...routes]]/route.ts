import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { projectsRouter } from '@/features/projects/server/route';

const app = new Hono().basePath('/api');

// Global Server-Side Error Handler
app.onError((err, c) => {
  console.error('[Hono Server Error]:', err);
  
  return c.json(
    {
      success: false,
      message: err.message || 'Internal Server Error',
    },
    500
  );
});

// Mounted Routes
const routes = app.route('/projects', projectsRouter);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);

export type AppType = typeof routes;