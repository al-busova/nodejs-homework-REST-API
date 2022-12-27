const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const contacts = await Contact.find({owner});
    res.status(200).json({
      status: "success",
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
