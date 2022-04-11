// Calculations for average and total for Wind Speed and Solar Radiation
function dataCalculations(req, res, callbackResult) {
	console.log("Request handler 'calculations' was called.");

	var weatherObj = {'avgWs':0, 'totalWs':0, 'totalSr':0};
    	var weatherObjArray = [weatherObj,weatherObj,weatherObj,weatherObj,weatherObj,
        weatherObj,weatherObj,weatherObj,weatherObj,weatherObj,weatherObj,weatherObj];

	var count="";
	var countArray = [count,count,count,count,count,count,count,count,count,count,count,count,];

	for(var i=0; i < callbackResult.length; i++) {
        	var currentws = callbackResult[i]['ws'] * 3.6;
        	var currentsr = 0;
        
        	// Removing solar radiation below 100 w/m2
        	if(callbackResult[i]['sr'] >= 100)
        	{
            		currentsr = callbackResult[i]['sr'] / 6000;
        	}
        	var month = callbackResult[i]['date'].slice(3,5);
        
        	currentws += weatherObjArray[month-1]['totalWs'];
        	currentsr += weatherObjArray[month-1]['totalSr'];
        
        	avgWs = currentws / (countArray[month-1]);
  
        	weatherObjArray[month-1] = {'avgWs':avgWs, 'totalWs': currentws,'totalSr': currentsr};
        	if(weatherObjArray[month-1])
        	{
            		countArray[month-1] ++;
        	}
    	}

	for(var i=0; i<11; i++) {
        	delete weatherObjArray[i]['totalWs'];
    	}

    	console.log("weatherObjArray: ", weatherObjArray);
    	sendData(res, weatherObjArray);
}

function sendData(res, weatherObjArray){
    	// convert object to string
    	var jsonStr = JSON.stringify(weatherObjArray);

    	res.end(jsonStr);
    	console.log("Data successfully sent to client!");
}

exports.dataCalculations = dataCalculations;
exports.sendData = sendData;