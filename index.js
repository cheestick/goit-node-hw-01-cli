const contactsApi = require('./contacts')
const argv = require('yargs').argv

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.table(await contactsApi.listContacts())
      break

    case 'get':
      console.table(await contactsApi.getContactById(id))
      break

    case 'add':
      console.table(await contactsApi.addContact(name, email, phone))
      break

    case 'remove':
      console.table(await contactsApi.removeContact(id))
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)
