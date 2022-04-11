"use strict";

var http = require('http');
var url = require('url');
var route = require('./router');

function startServer(route, handle) {
	function onRequest(req,res) {
        var path = url.parse(req.url).pathname;
        console.log('Request for ' + path + ' received.');
        route(path, handle, req, res);
	}

	http.createServer(onRequest).listen(40515);

	console.log('Server running http://ceto.murdoch.edu.au:40515/');
	console.log('Process ID: ', process.pid);
}

exports.startServer = startServer;