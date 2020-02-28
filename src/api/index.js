import { Router } from 'express';
import user from './routes/user';
import group from './routes/group';

export default () => {
    const app = Router();

    app.get('/', (req, res) => {
        res.json({ ok: true });
    });

    user(app);
    group(app);

    return app;
};
