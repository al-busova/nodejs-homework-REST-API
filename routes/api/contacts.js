const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  addContact,
  deleteContact,
  updateContact,
  updateFavoriteContact,
} = require("../../controllers/contacts");
const { validationContacts, isValidId } = require("../../middlewares");

router.get("/", getAll);
router.get("/:contactId", isValidId, getById);
router.post("/", validationContacts.contactValidation, addContact);
router.delete("/:contactId", isValidId, deleteContact);
router.put(
  "/:contactId",
  isValidId,
  validationContacts.contactValidation,
  updateContact
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validationContacts.updateFavoriteValidation,
  updateFavoriteContact
);

module.exports = router;
