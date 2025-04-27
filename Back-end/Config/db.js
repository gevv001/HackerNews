import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        // console.log('MongoDB connected');
    } catch (error) {
        console.error('DB connection error: ', error);
    }
}

export default connectDB