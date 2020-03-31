import Joi from 'joi';
import PERMISSIONS from '../../utils/enums';

const userSchema = Joi.object({
    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required(),

    groupId: Joi.string(),

    isDeleted: Joi.bool().required(),

    login: Joi.string()
        .email({
            minDomainSegments: 2
        })
        .required(),

    password: Joi.string()
        .regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
        .required()
});

const groupSchema = Joi.object({
    name: Joi.string().required(),

    permissions: Joi.array()
        .items(Joi.string()
            .valid([
                PERMISSIONS.READ,
                PERMISSIONS.WRITE,
                PERMISSIONS.DELETE,
                PERMISSIONS.SHARE,
                PERMISSIONS.UPLOAD_FILES
            ])).required(),

    userId: Joi.string()
});

const updateGroupSchema = Joi.object({
    name: Joi.string(),

    permissions: Joi.array()
        .items(Joi.string()
            .valid([
                PERMISSIONS.READ,
                PERMISSIONS.WRITE,
                PERMISSIONS.DELETE,
                PERMISSIONS.SHARE,
                PERMISSIONS.UPLOAD_FILES
            ])),

    userId: Joi.string()
});

const addUsersToGroupSchema = Joi.object({
    userIds: Joi.array().items(Joi.number().integer()).min(1).required()
});

const signInSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

export default {
    '/api/users/': userSchema,
    '/api/users/delete': userSchema,
    '/api/users/updatebyid': userSchema,
    '/api/groups/': groupSchema,
    '/api/groups/updatebyid': updateGroupSchema,
    '/api/groups/:groupId/addUsers': addUsersToGroupSchema,
    '/api/auth/signin': signInSchema
};
