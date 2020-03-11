import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Logger from './logger';

const mongod = new MongoMemoryServer();

export default async () => {
    const uri = await mongod.getConnectionString();

    const mongooseOpts = {
        useNewUrlParser: true,
        useCreateIndex: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
    };

    // config.databaseURL
    mongoose.connect(uri, mongooseOpts);
    const db = mongoose.connection;

    db.on('error', () => {
        Logger.error('> error occurred from the mongoose database!');
    });
    db.once('open', () => {
        Logger.info('✌️Mongoose DB loaded and connected!');
    });

    return db;
};
