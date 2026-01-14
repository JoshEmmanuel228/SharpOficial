import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // MongoDB connection disabled for local JSON storage migration
        // const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sharp-official');
        // console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log('📦 Local JSON Storage Active (MongoDB Disabled)');
    } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
        // process.exit(1); // Don't exit on db error since we are using local files
    }
};

export default connectDB;
