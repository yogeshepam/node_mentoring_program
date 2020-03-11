import { Router } from 'express';
import { isValidSchema, logService, logExecutionTime } from '../middlewares/';
import * as group from '../controller/group';

const route = Router();

export default app => {
    app.use('/groups', route);

    /**
     * To create a group.
     */
    route.post('/',  logExecutionTime, logService, isValidSchema(), group.create);

    /**
     * To get a single group by their id.
     */
    route.get('/:id',  logExecutionTime, logService, group.find);

    /**
     * To get all groups.
     */
    route.get('/',  logExecutionTime, logService, group.find);

    /**
     * To update a group by id.
     */
    route.patch('/updatebyid',  logExecutionTime, logService, isValidSchema(), group.update);

    /**
     * To remove group by id from collection.
     */
    route.delete('/delete/:id',  logExecutionTime, logService, group.remove);

    /**
     * To add users to the group.
     */
    route.patch('/:groupId/addUsers',  logExecutionTime, logService, isValidSchema(), group.addUsers);

    /**
     * To add users to the group.
     */
    route.get('/:groupId/getUsers',  logExecutionTime, logService, group.getUsers);
};
