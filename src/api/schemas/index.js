import Joi from 'joi';

const userSchema = Joi.object({
    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required(),

    id: Joi.number()
        .integer()
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

export default {
    '/': userSchema,
    '/updatebyid': userSchema
};
