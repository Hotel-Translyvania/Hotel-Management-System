// src/common/middleware/raw-body.middleware.ts
import { json } from 'body-parser';

export const rawBodyMiddleware = () =>
  json({
    verify: (req: any, res, buf) => {
      req.rawBody = buf.toString(); // Save raw body for Stripe signature check
    },
  });
