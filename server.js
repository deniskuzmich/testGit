const http = require('http');
let path = require("path");
const fs = require('fs');

let requestsCount = 0

const server = http.createServer((req, res) => {
    requestsCount++
    if (req.url === '/favicon.ico') {
        requestsCount--
        fs.readFile(path.join(__dirname, 'icons', 'favicon.ico'), (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end();
                return
            }
            res.writeHead(200, {'Content-Type': 'image/x-icon'});
            res.end(data);
        });
        return;
    }
    switch(req.url) {
        case '/students':
            res.write('students')
            break
        case '/':
        case '/courses':
            res.write('front + back')
            break
        default:
            res.write('404 Not Found')
    }
    res.write(' IT-Incubator' + requestsCount)
    res.end()
})

server.listen(3003);

