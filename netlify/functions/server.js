import dotenv from 'dotenv';
import serverless from 'serverless-http';
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from '../../config/db';
import authRoutes from '../../routes/adminRoutes';
import userRoutes from '../../routes/userRoutes';
import instructorRoutes from '../../routes/instructorRoutes';
import scheduleRoutes from '../../routes/scheduleRoutes';
import planRoutes from '../../routes/planRoutes';

dotenv.config();

const api = express();
const router = Router();

api.use(cors());
api.use(bodyParser.json());

const connectAndRun = async () => {
    await connectDB();

    // Use the router for routes
    router.use('/auth', authRoutes);
    router.use('/auth', userRoutes);
    router.use('/auth', instructorRoutes);
    router.use('/admin', scheduleRoutes);
    router.use('/api', planRoutes);
};

// Initialize the database connection and routes
connectAndRun();

// Define a root route for the function
router.get('/health', (req, res) => {
    res.send( 'Server is running successfully!!');
});


api.use("/api", router);


// Export the serverless function
export const handler = serverless(api);