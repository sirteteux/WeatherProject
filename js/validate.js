// Validate form after submit
function validateForm() {
	// get user input values from text field
	var yearTxt = document.forms["form"]["year"].value;
	var startMonthTxt = document.forms["form"]["startMonthTxt"].value;
	var endMonthTxt = document.forms["form"]["endMonthTxt"].value;

	// get user input values from radio button
	var meterological = document.forms["form"]["meterological"].value;
	var dataoptions = document.forms["form"]["dataoptions"].value

	// get options of datalist by id
	var years = document.getElementById("year");
	var startMonth = document.getElementById("startMonth");
	var endMonth = document.getElementById("endMonth");

    	// initilizing empty array
    	var value = [];
    	var startMValue = [];
    	var endMValue = [];

	storeInArray(value, years, startMValue, startMonth, endMValue, endMonth);

	// check year text is equivalent to its drop down values
	if( yearTxt != value[0] && yearTxt != value[1] && yearTxt != value[2] && yearTxt != value[3] && yearTxt != value[4] && yearTxt != value[5] && yearTxt != value[6] && yearTxt != value[7] && yearTxt != value[8] && yearTxt != value[9]) {
		document.getElementById("error").innerHTML = "Invalid year! Please enter a valid year *";
		return false;
	}
	else {
		document.getElementById("error").innerHTML = "";
	}

	// check start month text is equivalent to its drop down values
	if( startMonthTxt != startMValue[0] && startMonthTxt != startMValue[1] && startMonthTxt != startMValue[2] && startMonthTxt != startMValue[3] && startMonthTxt != startMValue[4] && startMonthTxt != startMValue[5] && startMonthTxt != startMValue[6] && startMonthTxt != startMValue[7] && startMonthTxt != startMValue[8] && startMonthTxt != startMValue[9] && startMonthTxt != startMValue[10] && startMonthTxt != startMValue[11]) {
		document.getElementById("error").innerHTML = "Invalid month! Please enter a valid start month *";
		return false;
	}
	else {
		document.getElementById("error").innerHTML = "";
	}

	// check end month text is equivalent to its drop down values
	if( endMonthTxt != endMValue[0] && endMonthTxt != endMValue[1] && endMonthTxt != endMValue[2] && endMonthTxt != endMValue[3] && endMonthTxt != endMValue[4] && endMonthTxt != endMValue[5] && endMonthTxt != endMValue[6] && endMonthTxt != endMValue[7] && endMonthTxt != endMValue[8] && endMonthTxt != endMValue[9] && endMonthTxt != endMValue[10] && endMonthTxt != endMValue[11]) {
		document.getElementById("error").innerHTML = "Invalid month! Please enter a valid start month *";
		return false;
	}
	else {
		document.getElementById("error").innerHTML = "";
	}

	// check if end month is later than the start month
	for (var i = 0; i < startMValue.length; i++) {
		if (startMonthTxt == startMValue[i]) {
			for (var j=0; j < i; j++) {
				delete endMValue[j];
			}
		}
	}

	//check end month text input with its dropdown values again if it's later than start month
	if( endMonthTxt != endMValue[0] && endMonthTxt != endMValue[1] && endMonthTxt != endMValue[2] && endMonthTxt != endMValue[3] && endMonthTxt != endMValue[4] && endMonthTxt != endMValue[5] && endMonthTxt != endMValue[6] && endMonthTxt != endMValue[7] && endMonthTxt != endMValue[8] && endMonthTxt != endMValue[9] && endMonthTxt != endMValue[10] && endMonthTxt != endMValue[11]) {
		document.getElementById("error").innerHTML = "Invalid month! Please enter a valid start month *";
		return false;
	}
	else {
		document.getElementById("error").innerHTML = "";

		// storing individual user inputs in JSON format
		var userInputs = {
			'year': yearTxt,
            		'startMonth': startMonthTxt,
            		'endMonth': endMonthTxt,
            		'meterological': meterological,
            		'dataoptions': dataoptions
        	}
		postData(userInputs, startMValue);
        	return false;
	}
}

// store each options of datalist in array
function storeInArray(value, years, startMValue, startMonth, endMValue, endMonth) {
	for (var i = 0; i < years.options.length; i++) {
		value[i] = years.options[i].value;
	}

	for (var j = 0; j < startMonth.options.length; j++) {
		startMValue[j] = startMonth.options[j].value;
	}

	for (var k = 0; k < endMonth.options.length; k++) {
		endMValue[k] = endMonth.options[k].value;
	}
}

// send form user inputs to url /check
function postData(userInputs, startMValue) {
	$.ajax({
        type: 'post',
        url: '/check',
        data: userInputs,
        success: function(weatherObjArrStr)
        {
            display(weatherObjArrStr, userInputs, startMValue);
        },
        error:function()
        {
            alert('Error sending user inputs'); 
        }
    });
}

// store json string data into individual array. Also, display graph & table.
function display(weatherObjArrStr, userInputs, startMValue){
	var weatherObjArr = JSON.parse(weatherObjArrStr);
    	var avgWs = [];
    	var totalSr = [];
    	var avgWsArray = [avgWs,avgWs,avgWs,avgWs,avgWs,avgWs,avgWs,avgWs,avgWs,avgWs,avgWs,avgWs];
    	var totalSrArray = [totalSr,totalSr,totalSr,totalSr,totalSr,totalSr,totalSr,totalSr,totalSr,totalSr,totalSr,totalSr,];
    
    	for (i = 0; i < weatherObjArr.length; i++) {
        	avgWsArray[i] = weatherObjArr[i].avgWs;
        	totalSrArray[i] = weatherObjArr[i].totalSr;           
    	}

    	$('.tableData').show();
    	$('.LineGraph').show();

    	if(userInputs['dataoptions'] === "table") {
        	// display table
        	$('.LineGraph').hide(); 
        	displayTable(userInputs, startMValue, avgWsArray, totalSrArray);
    	}
    	else if (userInputs['dataoptions'] === "graph"){
        	// display graph only
        	$('.tableData').hide();
        	displayGraph(userInputs, startMValue, totalSrArray, avgWsArray);
    	}
    	else {
        	// display both
        	displayTable(userInputs, startMValue, avgWsArray, totalSrArray);
        	displayGraph(userInputs, startMValue, totalSrArray, avgWsArray);
    	}
}

// display graph data
function displayGraph(userInputs, startMValue, totalSrArray, avgWsArray) {
	var meterological;
    	var start = userInputs["startMonth"];
    	var end = userInputs["endMonth"];
    	var indexStart = startMValue.indexOf(start);
    	var indexEnd = startMValue.indexOf(end) + 1;
    	var diff = indexEnd - indexStart;
    	var wsData = [];
    	var srData = [];

	for(var i=0; i < diff; i++) {
        	wsData[i] = { label: startMValue[indexStart + i],  y: avgWsArray[indexStart + i] };
    	}

    	for(var i=0; i < diff; i++) {
        	srData[i] = { label: startMValue[indexStart + i],  y: totalSrArray[indexStart + i] };
    	}

    	if(userInputs['meterological'] == "ws") {
        	meterological = [{
            		type: "line",
            		name: "Wind Speed",
            		showInLegend: true,
            		dataPoints: wsData            
        	}];
    	}
    	else if(userInputs['meterological'] == "sr") {
        	meterological = [{
            		type: "spline",
            		name: "Solar Radiation",
            		axisYType: 'secondary',
            		showInLegend: true,
            		dataPoints: srData
        	}];
    	}
    	else {
        	meterological = [{
            		type: "spline",
            		name: "Wind Speed",
            		showInLegend: true,
            		dataPoints: wsData
        	},   
        	{
            		type: "spline",
            		name: "Solar Radiation",
            		axisYType: 'secondary',
            		showInLegend: true,
            		dataPoints: srData
        	}];
    	}
   
    	var options = {
        	exportEnabled: true,
        	animationEnabled: true,
        	title:{
            		text: "Avg Wind speed and total Solar Rad for year: " + userInputs['year']
        	},
        	subtitles: [{
            		text: "Click Legend to Hide or Unhide Data Series"
        	}],
        	axisX: {
            		title: "Months"
        	},
        	axisY: {
            		title: "Wind Speed (Km/h)",
            		titleFontColor: "#4F81BC",
            		lineColor: "#4F81BC",
            		labelFontColor: "#4F81BC",
            		tickColor: "#4F81BC",
            		includeZero: true
        	},
        	axisY2: {
            		title: "Solar Rafiation (kWh/m2)",
            		titleFontColor: "#C0504E",
            		lineColor: "#C0504E",
            		labelFontColor: "#C0504E",
            		tickColor: "#C0504E",
            		includeZero: true
        	},
        	toolTip: {
            		shared: true
        	},
        	legend: {
            		cursor: "pointer",
            		itemclick: toggleDataSeries
        	},
        	data : meterological
    	};

    	$(".LineGraph").CanvasJSChart(options);
    
    	function toggleDataSeries(e) {
        	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            		e.dataSeries.visible = false;
        	} else {
            		e.dataSeries.visible = true;
        	}

        	e.chart.render();
    	}
}

// display table
function displayTable(userInputs, startMValue, avgWsArray, totalSrArray) {
	var data = [];

	var start = userInputs["startMonth"];
    	var end = userInputs["endMonth"];
    	var indexStart = startMValue.indexOf(start);
    	var indexEnd = startMValue.indexOf(end) + 1;
    	var diff = indexEnd - indexStart;
	console.log(diff);

    	for(var i=indexStart; i < diff; i++) {
        	data[i] = [startMValue[i], avgWsArray[i].toFixed(3), totalSrArray[i].toFixed(3)];
    	}
    	var dataSet = data;

    	$('#table').DataTable({
        	data : dataSet,
            	'columns':[
                {title: 'Months of year ' + userInputs['year']},
                {title: "Wind speed (Avg)"},
                {title: "Solar Radation (Total)"}
        	],
        	"bDestroy" : true,
        	"bSort" : false
    	});
}