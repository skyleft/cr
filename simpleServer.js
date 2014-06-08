/**
 * Created by andy on 14-6-8.
 */

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

function handleURL(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log(pathname);
    if (pathname === '/') {
        pathname = "/chatroom.html"; // make chatroom page be the default page
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
                staticURLHandle(localPath, ext, response);
            } else {
                //just handled static resources for now
            }
        } else {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('404');
        }
    });
}

function staticURLHandle(localPath, ext, response) {
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
    else
        return 'text/plain';
}

exports.simpleServer = http.createServer(handleURL);