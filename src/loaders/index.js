import expressLoader from './express';
import mongooseLoader from './mongoose';
import postgresLoader from './postgres';
import Logger from './logger';

export default async ({ expressApp }) => {
    await mongooseLoader();
    await postgresLoader();
    await expressLoader({ app: expressApp });

    Logger.info('✌️Express loaded');
};
