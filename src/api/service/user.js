import _ from 'lodash';
import User from '../../models/user';
const users = [];

/**
 * Function to execute the create query to create the user.
 * @param {*} userData user data
 * @param {*} callback callback function.
 */
export const createUser =  (userData, callback) => {
    const user = new User(userData);
    User.create(user, async (error, result) => {
        if (error) return callback({ error });
        const updatedUsers = await User.find();

        return callback({ users: updatedUsers });
    });
};

/**
 * Function to find the user from collections.
 * @param {*} id to find user
 * @param {*} callback callback function
 */
export const findUser = (id, callback) => {
    User.find({ id }, (error, user) => {
        console.log('one error', error);
        console.log('one result', user);
        if (error) return error;
        return callback({ user });
    });
};

/**
 * Function to fetch all the users from collections.
 * @param {*} callback callback function
 */
export const findUsers = async callback => {
    const allUsers = await User.find();

    return callback({ users: allUsers });
};

/**
 * Function to execute the update query by user ID
 * @param {*} id user id
 * @param {*} data user data which we need to update.
 * @param {*} callback callback function
 */
export const updateUserById = (id, data, callback) => {
    const user = _.find(users, { id });
    // update

    return callback({ user });
};

/**
 * Function to execute the update query by user ID
 * @param {*} id user id
 * @param {*} callback callback function
 */
export const deleteUserById = (id, callback) => {
    // delete user from array

    return callback();
};

/**
 * Function to execute the update query by user ID
 * @param {*} loginSubstring login property to filter and sort on
 * @param {*} limit users
 * @param {*} callback callback function
 */
export const getAutoSuggestUsers = (loginSubstring, limit, callback) => {
    const filteredUsers = _.filter(users, loginSubstring);
    const sortUsers = _.sortBy(filteredUsers, o => o.login);
    return callback(sortUsers);
};
