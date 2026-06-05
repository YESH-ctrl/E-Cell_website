import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/ecell';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`✅ MongoDB Connected — database: ${conn.connection.db?.databaseName}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    throw error;
  }
};
