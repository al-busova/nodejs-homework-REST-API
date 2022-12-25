const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
