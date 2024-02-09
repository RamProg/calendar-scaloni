import dotenv from "dotenv";
import { createExpressApp } from "./app";

dotenv.config();

const port = process.env.PORT || 8000;

export const app = createExpressApp();
export const DB_URL = process.env.MONGODB_URI || "mongodb://localhost/calendar";

const server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

const shutdown = async () => {
  server.close(() => {
    console.warn("SIGTERM received. Server has been shut down");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);