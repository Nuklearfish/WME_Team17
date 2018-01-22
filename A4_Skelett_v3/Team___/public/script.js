/********************************************************
 ********************* Collapsing Nav *******************
 ********************************************************/
var toggle_nav_btn = document.getElementById("pull");
toggle_nav_btn.onclick = function() {
  var main_nav = document.getElementById("main_nav");
  if ( main_nav.style.display == "" || main_nav.style.display == "none") {
    main_nav.style.display = "block";
  } else {
    main_nav.style.display = "none";
  }
};

//handle events from responsive show hide and collapsing nav
window.onresize = function(event) {
  var viewport_width = document.body.offsetWidth;

  //code of collapsing nav
  if (viewport_width >= 815) {
    main_nav.style.display = "block";
  } else if ( viewport_width < 815) {
    main_nav.style.display = "none";
  }
};

/********************************************************
 ********************* Sticky Header ********************
 ********************************************************/
var fixed = false;
var nav = document.getElementById("sticky_header");
var position = nav.offsetTop;

function stick(){
  var scrollY = window.scrollY || window.pageYOffset
  if (scrollY > position && !fixed) {
    fixed = true;
    nav.className = nav.className + ' fixed';
  } else if (scrollY <= position && fixed) {
    fixed = false;
    nav.classList.remove('fixed');
  }
}
window.onscroll = stick;

/********************************************************
 ********************* AJAX *****************************
 ********************************************************/
// load content on page load
	$(document).ready(function () {
		var data;
		$.ajax({
			dataType: "json",
			url: 'world_data.json',
			data: data,
			async: false,
			success: function (data) {
				// begin accessing JSON data here
		//		L.marker([data[3].gps_lat,[data[3].gps_long]).addTo(worldmap)
		//		.bindPopup("Brazil");
				
				alert(data[3].id);
				return data;
			}
		});
	});
/*$(document).ready(function() {
  //alert("Your script!");
	function setup() {

  
	alert("gg");	
}
});*/

/********************************************************
 ********************* D3js vis *************************
 ********************************************************/

/* YOUR SCRIPTS */

/********************************************************
 ********************* Leaflet **************************
 ********************************************************/

/*function load() {
	alert("g");
	var myData;
	
	alert(myData[1].name);
	alert(myData[1].id);
}*/

//alert(data[6].id);
var worldmap = L.map('mapid').fitWorld();

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(worldmap);
	



	L.marker([-23.5, -46.6]).addTo(worldmap)
		.bindPopup("Brazil");
	
	
	L.marker([51.5, -0.09]).addTo(worldmap)
		.bindPopup("<b>Hello world!</b><br />I am a popup.");

	



	/*var popup = L.popup();

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(worldmap);
	}

	worldmap.on('click', onMapClick);*/


