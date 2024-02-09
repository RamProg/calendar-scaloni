import dotenv from "dotenv";
import { connectDB } from "./db/connect";
import { createExpressApp } from "./app";

dotenv.config();

const port = process.env.PORT || 8000;

export const app = createExpressApp();
export const DB_URL = process.env.MONGODB_URI || "mongodb://localhost/calendar-scaloni";

const dbConnect = () => {
  try {
    connectDB({ db: DB_URL });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

dbConnect();

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