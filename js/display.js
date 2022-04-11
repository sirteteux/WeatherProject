var fs = require('fs');
var xmldom = require('xmldom').DOMParser;
const xml2js = require('xml2js');
var parser;
var doc;

var calculations = require('./calculations');
parser = new xmldom();

function reqDisplay(req, res, result)
{
    console.log("Request handler 'display' was called.");
    display(req, res, result);
}

function display(req, res, result) {
	var year = (result.year);

    	if(year >= '2010') {
        	year += '.json';
    	}
    	if(year <= '2009') {
        	year += '.xml';
    	}

    	var downloadPath = ('../downloads/' + year);
    	var dataPath = ('../data/' + year);

    	const downloadPathBuffer = Buffer.from(fs.readFileSync('../downloads/' + year));
    	const dataPathBuffer = Buffer.from(fs.readFileSync('../data/' + year));

    	var checkBuffer = downloadPathBuffer.includes(dataPathBuffer);
    
    	if(checkBuffer) {
        	readDataFile(downloadPath, callbackResult => {
            		calculations.dataCalculations(req, res, callbackResult);
        	});   
    	}
    	else {
        	readDataFile(dataPath, callbackResult => {
            		calculations.dataCalculations(req, res, callbackResult);
        	});
    	}
      
	function readDataFile(path, callback) {
        	if(path.includes("xml")) {
                	console.log("Converting XML file to JSON");
                	fs.readFile(path, 'utf-8', function (err, data) {
                    		if (err) {
                        		throw err;
                    		}
                    		doc = parser.parseFromString(data, 'application/xml');

                    		xml2js.parseString(doc, { explicitArray : false }, (err, result) => {
                        	if(err) {
                            		throw err;
                        	}                    
                        	callback(result.weather.record);
                    	});
                });
	}
        else if(path.includes("json")) {
		console.log("Reading JSON file");
		fs.readFile(path, 'utf-8', function (err, data) {
			if (err) {
                        	throw err;
                    	}
                    	var jsonobj = JSON.parse(data);
                    	callback(jsonobj.weather.record);
                });
	}
	else {
		callback(null);
        }
    }
}

exports.reqDisplay = reqDisplay;
exports.display = display;