const fs = require('fs')
const chalk = require('chalk')
const validator = require('validator')

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

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)
    return contacts
}

const saveContact = (name, email, phone) => {
    const contact = { name, email, phone }
    // const file = fs.readFileSync('data/contacts.json', 'utf-8')
    // const contacts = JSON.parse(file)
    const contacts = loadContact()

    // check duplicate
    const duplicate = contacts.find((contact) => contact.name === name)
    if (duplicate) {
        console.log(chalk.red.inverse.bold('Contact is already exist'))
        return false
    }

    // check email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold('Invalid email'))
            return false
        }
    }

    // check phone
    if (!validator.isMobilePhone(phone, 'id-ID')) {
        console.log(chalk.red.inverse.bold('Invalid phone'))
        return false
    }

    contacts.push(contact)

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))

    console.log(chalk.green.inverse.bold('Thank you'))
}

const listContact = () => {
    const contacts = loadContact()
    console.log(chalk.cyan.inverse.bold('List Contact'))
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.name}`)
    })
}

const detailContact = (name) => {
    const contacts = loadContact()

    const contact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase())

    if (!contact) {
        console.log(chalk.red.inverse.bold(`${name} not found`))
        return false
    }

    console.log(chalk.cyan.inverse.bold(contact.name))
    console.log(contact.phone)
    if (contact.email) {
        console.log(contact.email)
    }
}

const deleteContact = (name) => {
    const contacts = loadContact()

    const newContacts = contacts.filter((contact) => contact.name.toLowerCase() !== name.toLowerCase())

    if (contacts.length === newContacts.length) {
        console.log(chalk.red.inverse.bold(`${name} not found`))
        return false
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts))

    console.log(chalk.green.inverse.bold(`${name}'s contact has been deleted`))
}

module.exports = { saveContact, listContact, detailContact, deleteContact }