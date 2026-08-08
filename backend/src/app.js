import cors from 'cors';
import express from 'express';
import routes from './routes/index.js';
import {
  errorMiddleware,
  notFoundMiddleware,
} from './middlewares/error.middleware.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.status(200).json({
      success: true,
      message: 'API em execução',
      data: null,
    });
  });

  app.use('/api', routes);
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
