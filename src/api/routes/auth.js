import { Router } from 'express';
import { isValidSchema, logExecutionTime, logService } from '../middlewares';
import * as auth from '../controller/auth';

const route = Router();

export default (app) => {
    app.use('/auth', route);

    route.post('/signin', logService, logExecutionTime, isValidSchema(), auth.signIn);
};
