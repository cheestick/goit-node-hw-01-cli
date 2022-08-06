const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, 'db', 'contacts.json')

/*
 * Раскомментируй и запиши значение
 * const contactsPath = ;
 */

// TODO: задокументировать каждую функцию
async function listContacts() {
  // ...твой код
  const fileData = await fs.readFile(contactsPath)
  return JSON.parse(fileData)
}

async function getContactById(contactId) {
  // ...твой код
  const contactsList = await listContacts()
  const contact = contactsList.find(({ id }) => String(contactId) === id)
  if (!contact) {
    console.log(`Incorrect contact id.`)
    return null
  }

  return contact
}

async function removeContact(contactId) {
  // ...твой код
}

async function addContact(name, email, phone) {
  // ...твой код
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
