import { Client } from 'pg';
import config from '../config';
import Logger from './logger';

const client = new Client({ connectionString: config.development.url });

export default async () => {
    try {
        await client.connect();
        Logger.info('✌️Postgres DB loaded and connected!');
    } catch (e) {
        console.log('e', e.message);
        Logger.info('> error occurred from the postgress database!');
    }
};
