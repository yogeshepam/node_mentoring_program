import * as groupService from '../../services/group.postgres';

/**
 * Function to create a group.
 */
export const create = (req, res, next) => {
    const { body } = req;

    groupService.createGroup(body, (error, newGroup) => {
        if (error) return next(error);
        return res.status(200).json({
            message: 'Successfully added new group',
            newGroup
        });
    });
};

/**
 * Function to find a group or
 * fetch all groups
 */
export const find = (req, res, next) => {
    const { params: { id } } = req;

    if (id) {
        groupService.findGroup(id, (error, group) => {
            if (error) return next(error);
            if (!group.length) {
                return res
                    .status(404)
                    .json({ message: `Group with id ${id} not found` });
            }
            return res.status(200).json(group);
        });
    } else {
        groupService.findGroups((error, allGroups) => {
            if (error) return next(error);
            return res.status(200).json(allGroups);
        });
    }
};

/**
 * Function to update group data by their ID.
 */
export const update = (req, res, next) => {
    const { body } = req;
    groupService.updateGroupById(body.id, body, (error, updatedGroup) => {
        if (error) return next(error);
        if (!updatedGroup) {
            return res.status(404).json({ message: `Group with id ${body.id} doesn't exist` });
        }
        return res.status(200).send({
            message: `Successfully updated group with id ${body.id}`,
            updatedGroup
        });
    });
};

/**
 * Function to delete a group from collection.
 */
export const remove = (req, res, next) => {
    const {
        params: { id }
    } = req;

    groupService.deleteGroupById(id, (error, deletedGroup) => {
        if (error) return next(error);
        if (!deletedGroup) {
            return res.status(404).json({ message: `Group with id ${id} doesn't exist` });
        }
        return res.status(200).send({
            deletedGroup,
            message: 'Successfully removed the group'
        });
    });
};
