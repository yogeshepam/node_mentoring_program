import * as userService from '../../services/user';

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
 * Function to find the user/ fetch all users / to get auto-suggest list from limit users.
 */
export const find = (req, res, next) => {
    const {
        params: { id },
        query: { loginSubstring, limit = 10 }
    } = req;

    if (id) {
        userService.findUser(id, (error, user) => {
            if (error) return next(error);
            if (!user.length) {
                return res
                    .status(404)
                    .json({ message: `User with id ${id} not found` });
            }
            return res.status(200).json({ user });
        });
    } else if (loginSubstring) {
        userService.getAutoSuggestUsers(loginSubstring, limit, (error, users) => {
            if (error) return next(error);
            return res.status(200).json({ users });
        });
    } else {
        userService.findUsers((error, allUsers) => {
            if (error) return next(error);
            return res.status(200).json({ users: allUsers });
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
        if (!response) {
            return next({ message: `User with ${body.id} doesn't exist` });
        }
        return res.status(200).send({ updatedUser: response });
    });
};

/**
 * Function to delete the user from collection.
 */
export const remove = (req, res, next) => {
    const {
        params: { id }
    } = req;

    userService.deleteUserById(id, (error, deletedUser) => {
        if (error) return next(error);
        if (!deletedUser.n) {
            return next({
                message: `User with ${id} doesn't exist`,
                details: deletedUser
            });
        }
        return res.status(200).send({
            deletedUser,
            message: 'Successfully removed the user'
        });
    });
};
