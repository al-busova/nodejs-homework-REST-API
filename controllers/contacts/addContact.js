const { Contact } = require("../../models/contact");

const addContact = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json({
      status: "success",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
