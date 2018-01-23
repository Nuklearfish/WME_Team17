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
}

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
$(document).ready(function () {
		var data;
		$.ajax({
			dataType: "json",
			url: 'world_data.json',
			data: data,
			async : false,
			success: function (data) {

	
	var worldmap = L.map('mapid').fitWorld();
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(worldmap);
	
	for (i = 0; i < 25; i++) { 
    	var gps_lat = data[i].gps_lat;
		var gps_long = data[i].gps_long;
		var cname = data[i].name;
		var gdp_p_c = data[i].gdp_per_capita;
		var cid = data[i].id;
		maker = L.marker([gps_lat, gps_long]).addTo(worldmap)
		.bindPopup("" + cname + "</b><br /> GDP_per_Capita:" + gdp_p_c + "</b><br /> ID:" + cid);
		
	}		
	//L.marker([-23.5, -46.6]).addTo(worldmap)
	//	.bindPopup("Brazil");
	//	L.marker([51.5, -0.09]).addTo(worldmap)
	//	.bindPopup("<b>Hello world!</b><br />I am a popup.");			
			
			
			
			}
		});
	});

/********************************************************
 ********************* D3js vis *************************
 ********************************************************/

/***********Bar Chart from D3js updated*********/

let formatValue = d3.format(",.0f");

let margin = {top: 20, right: 25, bottom: 110, left: 45},
    width = 600 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

let xAxis = d3.axisBottom(x),
    yAxis = d3.axisLeft(y),
    yGrid = d3.axisLeft(y).tickSize(-width);

let g = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");
	
var durations = 0;
	
function afterLoad() {
    durations = 750;
};
	
g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")");

g.append("g")
    .attr("class", "axis axis--y");
    

function type(d) { return d; }    

d3.queue()
    .defer(d3.csv, "world_data.csv", type)
    .await(ready);

function ready(error, data) {

  if (error) throw error;
  
  var data, INT;

  
  // Event handlers
  d3.select("#category").on('change', update);
     
  update();
   
  
  function update() {
    
    INT = d3.select('#category').property('value');
  
    // Update domain
    y.domain([0, d3.max(data, function(d) {
    		return +d[INT]; })
    ]).nice();
    
    // Update y axis
    g.selectAll(".axis.axis--y").transition()
    	.duration(durations)
    	.call(yAxis);
    
    	
    // set x domain
    x.domain(data.map(function(d) { return d.name; }));
    
    g.selectAll(".axis.axis--x").transition()
    	.duration(durations)
    	.call(xAxis)
       .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)");
    	
    // Update rectangles
    let bars = g.selectAll(".barEnter")
      .data(data, function(d){
        return d.name;
      });
      
    bars = bars
      .enter()
      .append("rect")
      .attr("class", "barEnter") // Enter data reference
      .attr("width", x.bandwidth())
      .merge(bars);
    
    bars.transition()
    	.duration(durations)
    	.attr("height", function(d) { 
    		return height - y(d[INT]); 
    		})
    	.attr("x", function(d) { 
      	return x(d.name); 
      })
    	.attr("y", function(d) { 
    		return y(d[INT]); 
    		});
    
    bars.exit().remove();
    

  } // End of update

  afterLoad()

} // End of ready

/************second Bar chart*************/
let svg = d3.select("#chart1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");
	
svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")");

svg.append("g")
    .attr("class", "axis axis--y");
        

d3.queue()
    .defer(d3.csv, "world_data.csv", type)
    .await(ready1);

function ready1(error, data) {

  if (error) throw error;
  
  var data, INT1;

  
  // Event handlers
  d3.select("#category1").on('change', update1);
     
  update1();
   
  
  function update1() {
    
    INT1 = d3.select('#category1').property('value');
  
    // Update domain
    y.domain([0, d3.max(data, function(d) {
    		return +d[INT1]; })
    ]).nice();
    
    // Update y axis
    svg.selectAll(".axis.axis--y").transition()
    	.duration(durations)
    	.call(yAxis);
    
    	
    // set x domain
    x.domain(data.map(function(d) { return d.name; }));
    
    svg.selectAll(".axis.axis--x").transition()
    	.duration(durations)
    	.call(xAxis)
       .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)");
    	
    // Update rectangles
    let bars1 = svg.selectAll(".barEnter")
      .data(data, function(d){
        return d.name;
      });
      
    bars1 = bars1
      .enter()
      .append("rect")
      .attr("class", "barEnter") // Enter data reference
      .attr("width", x.bandwidth())
      .merge(bars1);
    
    bars1.transition()
    	.duration(durations)
    	.attr("height", function(d) { 
    		return height - y(d[INT1]); 
    		})
    	.attr("x", function(d) { 
      	return x(d.name); 
      })
    	.attr("y", function(d) { 
    		return y(d[INT1]); 
    		});
    
    bars1.exit().remove();
    

  } // End of update

  afterLoad();

} // End of ready

/********************************************************
 ********************* Leaflet **************************
 ********************************************************/




	



	/*var popup = L.popup();

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(worldmap);
	}

	worldmap.on('click', onMapClick);*/


