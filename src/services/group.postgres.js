import DB from '../models';

const { Group, sequelize, User  } = DB;
/**
 * Function to execute the create query to create a group.
 * @param {*} groupData group data received in request.
 * @param {*} callback callback function.
 */
export const createGroup = async (groupData, callback) => {
    try {
        const result = await Group.create({ ...groupData });
        return callback('', result);
    } catch (e) {
        return callback(e, '');
    }
};

/**
 * Function to find the group from collections.
 * @param {*} id to find group
 * @param {*} callback callback function
 */
export const findGroup = async (id, callback) => {
    try {
        const result = await Group.findAll({
            where: { id }
        });
        return callback('', result);
    } catch (e) {
        return callback(e, '');
    }
};

/**
 * Function to fetch all the groups from collections.
 * @param {*} callback callback function
 */
export const findGroups = async callback => {
    try {
        const result = await Group.findAll({});
        return callback('', result);
    } catch (e) {
        return callback(e, '');
    }
};

/**
 * Function to execute the update query by group ID
 * @param {*} id group id
 * @param {*} newData group data that we need to update.
 * @param {*} callback callback function
 */
export const updateGroupById = async (id, newData, callback) => {
    try {
        let result = await Group.update(newData, {
            where: { id }
        });
        if (!result[0]) result = '';
        return callback('', result);
    } catch (e) {
        return callback(e, '');
    }
};

/**
 * Function to execute the update query by group ID
 * @param {*} id group id
 * @param {*} callback callback function
 */
export const deleteGroupById = async (id, callback) => {
    try {
        let result = await Group.destroy({
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
 * Function to add users to group using automatic transaction.
 * @param {*} groupId is a groupId.
 * @param {*} userIds contains list of users to be added to group.
 * @param {*} callback callback function.
 */
export const addUsersToGroup = async (groupId, userIds, callback) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const users = await User.findAll({
                where: { id: userIds },
                transaction: t
            });

            const group = await Group.findByPk(groupId);

            await group.addUsers(users);

            const groupDetails = await Group.findAll({
                where: { id: groupId },
                include: [{
                    model: User,
                    as: 'users',
                    attributes: ['id', 'login']
                }],
                transaction: t
            });

            return groupDetails;
        });

        return callback('', result);
    } catch (error) {
        return callback(error, '');
    }
};

/**
 *Function to get list of users in group.
 * @param {*} groupId is a groupId.
 * @param {*} callback callback function.
 * */
export const getUsersInGroup =  async (groupId, callback)  => {
    try {
        const result = await  Group.findAll({
            where: { id: groupId },
            include: [{
                model: User,
                as: 'users',
                attributes: ['id', 'login']
            }]
        });

        return callback('', result);
    } catch (e) {
        return callback(e, '');
    }
};
