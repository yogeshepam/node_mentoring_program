import { Router } from 'express';
import auth from './routes/auth';
import group from './routes/group';
import user from './routes/user';
import group from './routes/group';

export default () => {
    const app = Router();

    auth(app);
    user(app);
    group(app);

    return app;
};
