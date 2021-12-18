
const { createServer } = require("https");
var fs = require('fs');

const next = require('next')
const port = 3000;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const { parse } = require('url')


var options = {
    key: fs.readFileSync('/etc/ssl/private/apache-selfsigned.key'),
    cert: fs.readFileSync('/etc/ssl/certs/apache-selfsigned.crt'),
};

app.prepare().then(() => {
    createServer(options, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port, (err) => {
        if (err) throw err;
        console.log("ready - started server on url: https://35.84.224.138:" + port);
    });
});
