const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const { loadContact, findContact } = require('./utils/contacts')

const app = express()
const port = 3000

app.set('view engine', 'ejs')

// third-party middleware
app.use(expressLayouts)

// built-in middleware
app.use(express.static('public'))

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
    name: 'Fulan',
    title: 'Home',
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
    contacts
  })
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
