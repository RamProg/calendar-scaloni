import express, { json } from "express";
import cors, { CorsOptions } from "cors";

const CORS_OPTIONS: CorsOptions = {
  optionsSuccessStatus: 200,
  origin: [/localhost/],
  credentials: true,
  allowedHeaders: ["x-trace-token", "Cookie", "Content-Type", "Authorization"],
};

export function createExpressApp() {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(CORS_OPTIONS));
  app.use(json());

  app.get("/_health", (req, res) => {
    res.send("OK");
  });

  return app;
}