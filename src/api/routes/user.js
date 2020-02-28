import { Router } from 'express';
import { isValidSchema, logExecutionTime, logService } from '../middlewares/';
import * as user from '../controller/user';

const route = Router();

export default app => {
    app.use('/users', route);

    /**
     * To create the user.
     */
    route.post('/', logExecutionTime, logService, isValidSchema(), user.create);

    /**
     * To get the single user by their id.
     */
    route.get('/:id',  logExecutionTime, logService, user.find);

    /**
     * To get all the users or to filter limit users.
     */
    route.get('/',  logExecutionTime, logService, user.find);

    /**
     * To update user by id.
     */
    route.put('/updatebyid',  logExecutionTime, logService, isValidSchema(), user.update);

    /**
     * To soft delete user by id.
     */
    route.put('/delete',  logExecutionTime, logService, isValidSchema(), user.update);

    /**
     * To remove user by id from collection.
     */
    route.delete('/delete/:id',  logExecutionTime, logService, user.remove);
};
