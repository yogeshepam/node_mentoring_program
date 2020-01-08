import expressLoader from './express';
import mongooseLoader from './mongoose';
import Logger from './logger';

export default async ({ expressApp }) => {
    const db = await mongooseLoader();
    db.on('error', () => {
        Logger.info('> error occurred from the database!');
    });
    db.once('open', () => {
        Logger.info('✌️ DB loaded and connected!');
    });

    require('../models/user');

    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
};
