const fs = require('fs')

// create folder data if not exist
const dirPath = './data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

// create file contact.json if not exist
const dataPath = './data/contacts.json'
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

// get all data in contact.json
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)
    return contacts
}

// find contact by name
const findContact = (name) => {
    const contacts = loadContact()

    const contact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase())

    return contact
}

// save contacts.json with the new one
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
}

// add new contact
const addContact = (contact) => {
    const contacts = loadContact()
    contacts.push(contact)
    saveContacts(contacts)
}

// check duplicate
const checkDuplicate = (name) => {
    const contacts = loadContact()
    return contacts.find((contact) => contact.name === name)
}

// delete contact
const deleteContact = (name) => {
    const contacts = loadContact()
    const filteredContacts = contacts.filter((contact) => contact.name !== name)
    saveContacts(filteredContacts)
}

// update contacts
const updateContacts = (newContact) => {
    const contacts = loadContact()

    // delete old contact that the name is same with old name
    const filteredContacts = contacts.filter((contact) => contact.name !== newContact.oldName)

    delete newContact.oldName

    filteredContacts.push(newContact)

    saveContacts(filteredContacts)
}

module.exports = { loadContact, findContact, addContact, checkDuplicate, deleteContact, updateContacts }
