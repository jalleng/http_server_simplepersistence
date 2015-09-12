'use strict';

var fs = require('fs');
var net = require('net');
var http = require('http');
var url = require('url');
var port = 3000;

var server = http.createServer(function(req, res) {

    if (req.method === 'GET') {
        if (req.url === '/names') {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.write('this is the name directory');
            return res.end();
        }
        else {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.write('Not Found');
            return res.end();
        }
    }
    if (req.method === 'POST') {
        req.on('data', function(data) {
            var parsed = JSON.parse(data.toString());
            console.log(parsed.Name);
            fs.readdir('./names', function(err, files) {
                var fileCount = files.length + 1;
                fs.writeFile('./names/file' + fileCount +'.json' , data, function(err) {
                    if (err) throw err;
                    console.log('It\'s saved!');
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.write('saved name');
                    return res.end();
                });
            });
        });
    }
    else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.write('page not found');
        res.end();
    }
});

server.listen(port, function() {
    console.log('server is listening on port ' + port);
});
