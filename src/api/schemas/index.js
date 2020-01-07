import Joi from "joi";

const userSchema = Joi.object({
  id: Joi.number()
    .min(3)
    .max(30),

  login: Joi.string()
    .email({
      minDomainSegments: 2
    })
    .required(),

  password: Joi.string().required(),

  age: Joi.number()
    .integer()
    .min(18),

  isDeleted: Joi.bool()
});

const userPatchSchema = Joi.object({
  id: Joi.number()
    .min(3)
    .max(30),

  login: Joi.string().email({
    minDomainSegments: 2
  }),

  password: Joi.string(),

  age: Joi.number()
    .integer()
    .min(18),

  isDeleted: Joi.bool()
}).min(1);

export default {
  "/": userSchema,
  "/patch": userPatchSchema
};
