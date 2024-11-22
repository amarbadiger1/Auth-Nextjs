import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connect() {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        console.error('MONGO_URI is not defined in the environment variables.');
        process.exit(1); // Exit the process with a failure code
    }

    try {
        await mongoose.connect(uri); // Await the connection process
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            process.exit(1); // Exit the process if there's an error
        });

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}
