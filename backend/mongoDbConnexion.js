import mongoose from "mongoose";
import config from './config.json' assert { type: 'json' };

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URL, {});
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};
export default connectDB;