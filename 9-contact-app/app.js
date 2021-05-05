const yargs = require("yargs");
const { saveContact, listContact, detailContact, deleteContact } = require("./contacts");

yargs.command({
    command: 'add',
    describe: 'Add new contact',
    builder: {
        name: {
            describe: 'Full name',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        phone: {
            describe: 'Phone number',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        saveContact(argv.name, argv.email, argv.phone)
    }
}).demandCommand()

yargs.command({
    command: 'list',
    describe: 'Show all contacts',
    handler() {
        listContact()
    }
})

yargs.command({
    command: 'detail',
    describe: 'Show detail contact by name',
    builder: {
        name: {
            describe: 'Full name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        detailContact(argv.name)
    }
})

yargs.command({
    command: 'delete',
    describe: 'Delete contact by name',
    builder: {
        name: {
            describe: 'Full name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        deleteContact(argv.name)
    }
})

yargs.parse()
