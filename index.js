const http = require('http')
const fs = require('fs')
const url = require('url')
const express = require('express')

const app = express()

const myHandler = (req, res) => {
    if (req.url === '/favicon.ico') return res.end()
    const log = ""
    const myUrl = url.parse(req.url, true)

    fs.appendFile("log.txt", log, (err, data) => {
        switch (myUrl.pathname) {
            case "/":
                if (req.method === "GET") res.end("HomePage"); break;
            case "/about":
                const username = myUrl.query.myname; res.end(`Hi, ${username}`);
                break;
            case "/search":
                I
                const search = myUrl.query.search_query;
                res.end("Here are your results for " + search);
            case "/signup":
                if (req.method === "GET") res.end("This is a signup Form");
                else if (req.method === "POST") {
                    // DB Query
                    res.end("Success");
                }
            default:
                res.end("Not Found")
        }
    });
}

const myServer = http.createServer(myHandler)
myServer.listen(8000, () => {
console.log("server started");
})
