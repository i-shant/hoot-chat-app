import { connect } from "mongoose";

export default async function connectDB() {
  try {
    const conn = await connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) console.error(`Error: ${error.message}`);
    else
      console.error("Failed to connect to MongoDB - An unknown error occurred");
    process.exit(1);
  }
}
