const fs = require("fs").promises;
const { v4 } = require("uuid");
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const updateBaseContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const searchContact = contacts.find((contact) => contact.id === contactId);
  return searchContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(contactIndex, 1);
  await updateBaseContacts(contacts);
  return removeContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  contacts.push(newContact);
  await updateBaseContacts(contacts);
  return newContact;
};
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  contacts[contactIndex] = { ...body, id:contactId };
  await updateBaseContacts(contacts);
  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
