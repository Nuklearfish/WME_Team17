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

require("fs").createReadStream("public/world_data.csv").pipe(converter);
/**************************************************************************
********************** handle HTTP METHODS ***********************
**************************************************************************/


// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});