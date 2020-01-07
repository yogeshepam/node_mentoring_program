import _ from "lodash";

const users = [];

/**
 * Function to execute the create query to create the user.
 * @param {*} userData user data
 * @param {*} callback callback function.
 */
export const createUser = (userData, callback) => {
  const newUsers = [...users, userData];

  return callback({ users: newUsers });
};

/**
 * Funtion to find the user from collections.
 * @param {*} id to find user
 * @param {*} callback callback function
 */
export const findUser = (id, callback) => {
  const user = _.find(users, { id });

  return callback({ user });
};

/**
 * Funtion to fetch all the users from collections.
 * @param {*} callback callback function
 */
export const findUsers = callback => {
  return callback({ users });
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
  const users = _.filter(users, loginSubstring);
  const sortUsers = _.sortBy(users, o => o.login);
  return callback(sortUsers);
};
