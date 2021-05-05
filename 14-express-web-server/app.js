// const http = require('http')
// const fs = require('fs')

// const port = 3000;

// const renderHtml = (path, response) => {
//     fs.readFile(path, (error, data) => {
//         if (error) {
//             response.writeHead(404)
//             response.write('Error: file not found')
//         } else {
//             response.write(data)
//         }
//         response.end()
//     })
// }

// http.createServer((request, response) => {
//     response.writeHead(200, {
//         'Content-Type': 'text/html'
//     })

//     const url = request.url

//     // if (url === '/about') {
//     //     renderHtml('./about.html', response)
//     // } else if (url === '/contact') {
//     //     renderHtml('./contact.html', response)
//     // } else {
//     //     renderHtml('./index.html', response)
//     // }

//     switch (url) {
//         case '/about':
//             renderHtml('./about.html', response)
//             break
//         case '/contact':
//             renderHtml('./contact.html', response)
//             break
//         default:
//             renderHtml('./index.html', response)
//             break
//     }

// }).listen(port, () => {
//     console.log(`Server is listening on port ${port}...`)
// })

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    // res.send('Hello World!')
    // res.json({
    //     name: 'Allam',
    //     email: 'allam@gmail.com',
    //     phone: 082212345678
    // })
    res.sendFile('./index.html', { root: __dirname })
})

app.get('/about', (req, res) => {
    // res.send('About Page')
    res.sendFile('./about.html', { root: __dirname })
})

app.get('/contact', (req, res) => {
    // res.send('Contact Page')
    res.sendFile('./contact.html', { root: __dirname })
})

app.get('/product/:id', (req, res) => {
    res.send(`Product id : ${req.params.id} <br> Category id : ${req.query.category}`)
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('<h1>404</h1>')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})