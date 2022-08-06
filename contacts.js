const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, 'db', 'contacts.json')

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath))
}

async function getContactById(contactId) {
  contactId = String(contactId)
  if (!contactId) throw new Error('Undeclared contact ID')

  const contactsList = await listContacts()
  const contact = contactsList.find(({ id }) => contactId === id)

  if (!contact) throw new Error(`Contact with id ${contactId} was not found`)

  return contact
}

async function removeContact(contactId) {
  contactId = String(contactId)
  if (!contactId) throw new Error('Undeclared contact ID')

  const contactsList = await listContacts()
  const idx = contactsList.findIndex(({ id }) => contactId === id)
  if (idx === -1) throw new Error(`Contact with id ${contactId} was not found`)

  const [deletedContact] = contactsList.splice(idx, 1)

  await updateContactsList(contactsList)

  return deletedContact
}

async function addContact(name, email, phone) {
  if (!name || !email || !phone)
    throw new Error('Please type name, email and phone!')

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
