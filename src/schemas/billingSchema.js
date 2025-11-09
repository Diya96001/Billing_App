const Joi = require('joi');

const createBillingSchema = Joi.object({
  name: Joi.string().min(1).max(200).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  paid: Joi.boolean().optional(),
});

module.exports = { createBillingSchema };
