const express = require("express");
const contactsFunctions = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res) => {
  const contacts = await contactsFunctions.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
});

router.get("/:contactId", async (req, res) => {
  const contact = await contactsFunctions.getContactById(req.params.contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
});

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }
  const newContact = await contactsFunctions.addContact({ name, email, phone });
  res.status(201).json({
    status: "success",
    code: 201,
    data: newContact,
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await contactsFunctions.removeContact(req.params.contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  const updateContact = await contactsFunctions.updateContact(contactId, {
    name,
    email,
    phone,
  });
  res.json({
    status: "success",
    code: 200,
    data: updateContact,
  });
});

module.exports = router;
