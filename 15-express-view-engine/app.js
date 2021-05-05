const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(expressLayouts)

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
    title: 'About'
  })
})

app.get('/contact', (req, res) => {
  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'Contact'
  })
})

app.get('/product/:id', (req, res) => {
  res.send(
    `Product id : ${req.params.id} <br> Category id : ${req.query.category}`
  )
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
