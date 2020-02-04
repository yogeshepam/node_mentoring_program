// import * as userService from '../../services/user.mongoose';
import * as userService from '../../services/user.postgres';

/**
 * Function to create the user.
 */
export const create = (req, res, next) => {
    const { body } = req;

    userService.createUser(body, (error, newUser) => {
        if (error) return next(error);
        return res.status(200).json({
            message: 'Successfully added new user',
            newUser
        });
    });
};

/**
 * Function to find the user or
 * fetch all users or
 * to get auto-suggest limit users.
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
            return res.status(200).json(user);
        });
    } else if (loginSubstring) {
        userService.getAutoSuggestUsers(loginSubstring, limit, (error, suggestedUsers) => {
            if (error) return next(error);
            return res.status(200).json(suggestedUsers);
        });
    } else {
        userService.findUsers((error, allUsers) => {
            if (error) return next(error);
            return res.status(200).json(allUsers);
        });
    }
};

/**
 * Function to update user data by their ID.
 */
export const update = (req, res, next) => {
    const { body } = req;
    userService.updateUserById(body.id, body, (error, updatedUser) => {
        if (error) return next(error);
        if (!updatedUser) {
            return res.status(404).json({ message: `User with id ${body.id} doesn't exist` });
        }
        return res.status(200).send({
            message: `Successfully updated user with id ${body.id}`,
            updatedUser
        });
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
        if (!deletedUser) {
            return res.status(404).json({ message: `User with id ${id} doesn't exist` });
        }
        return res.status(200).send({
            deletedUser,
            message: 'Successfully removed the user'
        });
    });
};
