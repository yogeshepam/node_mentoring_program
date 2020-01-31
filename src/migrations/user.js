import User from '../models/user.postgres';

/**
 * Function to execute the create query to create the user.
 * @param {*} userData user data received in request.
 * @param {*} callback callback function.
 */
export const createUser = (userData, callback) => {
    const user = new User(userData);
    User.create(user, async (error, result) => {
        const updatedUsers = await User.find();

        callback(error, {
            message: 'Successfully added new user',
            newUser: result,
            users: updatedUsers
        });
    });
};

/**
 * Function to find the user from collections.
 * @param {*} id to find user
 * @param {*} callback callback function
 */
export const findUser = (id, callback) => {
    User.findOne({ where: { id } }, (error, result) => callback(error, result));
};

/**
 * Function to fetch all the users from collections.
 * @param {*} callback callback function
 */
export const findUsers = callback => {
    User.findAll({ limit: 100 }, (error, result) => callback(error, result));
};

/**
 * Function to execute the update query by user ID
 * @param {*} id user id
 * @param {*} newData user data which we need to update.
 * @param {*} callback callback function
 */
export const updateUserById = (id, newData, callback) => {
    User.findOneAndUpdate({ id }, newData, async (error, result) => callback(error, result));
};

/**
 * Function to execute the update query by user ID
 * @param {*} id user id
 * @param {*} callback callback function
 */
export const deleteUserById = (id, callback) => {
    User.deleteOne({ id }, (error, result) => callback(error, result.result));
};

/**
 * Function to execute the update query by user ID
 * @param {*} loginSubstring login property to filter on
 * @param {*} limit: no of users in response.
 * @param {*} callback callback function
 */
export const getAutoSuggestUsers = (loginSubstring, limit, callback) => {
    User.find({ login: new RegExp(loginSubstring, 'i') })
        .sort({ login: 1 })
        .limit(parseInt(limit, 10))
        .exec((error, result) => callback(error, result));
};
