import mongoose from "mongoose";

type ConnectionInput = {
  db: string;
};

export const connectDB = async ({ db }: ConnectionInput) => {
  try {
    const conn = await mongoose.connect(db);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
