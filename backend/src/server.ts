import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from './config/db';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Attempt to connect to DB, but don't let it kill the process
        await connectDB().catch(err => {
            console.error('❌ DATABASE CONNECTION FAILED:', err.message);
            console.log('⚠️ Server will run in limited mode (DB features disabled).');
        });

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
        });
    } catch (error) {
        console.error('❌ FATAL ERROR DURING STARTUP:', error);
    }
};

// Handle unhandled promise rejections globally to prevent nodemon crashes
process.on('unhandledRejection', (err: any) => {
    console.error(`🔴 Unhandled Rejection: ${err.message}`);
});

startServer();
