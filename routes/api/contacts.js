const express = require("express");
const contactsFunctions = require("../../models/contacts");
const router = express.Router();
const { HttpError } = require("../../helpers");
const {contactValidation} =require('../../middlewares/validationContacts')

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsFunctions.listContacts();
    res.status(200).json({
      status: "success",
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsFunctions.getContactById(contactId);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      status: "success",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", contactValidation, async (req, res, next) => {
  try {
    const newContact = await contactsFunctions.addContact(req.body);
    res.status(201).json({
      status: "success",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsFunctions.removeContact(contactId);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId",contactValidation, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateContact = await contactsFunctions.updateContact(
      contactId,
      req.body
    );
    if (!updateContact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      status: "success",
      data: updateContact,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
