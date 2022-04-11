"use strict";

// Create route function with pathname as parameter
function route(path, handle, req, res) {
	console.log('Routing a request for ' + path);

	if (typeof handle[path] == 'function') {
		handle[path](path, req, res);
	}
	else {
		console.log("No handler found for: " + path);
		res.writeHead(404, {'Content-Type': 'text/html'});
		res.write("<h1>Error 404: Resource not found!</h1>");
		res.end();
	}
}

// Export route function
exports.route = route;