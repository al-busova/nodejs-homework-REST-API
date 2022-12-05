const express = require("express");
const contactsFunctions = require("../../models/contacts");
const router = express.Router();
const { HttpError } = require("../../helpers");
const { schemaContact } = require("../../shemas/contacts");

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

router.post("/", async (req, res, next) => {
  try {
    const validationBodyContact = schemaContact.validate(req.body);
    if (Object.keys(validationBodyContact.value).length !== 3) {
      throw HttpError(400, "missing required name field");
    }
    if (validationBodyContact.error) {
      return res
        .status(400)
        .json({ status: validationBodyContact.error.details });
    }
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

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const validationBodyContact = schemaContact.validate(req.body);
    if (Object.keys(validationBodyContact.value).length !== 3) {
      throw HttpError(400, "missing fields");
    }
    if (validationBodyContact.error) {
      return res
        .status(400)
        .json({ status: validationBodyContact.error.details });
    }
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
