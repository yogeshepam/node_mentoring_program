import { Sequelize } from 'sequelize';
import config from '../config';
import Logger from './logger';

const sequelize = new Sequelize(config.development);

export default async () => {
    try {
        await sequelize.authenticate();
        Logger.info('✌️ DB loaded and connected!');
    } catch (e) {
        Logger.info('> error occurred from the database!');
    }
};
