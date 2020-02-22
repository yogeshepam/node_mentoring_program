import { Router } from 'express';
import { isValidSchema } from '../middlewares/';
import * as group from '../controller/group';

const route = Router();

export default app => {
    app.use('/groups', route);

    /**
     * To create a group.
     */
    route.post('/', isValidSchema(), group.create);

    /**
     * To get a single group by their id.
     */
    route.get('/:id', group.find);

    /**
     * To get all groups.
     */
    route.get('/', group.find);

    /**
     * To update a group by id.
     */
    route.put('/updatebyid', isValidSchema(), group.update);

    /**
     * To remove group by id from collection.
     */
    route.delete('/delete/:id', group.remove);
};
