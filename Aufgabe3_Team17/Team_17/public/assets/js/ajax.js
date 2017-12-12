var visibleColumnNr = [];

//Dokument geladen
$(document).ready(initialize());

/********************************************************************************
********************************* SHOW HIDE BUTTONS *****************************
*********************************************************************************/
$( "#show_selected_prop" ).click(function() {
	 var cur = getColumnNumber();
	showHideTableColumn(cur, false);	
});

$( "#hide_selected_prop" ).click(function() {
  	var cur = getColumnNumber();
	showHideTableColumn(cur, true);	
});

//gibt ausgewählte Spalte zurück
function getColumnNumber(){
	var sel = document.getElementById("prop_selection");
	var cur = sel.options[sel.selectedIndex].value;
	return ++cur;	
}

/********************************************************************************
********************************* FORMS *****************************************
*********************************************************************************/

//Filter anwenden
$("#country_filter").submit(function(event) {
    event.preventDefault();
	filter();
});

//Eintrag Löschen
$("#country_delete").submit(function(event) {
    event.preventDefault();
	var id = document.getElementById("country_delete_id").value;
	
	if(id != null)
		id = id.trim();
	
	if(id == "" || id == null)
		deleteLastItem();
	else
		deleteItemWithId(id);	
});

//Neuen Eintrag erstellen
$("#country_add").submit(function(event) {
    event.preventDefault();	
	var name = document.getElementById("country_name").value;
	var birth = document.getElementById("country_birth").value;
	var cell = document.getElementById("country_cellphone").value;
	postNewItem(name, birth, cell);	
});

/********************************************************************************
********************************* REQUESTS ***************************************
*********************************************************************************/

//Ajax POST
function postNewItem(name, birth, cell){
		$.ajax("http://localhost:3000/items", {
		data: '{ "country_name": "' + name + '", "country_birth": "' + birth + '", "country_cellphone": "' + cell + '"}',
		contentType: "application/json", 
		method: "POST",
		success: refresh,
		error: handleResponseError
   });	
}

//Löschen mit ID
function deleteItemWithId(id){
	$.ajax("http://localhost:3000/items/" + id, {
		method: "DELETE",
		success: refresh,
		error: handleResponseError
   });		
}

//Löschen ohne ID
function deleteLastItem(){
	$.ajax("http://localhost:3000/items", {
		method: "DELETE",
      success: refresh,
      error: handleResponseError
   });		
}

//Eigenschaften anfordern
function receiveProps(){
	$.ajax("http://localhost:3000/properties", {
      success: fillProps,
      error: handleResponseError
   });	
}

//Ganze Tabelle anfordern
function receiveTable(){
	$.ajax("http://localhost:3000/items", {
      success: fillTable,
      error: handleResponseError
   });
}

//Tabellenfilter Anfrage mit mehreren IDs
function filterRange(start, end){
	$.ajax("http://localhost:3000/items/" + start + "/" + end, {
      success: fillTable,
      error: handleResponseError
   });	
}

//Tabellenfilter Anfrage mit ID
function filterSingle(id){
	$.ajax("http://localhost:3000/items/" + id, {
      success: fillSingle,
      error: handleResponseError
   });		
}


/********************************************************************************
********************************* PRIVATE METHODS ********************************
*********************************************************************************/

//Fehlermeldung anzeigen
function showStatusMessage(message, isError){
	var container = document.getElementById("status_box");
	var st = document.getElementById("status_text");
	
	if(isError)
		container.style.backgroundColor = "red";
	else
		container.style.backgroundColor = "green";
	
	container.style.visibility = 'visible';
	st.innerHTML = message;
	
	setTimeout(function(){container.style.visibility = 'hidden'}, 5000);
}

//Filter (gibt ganze Tabelle Zurück, wenn keine ID angegeben)
function filter(){
	var id = document.getElementById("country_filter_id").value;
	var range = document.getElementById("country_filter_range").value;
	
	var tBody = document.getElementById("table_body");
	removeAllChilds(tBody);
	
	if(!tryRange(range)){
		if(id == null || id.trim() == ""){
			receiveTable();
		}
		else{
			filterSingle(id);
		}
	}
	hideTableCols();
}

//Tablellenwerte  neu laden und Status anzeigen
function refresh(data){
	showStatusMessage(data, false);
	filter();
}

//Testet den angegebenen Intervall
//gibt false wenn die Variable leer oder falsch formatiert ist
function tryRange(range){
	var rangeSplit;
	if(range == null)
		return false;
	
	range = range.trim();
	rangeSplit = range.split("-");
	if(rangeSplit.length != 2)
		return false;
	filterRange(rangeSplit[0], rangeSplit[1]);
	return true;	
}

function initialize(){
	receiveProps();
	receiveTable();
}

//Um einzelne Spalte anzuzeigen
function fillSingle(data){
	var tBody = document.getElementById("table_body");
	removeAllChilds(tBody);	
	var row = document.createElement('tr');
	for(var prop in data){
        var cell = document.createElement('td');
        var cont = document.createTextNode(data[prop]);
        cell.appendChild(cont);
        row.appendChild(cell);
    }	
	tBody.appendChild(row);
	hideTableCols();
}

//Tabellenkopf und Eigenschaftenauswahl füllen
function fillProps(data){
	var selection = document.getElementById("prop_selection");
	var thead = document.getElementById("table_head");
	
	removeAllChilds(thead);
	
	for(i = 0; i < data.length; i++){
		//Tabellenkopf
		var th = document.createElement("th");
		th.innerHTML = data[i];
		thead.appendChild(th);
		
		//Eigenschaften
		var opt = document.createElement("option");		
		opt.value = i;		
		var txt = document.createTextNode(data[i]);
		opt.appendChild(txt);
		selection.appendChild(opt);
	}		
	
	hideTableColsInit(data.length);
}

//Nicht genutzte Spalten ausblenden
function hideTableColsInit(propCount){
	for(var i = 0; i < propCount; i++)
		visibleColumnNr.push(true);

	console.log("columns");
	console.log(visibleColumnNr);
	for(var i = 6; i < propCount; i++){
		if(i != 9){
			visibleColumnNr[i] = false;
			showHideTableColumn(i + 1, true);
		}
	}	
}

//Spalten nach 'visibleColumnNr' ausblenden
function hideTableCols(){
	for(var i = 0; i < visibleColumnNr.length; i++)
		showHideTableColumn(i + 1, !visibleColumnNr[i]);
}

//Spalte aus/einblenden
function showHideTableColumn(columnNr, hide){
	if(hide){
		$('#table_head th:nth-child(' + columnNr + ')').hide();
		$('#table_body td:nth-child(' + columnNr + ')').hide();
	}
	else{
		$('#table_head th:nth-child(' + columnNr + ')').show();
		$('#table_body td:nth-child(' + columnNr + ')').show();
	}
	visibleColumnNr[columnNr -1] = !hide;	
}


function removeAllChilds(root){
	while (root.firstChild)
		root.removeChild(root.firstChild);	
}

//Füllt tabelle mit angegebenem (array)
function fillTable(data){
	var tBody = document.getElementById("table_body");
	removeAllChilds(tBody);
	for(var i = 0; i < data.length; i++){
        var row = document.createElement('tr');
        for(var prop in data[i]){
            var cell = document.createElement('td');
            var cont = document.createTextNode(data[i][prop]);
            cell.appendChild(cont);
            row.appendChild(cell);
        }
        tBody.appendChild(row);
    }
	hideTableCols();
}

//Fehlermeldung
function handleResponseError(jqXHR, textStatus, errorThrown){
	console.log("Error: " + errorThrown + ": " + jqXHR.responseText);	
	showStatusMessage(errorThrown + ": " + jqXHR.responseText, true);
}