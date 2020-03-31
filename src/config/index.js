import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    /**
     * Choose the port
     */
    port: parseInt(process.env.PORT, 10),

    /**
     * From in memory DB
     */
    databaseURL: process.env.MONGODB_URI,

    /**
     * For jwt secret
     */
    jwtSecret: process.env.JWT_SECRET,

    /**
     * For winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly'
    },

    /**
     * API configs
     */
    api: {
        prefix: '/api'
    }
};
