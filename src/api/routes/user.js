import { Router } from 'express';
import { isValidSchema } from '../middlewares/';
import * as user from '../controller/user';

const route = Router();

export default app => {
    app.use('/users', route);

    /**
     * To create the user.
     */
    route.post('/', isValidSchema(), user.create);

    /**
     * To get the single user by their id.
     */
    route.get('/user/:id', user.find);

    /**
     * To get all the users or to filter limit users.
     */
    route.get('/', user.find);

    /**
     * To update user by id.
     */
    route.put('/updatebyid', isValidSchema(), user.update);

    /**
     * To soft delete user by id.
     */
    route.put('/delete', isValidSchema(), user.update);

    /**
     * To remove user by id from collection.
     */
    route.delete('/delete/:id', user.remove);
};
