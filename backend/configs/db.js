import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to the database " + conn.connection.host);
  } catch (error) {
    console.log("Error while connecting to the DB", error.message);
    process.exit(1);
  }
};
