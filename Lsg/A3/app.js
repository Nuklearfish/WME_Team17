// DO NOT CHANGE!
//init app with express, util, body-parser, csv2json
var express = require('express');
var app = express();
var sys = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var Converter = require("csvtojson").Converter;
var fs = require("fs");

//register body-parser to handle json from res / req
app.use(bodyParser.json());

//register public dir to serve static files (html, css, js)
app.use(express.static(path.join(__dirname, "public")));

// END DO NOT CHANGE!


/**************************************************************************
 ****************************** csv2json *********************************
 **************************************************************************/
var JSONObject;

function parseAndSave() {
    var converter = new Converter({});
    converter.on("end_parsed", function (jsonArray) {
		//speichere CSV in JSONObject
        JSONObject = jsonArray;
		//erstelle Datei
        fs.writeFile('JSONObject.json', JSON.stringify(JSONObject), 'utf8');
    });
	//öffne und lese CSV Datei
    fs.createReadStream("A3/php/world_data_v1.csv").pipe(converter);

}
//Pfad zu allen Dateien damit html Seiten laden
app.use(express.static(path.join(__dirname, 'A3')));

//Startseite
app.get('/', function (req, res) {
    res.sendFile('A3/html/index.html', {root: __dirname});
});

//Muss bei allen ausgeführt werden
app.get('/data', function (req, res) {
    JSONObject = parseAndSave();
    setTimeout(function () {
        res.send(JSONObject);
    }, 500);
});
/**************************************************************************
 ********************** handle HTTP METHODS ***********************
 **************************************************************************/

 
//Alle Länder + Eigenschaften
app.get('/items', function (req, res) {
	//falls noch nicht parseAndSave() noch nicht aufgerufen wurde
    if(JSONObject === undefined){
        parseAndSave();
    }
    setTimeout(function () {
		//antworte JSONObject
        res.json(JSONObject);
    }, 500);
});

//Land + Eigenschaft mit übergebener ID
app.get('/items/:id', function (req, res) {
    var country;
	//falls noch nicht parseAndSave() noch nicht aufgerufen wurde
    if(JSONObject === undefined){
        parseAndSave();
    }
    setTimeout(function () {
		//Überprüfen ob Land mit ID gibt
        for (var i = 0; i < JSONObject.length; i++) {
            if (JSONObject[i].id == req.params.id) {
				//Wenn es eins gibt in country speichern
                country = JSONObject[i];
            }
        }
		//Wenn country nicht definiert ist wurde kein Land gefunden
        if (country == undefined) {
            res.status(404).json({error: 'No such id ' + req.params.id + ' in database.'})
        }
		//Antworte Land + Eigenschaften
        else {
			console.log(country);
            res.json(country);
        }
    }, 500);
});

//Länder + Eigenschaften zwischen 2 IDs
app.get('/items/:id1/:id2', function (req, res) {
	//falls noch nicht parseAndSave() noch nicht aufgerufen wurde
    if(JSONObject === undefined){
        parseAndSave();
    }
    setTimeout(function () {
        var boundaries = [];
        // Obere und untere Grenze setzen(id1,id2)
        for (var i = 0; i < JSONObject.length; i++) {
            if (JSONObject[i].id == req.params.id1 || JSONObject[i].id == req.params.id2) {
                boundaries.push(i);
            }
        }
        // Länge < 2 ==> id1 = id2 oder ids nicht enthalten|| id2 < id1 || kein elem dazwischen
        if (boundaries.length < 2 || boundaries[0] > boundaries[1] || boundaries[1] - boundaries[0] < 2) {
            res.status(400).json({error: 'Range not possible.'});
        } else {
            var countryArray = [];
            // länder dazwischen
            for (var j = boundaries[0] + 1; j < boundaries[1]; j++) {
                console.log(j);
                countryArray.push(JSONObject[j]);
            }
			console.log(countryArray);
            res.json(countryArray);
        }
    }, 500);
});

//gibt alle Eigenschaften in einem Array zurück
function properties() {
    var propertyArray = [];
    for (var i = 0; i < JSONObject.length; i++) {
        for (var key in JSONObject[i]) {
            if (propertyArray.indexOf(key) == -1) {
                propertyArray.push(key);
            }
        }
    }
    return propertyArray;
}

//Eigenschaften
app.get('/properties', function (req, res) {
	//falls noch nicht parseAndSave() noch nicht aufgerufen wurde
    if(JSONObject === undefined){
        parseAndSave();
    }
    setTimeout(function () {
        var propertyArray = [];
		//iteriere über JSONObject
        for (var i = 0; i < JSONObject.length; i++) {
			//gehe über jedes Elem in JSONObject
            for (var key in JSONObject[i]) {
				//Wenn Eigenschaft des Element noch nicht in Array ist pushe in Array
                if (propertyArray.indexOf(key) == -1) {
                    propertyArray.push(key);
                }
            }
        }
		//antworte Eigenschaften
		console.log(propertyArray);
        res.json(propertyArray);
    }, 500);
});

//Spezielle Eigenschaft eines Landes
app.get('/properties/:num', function (req, res) {
	//falls noch nicht parseAndSave() noch nicht aufgerufen wurde
    if(JSONObject === undefined){
        parseAndSave();
    }
    setTimeout(function () {
        var propertyArray = properties();
		//Überprüfen ob Spezielle Eigenschaft existiert und sendet diese dann
        if (propertyArray.length > req.params.num && req.params.num >= 0) {
			console.log(propertyArray[req.params.num]);
            res.send(propertyArray[req.params.num]);
        } else {
			//Falls sie nicht existiert gibt es Fehler zurück
            res.status(404).json({error: 'No such property available.'});
        }
    }, 500);
});


//Fügt Land mit mind 3 Eigenschaften ein
app.post('/items', bodyParser.json(), function (req, res) {
	//falls noch nicht parseAndSave() noch nicht aufgerufen wurde
    if(JSONObject === undefined){
        parseAndSave();
    }

    setTimeout(function () {
		//Überprüfen ob 3 Eigenschaften, davon eine der Name gesetzt wurde
        if (Object.keys(req.body).length < 3 || !Object.keys(req.body).hasOwnProperty('name') ) {
            res.status(400).json({error: 'Bad request!'});
        }else{
			//Falls ja erstelle neuen Eintrag mit Daten
            var newEntry = {
                "id": JSONObject[JSONObject.length-1].id + 1,
                "name": req.body["name"],
                "birth rate per 100": req.body["birth rate per 100"],
                "cell phones per 100": req.body["cell phones per 100"],
                "children per woman" : req.body["children per woman"],
                "electricity consumption per capita": req.body["electricity consumption per capita"],
                "internet usage per 100": req.body["internet usage per 100"]
            };
			//Speichere neuen Eintrag in JSONObject
			console.log(newEntry);
            JSONObject.push(newEntry);
            res.status(200).json({message: 'Added country ' + req.body.name + ' to list!'});
        }
    }, 500);
});

//lösche letztes Land
app.delete('/items', function (req, res) {
	//falls noch nicht parseAndSave() noch nicht aufgerufen wurde
    if(JSONObject === undefined){
        parseAndSave();
    }
    setTimeout(function () {
		//.pop() löscht letztes Land
        res.status(200).json({message: 'Deleted last country: ' + JSONObject.pop().name + '!'});
    }, 500);
});

//Land mit ID löschen
app.delete('/items/:id', function (req, res) {
    var countryArrayId;
	//falls noch nicht parseAndSave() noch nicht aufgerufen wurde
    if(JSONObject === undefined){
        parseAndSave();
    }
    setTimeout(function () {
		//Suche Land mit ID und speichere in countryArrayId
        for (var i = 0; i < JSONObject.length; i++) {
            if (JSONObject[i].id == req.params.id) {
                countryArrayId = i;
            }
        }
		//Falls kein Land gefunden wurde kann es nicht gelöscht werden
        if (countryArrayId == undefined) {
            res.status(404).json({error: 'No such id' + req.params.id + ' in database'})
        }
        else {
			//Über splice() wird Land gelöscht
			console.log(countryArrayId);
            JSONObject.splice(countryArrayId, 1);
            res.status(200).json({message: 'Item ' + req.params.id + ' deleted successfully'})
        }
    }, 500);
});


// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(server.address());
    console.log('Example app listening at http://%s:%s', host, port);
});