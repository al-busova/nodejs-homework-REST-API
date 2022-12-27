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
const {
  validationContacts,
  isValidId,
  authenticate,
} = require("../../middlewares");

router.get("/", authenticate, getAll);
router.get("/:contactId", authenticate, isValidId, getById);
router.post(
  "/",
  authenticate,
  validationContacts.contactValidation,
  addContact
);
router.delete("/:contactId", authenticate, isValidId, deleteContact);
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validationContacts.contactValidation,
  updateContact
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validationContacts.updateFavoriteValidation,
  updateFavoriteContact
);

module.exports = router;
