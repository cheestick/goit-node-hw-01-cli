const fs = require('fs/promises')
const path = require('path')
const { v4: generateId } = require('uuid')

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
  validateUserData(name, email, phone)

  const contactsList = await listContacts()
  const newContact = {
    id: generateId(),
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

function validateUserData(name, email, phone) {
  if (!name || !email || !phone)
    throw new Error('name, email and phone is required!')

  const error = Object.create(null)
  if (typeof name !== 'string') error.name = name
  if (typeof email !== 'string') error.email = email
  if (typeof phone !== 'string') error.phone = phone

  if (Object.entries(error).length)
    throw new Error(`${Object.keys(error).join(', ')} must be a string`)
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
