const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
   const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const searchContact = contacts.find(
    (contact) => Number(contact.id) === contactId
  );
  return searchContact;
};

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
