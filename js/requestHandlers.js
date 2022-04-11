"use strict";

var http = require('http');
var url = require('url');
var fs = require('fs');
var route = require('./router');
const { parse } = require('querystring');
var display = require('./display');
var download = require('./download');
var formidable = require("formidable");

function reqStart(path, req, res) {
	if(path.length == 1 || path.indexOf('.html') != -1){
		fs.readFile('../index.html', null, function (err, data) {
			if (err) {
				console.log(err);
			}
			else{
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data);
			}
			res.end();
		});
    	}

    	if(path.indexOf('.css') != -1){
		fs.readFile('../css/style.css', function (err, data) {
			if (err) {
				console.log(err);
			}
			else{
				res.writeHead(200, {'Content-Type': 'text/css'});
				res.write(data);
			}
			res.end();
		});
    	}

	if(path.indexOf('validate.js') != -1){
		fs.readFile('../js/validate.js', null, function (err, data) {
			if (err) {
				console.log(err);
			}
			else{
				res.writeHead(200, {'Content-Type': 'text/js'});
				res.write(data);
			}
			res.end();
		});
    	}
}

function reqCheck(path, req, res) {
	console.log("Request handler 'reqCheck' is processing.");
	
    	res.writeHead(200, { 'Content-Type': 'text/plain' });
    	req.on('data', function(data) {
        	var body = data.toString();
        	var result = parse(body);
		console.log(body);
        	download.reqDownload(result);
        	display.reqDisplay(req, res, result);
    	});
}


function reqNews(path, req, res) {
	if(path.length == 1 || path.indexOf('.html') != -1){
		fs.readFile('../news.html', null, function (err, data) {
			if (err) {
				console.log(err);
			}
			else{
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data);
			}
			res.end();
		});
    	}

    	if(path.indexOf('.css') != -1){
		fs.readFile('../css/newsstyle.css', function (err, data) {
			if (err) {
				console.log(err);
			}
			else{
				res.writeHead(200, {'Content-Type': 'text/css'});
				res.write(data);
			}
			res.end();
		});
    	}

    	if(path.indexOf('julyWeather.jpg') != -1){
		fs.readFile('../images/julyWeather.jpg', function (err, data) {
			if (err) {
				console.log(err);
			}
			else{
				res.writeHead(200, {'Content-Type': 'text/jpg'});
				res.write(data);
			}
			res.end();
		});
    	}

	if(path.indexOf('firstHalfJuly.jpg') != -1){
		fs.readFile('../images/firstHalfJuly.jpg', function (err, data) {
			if (err) {
				console.log(err);
			}
			else{
				res.writeHead(200, {'Content-Type': 'text/jpg'});
				res.write(data);
			}
			res.end();
		});
    	}
}

function reqCredits(path, req, res) {
	if(path.length == 1 || path.indexOf('.html') != -1){
		fs.readFile('../credits.html', null, function (err, data) {
			if (err) {
				console.log(err);
			}
			else{
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data);
			}
			res.end();
		});
    	}

    	if(path.indexOf('.css') != -1){
		fs.readFile('../css/creditsstyle.css', function (err, data) {
			if (err) {
				console.log(err);
			}
			else{
				res.writeHead(200, {'Content-Type': 'text/css'});
				res.write(data);
			}
			res.end();
		});
    	}
}

exports.reqStart = reqStart;
exports.reqCheck = reqCheck;
exports.reqNews = reqNews;
exports.reqCredits = reqCredits;