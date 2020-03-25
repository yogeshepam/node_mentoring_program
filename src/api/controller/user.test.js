import * as userController from '../controller/user';
import * as userService from '../../services/user.postgres';
import { mockRequest, mockResponse } from '../../utils/testHelpers';

jest.mock('../../services/user.postgres');

describe('user entity controller methods', () => {
    let users;
    let req = mockRequest();
    let res = mockResponse();
    let next;
    const error = 'error';

    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
        next = jest.fn();
    });

    describe('#create user', () => {
        const createUserData = {
            age: 22
        };
        beforeEach(() => {
            userService.createUser.mockImplementation((id, callback) => callback('', createUserData));
            req = mockRequest({ body: createUserData });
        });

        test('should create user', async () => {
            await userController.create(req, res, next);

            expect(res.json).toBeCalledWith({
                message: 'Successfully added new user',
                newUser: createUserData
            });
            expect(res.status).toBeCalledWith(200);
        });

        test('should return error if error creating a user', async () => {
            userService.createUser.mockImplementation((id, callback) => callback(error, null));

            await userController.create(req, res, next);

            expect(next).toBeCalledWith(error);
        });
    });

    describe('#find user', () => {
        beforeEach(() => {
            userService.findUser.mockImplementation((id, callback) => callback('', users));
            req = mockRequest({ params: { id: 1 } });
        });

        test('should return user', async () => {
            users = [{}];

            await userController.find(req, res, next);

            expect(res.json).toBeCalledWith(users);
            expect(res.status).toBeCalledWith(200);
        });

        test('should return message if user does not exists', async () => {
            users = [];

            await userController.find(req, res, next);

            expect(res.json).toBeCalledWith({ message: 'User with id 1 not found' });
            expect(res.status).toBeCalledWith(404);
        });

        test('should return error if error finding a user', async () => {
            userService.findUser.mockImplementation((id, callback) => callback(error, []));

            await userController.find(req, res, next);

            expect(next).toBeCalledWith(error);
        });
    });

    describe('#find all users', () => {
        test('should return all users', async () => {
            users = [{}, {}, {}];
            userService.findUsers.mockImplementation((callback) => callback('', users));

            await userController.find(req, res, next);

            expect(res.json).toBeCalledWith(users);
            expect(res.status).toBeCalledWith(200);
        });

        test('should return error if error finding all users', async () => {
            userService.findUsers.mockImplementation((callback) => callback(error, null));

            await userController.find(req, res, next);

            expect(next).toBeCalledWith(error);
        });
    });

    describe('#find users with limit & provided string', () => {
        beforeEach(() => {
            req = mockRequest({
                query: { loginSubstring: 'random', limit: 20 }
            });
        });

        test('should return all users returned by service as per string n limit passed', async () => {
            users = [{}, {}];
            userService.getAutoSuggestUsers.mockImplementation((loginSubstring, limit, callback) => callback('', users));

            await userController.find(req, res, next);

            expect(res.json).toBeCalledWith(users);
            expect(res.status).toBeCalledWith(200);
        });

        test('should return error if error finding users', async () => {
            userService.getAutoSuggestUsers.mockImplementation((loginSubstring, limit, callback) =>  callback('error', null));

            await userController.find(req, res, next);

            expect(next).toBeCalledWith(error);
        });
    });

    describe('#update user', () => {
        const updateUserData = {
            id: 22,
            age: 25
        };
        beforeEach(() => {
            userService.updateUserById.mockImplementation((id, newData, callback) => callback('', updateUserData));
            req = mockRequest({ body: updateUserData });
        });

        test('should update & return updated user', async () => {
            await userController.update(req, res, next);

            expect(res.send).toBeCalledWith({
                message: 'Successfully updated user with id 22',
                updatedUser: updateUserData
            });
            expect(res.status).toBeCalledWith(200);
        });

        test('should return message if user does not exists', async () => {
            userService.updateUserById.mockImplementation((id, newData, callback) => callback('', ''));
            await userController.update(req, res, next);

            expect(res.json).toBeCalledWith({ message: "User with id 22 doesn't exist" });
            expect(res.status).toBeCalledWith(404);
        });

        test('should return error if error updating a user', async () => {
            userService.updateUserById.mockImplementation((id, newData, callback) => callback(error, null));

            await userController.update(req, res, next);

            expect(next).toBeCalledWith(error);
        });
    });

    describe('#delete user', () => {
        const deletedUser = {
            age: 24
        };
        beforeEach(() => {
            userService.deleteUserById.mockImplementation((id, callback) => callback('', deletedUser));
            req = mockRequest({
                params: {
                    id: 32
                }
            });
        });

        test('should delete & return deleted user', async () => {
            await userController.remove(req, res, next);

            expect(res.send).toBeCalledWith({
                deletedUser,
                message: 'Successfully removed the user'
            });
            expect(res.status).toBeCalledWith(200);
        });

        test('should return message if user does not exists', async () => {
            userService.deleteUserById.mockImplementation((id, callback) => callback('', ''));
            await userController.remove(req, res, next);

            expect(res.json).toBeCalledWith({ message: "User with id 32 doesn't exist" });
            expect(res.status).toBeCalledWith(404);
        });

        test('should return error if error deleting a user', async () => {
            userService.deleteUserById.mockImplementation((id, callback) => callback(error, null));

            await userController.remove(req, res, next);

            expect(next).toBeCalledWith(error);
        });
    });
});

