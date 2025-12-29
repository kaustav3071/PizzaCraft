import mongoose from 'mongoose';

let isConnected = false;

async function connectDB() {
    if (isConnected) {
        console.log("✅ Using existing database connection");
        return;
    }

    if (!process.env.MONGO_CONNECTION_URL) {
        console.error("❌ MONGO_CONNECTION_URL is not defined in environment variables");
        throw new Error("MONGO_CONNECTION_URL is not defined");
    }

    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_URL);
        isConnected = mongoose.connection.readyState === 1;
        console.log("✅ Database connected successfully 🚀🚀🚀");
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
        throw err; // Don't exit, just throw for serverless
    }
}

export default connectDB;