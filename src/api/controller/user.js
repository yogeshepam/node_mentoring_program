import * as userService from '../service/user';

/**
 * Function to create the user.
 */
export const create = (req, res, next) => {
    const { body } = req;

    userService.createUser(body, (error, response) => {
        if (error) return next(error);
        return res.status(200).json(response);
    });
};

/**
 * Function to find the user/ fetch all users / to get auto-suggest list from limitusers.
 */
export const find = (req, res, next) => {
    const {
        params: { id },
        query: { loginSubstring, limit = 10 }
    } = req;

    console.log('limit', limit)
    if (id) {
        userService.findUser(id, (error, response) => {
            if (error) return next(error);
            if (!response.user.length) {
                return res
                    .status(404)
                    .json({ message: `User with id ${id} not found` });
            }
            return res.status(200).json(response);
        });
    } else if (loginSubstring) {
        userService.getAutoSuggestUsers(loginSubstring, limit, (error, response) => {
            if (error) return next(error);
            return res.status(200).json(response);
        });
    } else {
        userService.findUsers((error, response) => {
            if (error) return next(error);
            return res.status(200).json(response);
        });
    }
};

/**
 * Function to update the user data  by their ID.
 */
export const update = (req, res, next) => {
    const { body } = req;

    userService.updateUserById(body.id, body, (error, response) => {
        if (error) return next(error);
        return res.status(200).send(response);
    });
};

/**
 * Function to delete the user from collection.
 */
export const remove = (req, res, next) => {
    const {
        params: { id }
    } = req;

    userService.deleteUserById(id, (error, response) => {
        if (error) return next(error);
        return res.status(200).send(response);
    });
};
