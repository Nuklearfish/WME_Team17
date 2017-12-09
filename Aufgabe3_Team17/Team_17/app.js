// DO NOT CHANGE!
//init app with express, util, body-parser, csv2json
var express = require('express');
var app = express();
var sys = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var Converter = require("csvtojson").Converter;

//register body-parser to handle json from res / req
app.use( bodyParser.json() );

//register public dir to serve static files (html, css, js)
app.use( express.static( path.join(__dirname, "public") ) );

// END DO NOT CHANGE!


/**************************************************************************
****************************** csv2json *********************************
**************************************************************************/
var jsonTable; //stores all items
var properties; //stores all properties
var lastId = 1; //the last index used

var converter = new Converter({
  checkType:false,
  delimiter:";"
});

//reads the csv and set the properties and the last id
converter.on("end_parsed", function (jsonArray) {
	jsonTable = jsonArray;
    //Datei erstellen
    require("fs").writeFile('jsonTable.json', JSON.stringify(jsonTable), 'utf8');
    
	properties = new Array();
	
	if(jsonTable.length == 0 )
		return;
	
	//remove the trailing zeros
	for(var i = 0; i < jsonTable.length; i++)
		jsonTable[i].id = removeTrailingZero(jsonTable[i].id);
	
	for(var prop in jsonTable[0])
		properties.push(prop);
		
	lastId = parseInt(jsonTable[jsonTable.length - 1].id);
});
//open and read CSV
require("fs").createReadStream("public/world_data.csv").pipe(converter);

/**************************************************************************
********************** handle HTTP METHODS ***********************
**************************************************************************/




/**************************************************************************
********************** Private METHODS ************************************
**************************************************************************/

//gets a item by a id
function getItemById(id){
	for(var i = 0; i < jsonTable.length; i++){		
		if(jsonTable[i]["id"] == id){
			return jsonTable[i];
		}
	}
		return null;
}

//gets the range list
function getRangeList(start, end){
	var tmp = new Array();
	for(var i = 0; i < jsonTable.length; i++){
		var tmpId = jsonTable[i]["id"];
		if(tmpId >= start && tmpId <= end)
			tmp.push(jsonTable[i]);
	}
	return tmp;	
}

function removeTrailingZero(value){
	var val = value.replace(/^[0]+/g, '');
	//console.log("Convert from '" + value + "' to '" + val + "'");
	if(val == "")
		return 0;
	return parseInt(val);
}

function createItem(vId, vName, vBirth, vCell){
	return {id:	vId,
	name: vName,
	birth_rate_per_1000: vBirth,
	cell_phones_per_100: vCell,
	children_per_woman: "",
	electricity_consumption_per_capita: "",
	gdp_per_capita: "",
	gdp_per_capita_growth: "",
	inflation_annual: "",
	internet_user_per_100: "",
	life_expectancy: "",
	military_expenditure_percent_of_gdp: "", 
	gps_lat: "",
	gps_long: ""};
}

//Deletes an item with the given id. returns the item wich was deleted, 
//otherwise null if no element with the given id exists.
function deleteItemWithId(id){
	for(var i = 0; i < jsonTable.length; i++){
		if(id == jsonTable[i]["id"]){
			var val = jsonTable[i];
			jsonTable.splice(i, 1);
			return val;
		}
	}
	return null;	
}

// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});