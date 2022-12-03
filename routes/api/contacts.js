const express = require('express')
const contactsFunctions = require('../../models/contacts');
const router = express.Router()

router.get('/', async (req, res) => {
  const contacts = await contactsFunctions.listContacts();
    res.json({
    status: 'success',
    code: 200,
    data: {
      contacts,
    },
  });

})

router.get('/:contactId', async (req, res) => {
  const contact = await contactsFunctions.getContactById(req.params.contactId);
    // if (!contact) {
    //   res.status(404).json({ message: 'Not1 found', param: req.params.contactId });
    //   return;
    // } 
       res.json({
    status: 'success',
    code: 200,
    data: {name: contact.name} ,
  });
 
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
