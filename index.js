const contactsApi = require('./contacts')
const argv = require('yargs').argv

// contactsApi.listContacts()
// contactsApi.getContactById(1)
// contactsApi.removeContact(13)
// contactsApi.addContact('Maksym', 'maksym@m.com', '342-213-2344')

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      // ...
      break

    case 'get':
      // ... id
      break

    case 'add':
      // ... name email phone
      break

    case 'remove':
      // ... id
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

// invokeAction(argv)
