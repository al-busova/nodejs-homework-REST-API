const { schemas } = require("../models/user");

const registerValidation = (req, res, next) => {
  const validationBodyUser = schemas.registerSchema.validate(req.body);
  if (validationBodyUser.error) {
    return res
      .status(400)
      .json({ status: validationBodyUser.error.details });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const validationBodyUser = schemas.loginSchema.validate(req.body);
  if (validationBodyUser.error) {
    return res
      .status(400)
      .json({ status: validationBodyUser.error.details });
  }
  next();
};

module.exports = {
  registerValidation,
  loginValidation,
};
