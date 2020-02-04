import { Op } from 'sequelize';
import { User } from '../models';

/**
 * Function to execute the create query to create the user.
 * @param {*} userData user data received in request.
 * @param {*} callback callback function.
 */
export const createUser = async (userData, callback) => {
    try {
        const result = await User.create({ ...userData });
        return callback('', result);
    } catch (e) {
        return callback(e, '');
    }
};

/**
 * Function to find the user from collections.
 * @param {*} id to find user
 * @param {*} callback callback function
 */
export const findUser = async (id, callback) => {
    try {
        const result = await User.findAll({
            where: { id }
        });
        return callback('', result);
    } catch (e) {
        return callback(e, '');
    }
};

/**
 * Function to fetch all the users from collections.
 * @param {*} callback callback function
 */
export const findUsers = async callback => {
    try {
        const result = await User.findAll({});
        return callback('', result);
    } catch (e) {
        return callback(e, '');
    }
};

/**
 * Function to execute the update query by user ID
 * @param {*} id user id
 * @param {*} newData user data which we need to update.
 * @param {*} callback callback function
 */
export const updateUserById = async (id, newData, callback) => {
    try {
        let result = await User.update(newData, {
            where: { id }
        });
        if (!result[0]) result = '';
        return callback('', result);
    } catch (e) {
        return callback(e, '');
    }
};

/**
 * Function to execute the update query by user ID
 * @param {*} id user id
 * @param {*} callback callback function
 */
export const deleteUserById = async (id, callback) => {
    try {
        let result = await User.destroy({
            where: { id }
        });
        if (!result) {
            result = '';
        }
        return callback('', result);
    } catch (e) {
        return callback(e, '');
    }
};

/**
 * Function to execute the update query by user ID
 * @param {*} loginSubstring login property to filter on
 * @param {*} limit: no of users in response.
 * @param {*} callback callback function
 */
export const getAutoSuggestUsers = async (loginSubstring, limit, callback) => {
    try {
        const result = await User.findAll({
            where: {
                login: {
                    [Op.iLike]: `%${loginSubstring}%`
                }
            },
            order: [['login', 'DESC']],
            limit
        });

        return callback('', result);
    } catch (e) {
        return callback(e, '');
    }
};
