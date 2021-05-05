const http = require('http')
const fs = require('fs')

const port = 3000;

const renderHtml = (path, response) => {
    fs.readFile(path, (error, data) => {
        if (error) {
            response.writeHead(404)
            response.write('Error: file not found')
        } else {
            response.write(data)
        }
        response.end()
    })
}

http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    })

    const url = request.url

    // if (url === '/about') {
    //     renderHtml('./about.html', response)
    // } else if (url === '/contact') {
    //     renderHtml('./contact.html', response)
    // } else {
    //     renderHtml('./index.html', response)
    // }

    switch (url) {
        case '/about':
            renderHtml('./about.html', response)
            break
        case '/contact':
            renderHtml('./contact.html', response)
            break
        default:
            renderHtml('./index.html', response)
            break
    }

}).listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})