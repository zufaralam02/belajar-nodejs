const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const { body, validationResult, check } = require('express-validator')

const methodOverride = require('method-override')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

require('./utils/db')
const Contact = require('./model/contact')

const app = express()
const port = 3000

// setup method override
app.use(methodOverride('_method'))

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

// contact add
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        layout: 'layouts/main-layout',
        title: 'Add Contact'
    })
})

// contact add process
app.post('/contact', [
    body('name').custom(async (value) => {
        const duplicate = await Contact.findOne({ name: value })
        if (duplicate) {
            throw new Error('name is already use')
        }
        return true
    }),
    check('email', 'invalid email').isEmail(),
    check('phone', 'invalid phone').isMobilePhone('id-ID')
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render('add-contact', {
            layout: 'layouts/main-layout',
            title: 'Add Contact',
            errors: errors.array()
        })
    } else {
        Contact.insertMany(req.body, (error, result) => {
            req.flash('message', 'Success')
            res.redirect('/contact')
        })
    }
})

// contact delete
// app.get('/contact/delete/:name', async (req, res) => {
//     const contact = await Contact.findOne({ name: req.params.name })

//     if (!contact) {
//         res.status(404)
//         res.send('<h1>404</h1>')
//     } else {
//         // Contact.deleteOne({ name: req.params.name })
//         Contact.deleteOne({ _id: contact._id }).then((result) => {
//             req.flash('message', 'Success')
//             res.redirect('/contact')
//         })
//     }
// })
app.delete('/contact', (req, res) => {
    Contact.deleteOne({ name: req.body.name }).then((result) => {
        req.flash('message', 'Success')
        res.redirect('/contact')
    })
})

// contact edit
app.get('/contact/edit/:name', async (req, res) => {
    const contact = await Contact.findOne({ name: req.params.name })

    res.render('edit-contact', {
        layout: 'layouts/main-layout',
        title: 'Edit Contact',
        contact
    })
})

// contact edit process
app.put('/contact', [
    body('name').custom(async (value, { req }) => {
        const duplicate = await Contact.findOne({ name: value })
        if (value !== req.body.oldName && duplicate) {
            throw new Error('name is already use')
        }
        return true
    }),
    check('email', 'invalid email').isEmail(),
    check('phone', 'invalid phone').isMobilePhone('id-ID')
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render('edit-contact', {
            layout: 'layouts/main-layout',
            title: 'Edit Contact',
            errors: errors.array(),
            contact: req.body
        })
    } else {
        Contact.updateOne({ _id: req.body._id }, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone
            }
        }).then((result) => {
            req.flash('message', 'Success')
            res.redirect('/contact')
        })
    }
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