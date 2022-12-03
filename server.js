const app = require('./app')

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
// const contactsFunctions = require('./models/contacts');
// const getId = async() => {
//   const contact = await contactsFunctions.getContactById(5);
//   console.log('esfdf',contact);
// }

// getId();