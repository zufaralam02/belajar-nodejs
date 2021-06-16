const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

require('./utils/db')
const Contact = require('./model/contact')

const app = express()
const port = 3000

// setup ejs
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// flash configuration
app.use(cookieParser('secret'))
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

// home
app.get('/', (req, res) => {
    const users = [
        {
            name: 'Fulan',
            email: 'fulan@gmail.com',
        },
        {
            name: 'Fulanah',
            email: 'fulanah@gmail.com',
        },
        {
            name: 'Allan',
            email: 'allan@gmail.com',
        },
    ]
    res.render('index', {
        layout: 'layouts/main-layout',
        title: 'Home',
        name: 'Fulan',
        users,
    })
})

// about
app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'About',
    })
})

// contact
app.get('/contact', async (req, res) => {
    // Contact.find().then((contact) => {
    //     res.send(contact)
    // })

    const contacts = await Contact.find()

    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Contact',
        contacts,
        message: req.flash('message')
    })
})

// contact detail
app.get('/contact/:name', async (req, res) => {
    const contact = await Contact.findOne({ name: req.params.name })

    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Contact Detail',
        contact
    })
})

app.listen(port, () => {
    console.log(`Mongo Contact App, Listening at http://localhost:${port}`)
})