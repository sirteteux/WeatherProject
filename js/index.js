"use strict";

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};

// reqStart handle
handle["/"] = requestHandlers.reqStart;
handle["/sassignment2/index.html"] = requestHandlers.reqStart;
handle["/css/style.css"] = requestHandlers.reqStart;
handle["/sassignment2/css/style.css"] = requestHandlers.reqStart;
handle["/js/validate.js"] = requestHandlers.reqStart;
handle["/sassignment2/js/validate.js"] = requestHandlers.reqStart;
handle["/favicon.ico"] = requestHandlers.reqStart;

// reqCheck handle
handle["/check"] = requestHandlers.reqCheck;

// reqCredits handle
handle["/sassignment2/credits.html"] = requestHandlers.reqCredits;
handle["/css/creditsstyle.css"] = requestHandlers.reqCredits;
handle["/sassignment2/css/creditsstyle.css"] = requestHandlers.reqCredits;
handle["/sassignment2/favicon.ico"] = requestHandlers.reqCredits;

// reqNews handle
handle["/sassignment2/news.html"] = requestHandlers.reqNews;
handle["/css/newsstyle.css"] = requestHandlers.reqNews;
handle["/sassignment2/css/newsstyle.css"] = requestHandlers.reqNews;
handle["/sassignment2/julyWeather.jpg"] = requestHandlers.reqNews;
handle["/sassignment2/images/julyWeather.jpg"] = requestHandlers.reqNews;
handle["/sassignment2/firstHalfJuly.jpg"] = requestHandlers.reqNews;
handle["/sassignment2/images/firstHalfJuly.jpg"] = requestHandlers.reqNews;
handle["/sassignment2/favicon.ico"] = requestHandlers.reqNews;

server.startServer(router.route, handle);