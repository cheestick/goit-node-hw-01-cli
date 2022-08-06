const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, 'db', 'contacts.json')

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath))
}

async function getContactById(contactId) {
  if (!contactId) {
    console.log('Contact ID was undeclared')
    return
  }

  const contactsList = await listContacts()
  const contact = contactsList.find(({ id }) => String(contactId) === id)
  if (!contact) {
    console.log(`Contact with id ${contactId} was not found`)
    return
  }

  return contact
}

async function removeContact(contactId) {
  if (!contactId) {
    console.log('Contact ID was undeclared')
    return
  }

  const contactsList = await listContacts()
  const idx = contactsList.findIndex(({ id }) => String(contactId) === id)
  if (idx === -1) {
    console.log(`Contact with id ${contactId} was not found`)
    return -1
  }

  const [deletedContact] = contactsList.splice(idx, 1)
  await updateContactsList(contactsList)
  return deletedContact
}

async function addContact(name, email, phone) {
  if (!name || !email || !phone) {
    return console.log('Please type name, email and phone!')
  }
  const contactsList = await listContacts()
  const newContact = {
    id: generateId(contactsList),
    name,
    email,
    phone,
  }

  contactsList.push(newContact)
  await updateContactsList(contactsList)
  return newContact
}

async function updateContactsList(updatedContactsList) {
  await fs.writeFile(contactsPath, JSON.stringify(updatedContactsList, null, 2))
}

function generateId(contactsList) {
  return String(Number(contactsList[contactsList.length - 1].id) + 1)
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
