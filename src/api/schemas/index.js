import Joi from 'joi';
import PERMISSIONS from '../../utils/enums';

const userSchema = Joi.object({
    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required(),

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
            ]))
});

export default {
    '/api/users/': userSchema,
    '/api/users/delete': userSchema,
    '/api/users/updatebyid': userSchema,
    '/api/groups/': groupSchema,
    '/api/groups/delete': groupSchema,
    '/api/groups/updatebyid': groupSchema
};
