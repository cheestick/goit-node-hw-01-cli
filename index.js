const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require('./contacts')

const argv = require('yargs').argv

function errorBoundary(operation) {
  return async function (...args) {
    try {
      return await operation(...args)
    } catch ({ message }) {
      console.error({ error: message })
    }
  }
}

function validateUserData(name, email, phone) {
  const error = Object.create(null)
  if (typeof name !== 'string') error.name = 'Name must be a string'
  if (typeof email !== 'string') error.email = 'Email must be a string'
  if (typeof phone !== 'string') error.phone = 'Phone must be a string'
  // if (Object.entries(error).length) throw new Error({ error })
}

async function invokeAction({ action, id, name, email, phone }) {
  validateUserData(name, email, phone)
  switch (action) {
    case 'list':
      console.table(await errorBoundary(listContacts)())
      break

    case 'get':
      console.table(await errorBoundary(getContactById)(id))
      break

    case 'add':
      console.table(await errorBoundary(addContact)(name, email, phone))
      break

    case 'remove':
      console.table(await errorBoundary(removeContact)(id))
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)
