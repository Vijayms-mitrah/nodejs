const Joi = require("joi");

const schema = {
  login: Joi.object().keys({
    user_name: Joi.string().required(),
    password: Joi.string().required(),
  }),
  registration: Joi.object().keys({
    user_id: Joi.number().required(),
    user_name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = schema;
