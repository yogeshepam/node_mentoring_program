import { Router } from 'express';
import { isValidSchema, logService } from '../middlewares/';
import * as group from '../controller/group';

const route = Router();

export default app => {
    app.use('/groups', route);

    /**
     * To create a group.
     */
    route.post('/', logService, isValidSchema(), group.create);

    /**
     * To get a single group by their id.
     */
    route.get('/:id', logService, group.find);

    /**
     * To get all groups.
     */
    route.get('/', logService, group.find);

    /**
     * To update a group by id.
     */
    route.patch('/updatebyid', logService, isValidSchema(), group.update);

    /**
     * To remove group by id from collection.
     */
    route.delete('/delete/:id', logService, group.remove);

    /**
     * To add users to the group.
     */
    route.patch('/:groupId/addUsers', logService, isValidSchema(), group.addUsers);

    /**
     * To add users to the group.
     */
    route.get('/:groupId/getUsers', logService, group.getUsers);
};
