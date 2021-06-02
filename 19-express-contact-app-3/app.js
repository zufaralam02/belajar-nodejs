const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const { loadContact, findContact, addContact, checkDuplicate, deleteContact, updateContacts } = require('./utils/contacts')
const { body, validationResult, check } = require('express-validator');

const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express()
const port = 3000

// flash configuration
app.use(cookieParser('secret'))
app.use(session({
  cookie: { maxAge: 6000 },
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())

app.set('view engine', 'ejs')

app.use(expressLayouts)

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

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

app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'About',
  })
})

app.get('/contact', (req, res) => {
  const contacts = loadContact()

  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'Contact',
    contacts,
    message: req.flash('message')
  })
})

app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    layout: 'layouts/main-layout',
    title: 'Add Contact'
  })
})

app.post('/contact', [
  body('name').custom((value) => {
    const duplicate = checkDuplicate(value)
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
    // return res.status(400).json({ errors: errors.array() });
    res.render('add-contact', {
      layout: 'layouts/main-layout',
      title: 'Add Contact',
      errors: errors.array()
    })
  } else {
    addContact(req.body)
    req.flash('message', 'Success')
    res.redirect('/contact')
  }
})

app.get('/contact/delete/:name', (req, res) => {
  const contact = findContact(req.params.name)

  if (!contact) {
    res.status(404)
    res.send('<h1>404</h1>')
  } else {
    deleteContact(req.params.name)
    req.flash('message', 'Success')
    res.redirect('/contact')
  }
})

app.get('/contact/edit/:name', (req, res) => {
  const contact = findContact(req.params.name)

  res.render('edit-contact', {
    layout: 'layouts/main-layout',
    title: 'Edit Contact',
    contact
  })
})

app.post('/contact/update', [
  body('name').custom((value, { req }) => {
    const duplicate = checkDuplicate(value)
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
    // return res.status(400).json({ errors: errors.array() });
    res.render('edit-contact', {
      layout: 'layouts/main-layout',
      title: 'Edit Contact',
      errors: errors.array(),
      contact: req.body
    })
  } else {
    updateContacts(req.body)
    req.flash('message', 'Success')
    res.redirect('/contact')
  }
})

app.get('/contact/:name', (req, res) => {
  const contact = findContact(req.params.name)

  res.render('detail', {
    layout: 'layouts/main-layout',
    title: 'Contact Detail',
    contact
  })
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
