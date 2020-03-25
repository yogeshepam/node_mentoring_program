import * as groupController from '../controller/group';
import * as groupService from '../../services/group.postgres';
import { mockRequest, mockResponse } from '../../utils/testHelpers';

jest.mock('../../services/group.postgres');

describe('group entity controller methods', () => {
    let groups;
    let req = mockRequest();
    let res = mockResponse();
    let next;
    const error = 'error';

    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
        next = jest.fn();
    });

    describe('#create group', () => {
        const createGroupData = {
            age: 22
        };
        beforeEach(() => {
            groupService.createGroup.mockImplementation((id, callback) => callback('', createGroupData));
            req = mockRequest({ body: createGroupData });
        });

        test('should create group', async () => {
            await groupController.create(req, res, next);

            expect(res.json).toBeCalledWith({
                message: 'Successfully added new group',
                newGroup: createGroupData
            });
            expect(res.status).toBeCalledWith(200);
        });

        test('should return error if error creating a group', async () => {
            groupService.createGroup.mockImplementation((id, callback) => callback(error, null));

            await groupController.create(req, res, next);

            expect(next).toBeCalledWith(error);
        });
    });

    describe('#find group', () => {
        beforeEach(() => {
            groupService.findGroup.mockImplementation((id, callback) => callback('', groups));
            req = mockRequest({ params: { id: 1 } });
        });

        test('should return group', async () => {
            groups = [{}];

            await groupController.find(req, res, next);

            expect(res.json).toBeCalledWith(groups);
            expect(res.status).toBeCalledWith(200);
        });

        test('should return message if group does not exists', async () => {
            groups = [];

            await groupController.find(req, res, next);

            expect(res.json).toBeCalledWith({ message: 'Group with id 1 not found' });
            expect(res.status).toBeCalledWith(404);
        });

        test('should return error if error finding a group', async () => {
            groupService.findGroup.mockImplementation((id, callback) => callback(error, []));

            await groupController.find(req, res, next);

            expect(next).toBeCalledWith(error);
        });
    });

    describe('#find all groups', () => {
        test('should return all groups', async () => {
            groups = [{}, {}, {}];
            groupService.findGroups.mockImplementation((callback) => callback('', groups));

            await groupController.find(req, res, next);

            expect(res.json).toBeCalledWith(groups);
            expect(res.status).toBeCalledWith(200);
        });

        test('should return error if error finding all groups', async () => {
            groupService.findGroups.mockImplementation((callback) => callback(error, null));

            await groupController.find(req, res, next);

            expect(next).toBeCalledWith(error);
        });
    });

    describe('#update group', () => {
        const updateGroupData = {
            id: 22,
            name: 'test'
        };
        beforeEach(() => {
            groupService.updateGroupById.mockImplementation((id, newData, callback) => callback('', updateGroupData));
            req = mockRequest({ body: updateGroupData });
        });

        test('should update & return updated group', async () => {
            await groupController.update(req, res, next);

            expect(res.send).toBeCalledWith({
                message: 'Successfully updated group with id 22',
                updatedGroup: updateGroupData
            });
            expect(res.status).toBeCalledWith(200);
        });

        test('should return message if group does not exists', async () => {
            groupService.updateGroupById.mockImplementation((id, newData, callback) => callback('', ''));
            await groupController.update(req, res, next);

            expect(res.json).toBeCalledWith({ message: "Group with id 22 doesn't exist" });
            expect(res.status).toBeCalledWith(404);
        });

        test('should return error if error updating a group', async () => {
            groupService.updateGroupById.mockImplementation((id, newData, callback) => callback(error, null));

            await groupController.update(req, res, next);

            expect(next).toBeCalledWith(error);
        });
    });

    describe('#delete group', () => {
        const deletedGroup = {
            name: 'test2'
        };
        beforeEach(() => {
            groupService.deleteGroupById.mockImplementation((id, callback) => callback('', deletedGroup));
            req = mockRequest({
                params: {
                    id: 32
                }
            });
        });

        test('should delete & return deleted group', async () => {
            await groupController.remove(req, res, next);

            expect(res.send).toBeCalledWith({
                deletedGroup,
                message: 'Successfully removed the group'
            });
            expect(res.status).toBeCalledWith(200);
        });

        test('should return message if group does not exists', async () => {
            groupService.deleteGroupById.mockImplementation((id, callback) => callback('', ''));
            await groupController.remove(req, res, next);

            expect(res.json).toBeCalledWith({ message: "Group with id 32 doesn't exist" });
            expect(res.status).toBeCalledWith(404);
        });

        test('should return error if error deleting a group', async () => {
            groupService.deleteGroupById.mockImplementation((id, callback) => callback(error, null));

            await groupController.remove(req, res, next);

            expect(next).toBeCalledWith(error);
        });
    });

    describe('#addUsers to group', () => {
        const groupDetails = {
            name: 'test2'
        };
        beforeEach(() => {
            groupService.addUsersToGroup.mockImplementation((groupId, userIds, callback) => callback('', groupDetails));
            req = mockRequest({
                body: { userIds: [1, 2] },
                params: {
                    id: 32
                }
            });
        });

        test('should add users & return groupDetails', async () => {
            await groupController.addUsers(req, res, next);

            expect(res.send).toBeCalledWith({
                groupDetails,
                message: 'Successfully added list of the users to group'
            });
            expect(res.status).toBeCalledWith(200);
        });

        test('should return error if error adding user to a group', async () => {
            groupService.addUsersToGroup.mockImplementation((groupId, userIds, callback) => callback(error, null));

            await groupController.addUsers(req, res, next);

            expect(next).toBeCalledWith(error);
        });
    });

    describe('#getUsers in group', () => {
        const groupDetails = {
            name: 'test2',
            users: [1, 2, 3]
        };
        beforeEach(() => {
            groupService.getUsersInGroup.mockImplementation((groupId, callback) => callback('', groupDetails));
            req = mockRequest({
                params: {
                    id: 32
                }
            });
        });

        test('should fetch users & return groupDetails', async () => {
            await groupController.getUsers(req, res, next);

            expect(res.send).toBeCalledWith(groupDetails);
            expect(res.status).toBeCalledWith(200);
        });

        test('should return error if error fetching users in a group', async () => {
            groupService.getUsersInGroup.mockImplementation((groupId, callback) => callback(error, null));

            await groupController.getUsers(req, res, next);

            expect(next).toBeCalledWith(error);
        });
    });
});

