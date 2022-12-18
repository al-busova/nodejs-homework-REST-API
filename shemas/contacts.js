const Joi = require("joi");
  const schemaContact = Joi.object({
    name: Joi.string().alphanum().min(3).max(10).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, allowFullyQualified: true })
      .required(),
    phone: Joi.string()
      .pattern(/^\(?\d{1,3}?\)?\d+$/)
      .required(),
    favorite: Joi.boolean().required(),
  });

module.exports = {
      schemaContact,
  }