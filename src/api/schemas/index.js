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

export default {
  "/": userSchema
};
