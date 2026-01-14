import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

const checkIP = () => {
    return new Promise((resolve, reject) => {
        http.get('http://api.ipify.org', (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', (err) => reject(err));
    });
};

const testConnection = async () => {
    console.log("Testing MongoDB Connection...");
    console.log(`URI: ${process.env.MONGO_URI?.split('@')[1]}`); // Log only the host part for security

    try {
        const ip = await checkIP();
        console.log(`Current Public IP: ${ip}`);
        console.log("Make sure this IP is whitelisted in MongoDB Atlas Network Access.");
    } catch (e) {
        console.log("Could not determine public IP.");
    }

    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("SUCCESS: Connected to MongoDB!");
        process.exit(0);
    } catch (error) {
        console.error("FAILURE: Could not connect to MongoDB.");
        console.error(error);
        process.exit(1);
    }
};

testConnection();
