var fs = require('fs');
const http = require('http');
var display = require('./display');

// download data file from murdoch url
function reqDownload(result)
    {
        console.log("Request handler 'download' is downloading data file")
        var year = parseInt(result.year);
        if(year >= 2010)
        {
            var url = 'http://it.murdoch.edu.au/~S900432D/ict375/data/' + year + '.json';
            const file = fs.createWriteStream('../downloads/' + year + '.json');

            http.get(url, function(res) {        
                res.pipe(file);
            });
        }
        else if(year <= 2009)
        {
            var url = 'http://it.murdoch.edu.au/~S900432D/ict375/data/' + year + '.xml';
            const file = fs.createWriteStream('../downloads/' + year + '.xml');

            http.get(url, function(res) {        
                res.pipe(file);
            });
        }
        else
        {
            console.log("Error downloading file");
        }
    }

exports.reqDownload = reqDownload;