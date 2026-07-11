import mongoose from "mongoose";

// Cache the database connection to avoid exhausting connection pools in serverless environments
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      console.warn("[Spice Haven DB] CRITICAL WARNING: MONGODB_URI is missing from Vercel Environment Variables!");
      return;
    }
    const db = await mongoose.connect(process.env.MONGODB_URI as string);
    isConnected = db.connections[0].readyState === 1;
    console.log(`[Spice Haven DB] MongoDB Connected: ${db.connection.host}`);
  } catch (error: any) {
    console.error(`[Spice Haven DB] Error: ${error.message}`);
    // IMPORTANT: Do NOT call process.exit(1) here! 
    // In a Serverless environment (Vercel), process.exit(1) causes a hard crash 
    // resulting in the 500 HTML error you are seeing.
    throw error;
  }
};

export default connectDB;
