import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn("[Spice Haven DB] CRITICAL WARNING: MONGODB_URI is missing from Vercel Environment Variables!");
      return;
    }
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`[Spice Haven DB] MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`[Spice Haven DB] Error: ${error.message}`);
    // IMPORTANT: Do NOT call process.exit(1) here! 
    // In a Serverless environment (Vercel), process.exit(1) causes a hard crash 
    // resulting in the 500 HTML error you are seeing.
  }
};

export default connectDB;
