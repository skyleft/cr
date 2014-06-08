/**
 * Created by andy on 14-6-8.
 */

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

function processRequestRoute(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log(pathname);
    if (pathname === '/') {
        pathname = "/index.html";
    }
    var ext = path.extname(pathname);
    var localPath = '';
    var staticRes = false;
    if (ext.length > 0) {
        localPath = '.' + pathname;
        staticRes = true;
    } else {
        //don't handle js for now
    }


    fs.exists(localPath, function (exists) {
        if (exists) {
            if (staticRes) {
                staticResHandler(localPath, ext, response);
            } else {
                //just handled static resources for now
            }
        } else {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('404:File Not found');
        }
    });
}

function staticResHandler(localPath, ext, response) {
    fs.readFile(localPath, "binary", function (error, file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.end("Server Error:" + error);
        } else {
            response.writeHead(200, { "Content-Type": getContentTypeByExt(ext) });
            response.end(file, "binary");
        }
    });
}

function getContentTypeByExt(ext) {
    ext = ext.toLowerCase();
    if (ext === '.htm' || ext === '.html')
        return 'text/html';
    else if (ext === '.js')
        return 'application/x-javascript';
    else if (ext === '.css')
        return 'text/css';
    else if (ext === '.jpe' || ext === '.jpeg' || ext === '.jpg')
        return 'image/jpeg';
    else if (ext === '.png')
        return 'image/png';
    else if (ext === '.ico')
        return 'image/x-icon';
    else if (ext === '.zip')
        return 'application/zip';
    else if (ext === '.doc')
        return 'application/msword';
    else
        return 'text/plain';
}

exports.simpleServer = http.createServer(processRequestRoute);