import express, { json } from 'express';
import { eventRouter } from './routes';
import cors, { CorsOptions } from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './openapi.json';

const CORS_OPTIONS: CorsOptions = {
  optionsSuccessStatus: 200,
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['x-trace-token', 'Cookie', 'Content-Type', 'Authorization'],
};

export function createExpressApp() {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(CORS_OPTIONS));
  app.use(json());

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(eventRouter);

  app.get('/_health', (_, res) => {
    res.send('OK');
  });

  return app;
}
