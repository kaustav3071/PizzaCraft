import mongoose from 'mongoose';

let isConnected = false;
let connectionPromise = null;

async function connectDB() {
    // If already connected, return immediately
    if (isConnected && mongoose.connection.readyState === 1) {
        return;
    }

    // If connection is in progress, wait for it
    if (connectionPromise) {
        return connectionPromise;
    }

    if (!process.env.MONGO_CONNECTION_URL) {
        console.error("❌ MONGO_CONNECTION_URL is not defined in environment variables");
        throw new Error("MONGO_CONNECTION_URL is not defined");
    }

    // Start connection with timeout
    connectionPromise = mongoose.connect(process.env.MONGO_CONNECTION_URL, {
        serverSelectionTimeoutMS: 10000, // 10 second timeout
        socketTimeoutMS: 45000,
    });

    try {
        await connectionPromise;
        isConnected = true;
        console.log("✅ Database connected successfully 🚀🚀🚀");
    } catch (err) {
        connectionPromise = null;
        console.error("❌ Database connection failed:", err.message);
        throw err;
    }
}

export default connectDB;