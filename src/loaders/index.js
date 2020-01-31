import expressLoader from './express';
import mongooseLoader from './mongoose';
import postgresLoader from './postgres';
import Logger from './logger';

export default async ({ expressApp }) => {
    const db = await mongooseLoader();
    await postgresLoader();

    db.on('error', () => {
        Logger.info('> error occurred from the database!');
    });
    db.once('open', () => {
        Logger.info('✌️ DB loaded and connected!');
    });

    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
};
