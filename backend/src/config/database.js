import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

const connectDB = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is missing from .env");
  }

  const maxAttempts = 5;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`Connecting to MongoDB (${attempt}/${maxAttempts})...`);
      const connectionInstance = await mongoose.connect(process.env.MONGODB_URL, {
        dbName: DB_NAME,
        serverSelectionTimeoutMS: 8000,
        connectTimeoutMS: 5000
      });
      console.log(`MongoDB connected!!! Host: ${connectionInstance.connection.host}`);
      return connectionInstance;
    } catch (error) {
      await mongoose.disconnect();
      const retryable = ["MongoNetworkError", "MongoNetworkTimeoutError", "MongooseServerSelectionError", "MongoServerSelectionError"].includes(error.name);
      console.error(`MongoDB attempt ${attempt} failed (${error.cause?.code || error.code || error.name}).`);
      if (!retryable || attempt === maxAttempts) {
        throw new Error("Database connection failed. Check Atlas access and network connectivity; server was not started.");
      }
      console.log("Retrying in 3 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
};

export default connectDB;
