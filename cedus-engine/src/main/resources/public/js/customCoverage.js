$(document).ready(function() {
	initMap();
	$.ajax
	({
		type: "GET",
		//dataType : 'json',
		url: 'http://localhost:6050/cedus/api/params/ordini',
		data: '' ,
		success: function (data) {
		console.log("data name:",data);
		$.each(data,function(key, val){
			console.log('dd:',val);
			var strVal="\"change_div('"+val+"')\"";
			console.log('strVal:',strVal)
			$('#select_btn').append("<div class='row'><button type='button' class='btn btn-primary btn-block' style='width:90%' onclick="+strVal+" >"+val+"</button></div><br/>");
		});
		
		//initMap(markers);	
		},
		failure: function() {console.log("Error!");}
	});
});
function change_div(level_text){
	var markers = [];
	$('#select_btn').hide();
	$('#select_type').show();
	$('#levelText').text(level_text);
	
	$.ajax
	({
		type: "GET",
		//dataType : 'json',
		url: 'https://dev.smartcommunitylab.it/cedus/api/cover/education',
		data: {ordine:level_text,filter:'TRANSIT_DISTANCE'} ,
		success: function (data) {
		console.log("data name:",data['tuList']);
		$.each(data['tuList'],function(key, val){
			//console.log("data geocode:",val['geocode'][0]);
			markers.push({
			  lat: val['geocode'][1],
			  lng: val['geocode'][0],
			  name: val['name']
			});
		});
		
		initMap(markers);	
		},
		failure: function() {alert("Error!");}
	});
	//ajax call for tipologia
	$.ajax
	({
		type: "GET",
		//dataType : 'json',
		url: 'https://dev.smartcommunitylab.it/cedus/api/params/Tipologie',
		data: '' ,
		success: function (data) {
		console.log("data tipologia:",data);
		$.each(data,function(key, val){
			//console.log("data geocode:",val);
			$("#dropdownList").append("<li><a href='#'>"+val+"</a></li>");
		});
			
		},
		failure: function() {alert("Error!");}
	});
}
function back_div(){
	$('#select_btn').show();
	$('#select_type').hide();
	$('#levelText').text();
	initMap();	
}

function initMap(markers) {
	var map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 09,
	    center: {
	      	lat: 46.152947008922631,
	  		lng: 11.16226884897163
	    },
		//autoResize: false,
		
		styles: [
		{elementType: 'geometry', stylers: [{color: '#FFFFFF'}]},
		{elementType: 'labels.text.stroke', stylers: [{color: '#FFFFFF'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#FFFFFF'}]}            
		
		],
		mapTypeId: google.maps.MapTypeId.ROADMAP
	    <!-- mapTypeId: google.maps.MapTypeId.TERRAIN -->
	});
	if(markers){
		console.log("markers:",markers);
		$.each(markers,function(key, val){
			var marker = new google.maps.Marker({
				position: {lat:val['lat'],lng:val['lng']},
				map: map,
				title: val['name']
			});
		});
		
	}
	// Define the LatLng coordinates for the polygon's path.
	
	var decode=[];
	var arrColor=[];
	//test color
	/*
	var polygons = new google.maps.Polygon({
	    //paths: decode,
	    strokeColor: '#FFFFFF',
	    strokeOpacity: 0.8,
	    strokeWeight: 2,
	    fillColor: '#494949',
	    fillOpacity: 1
  	});
  	*/
	//end test color
	$.each(allGeoData,function(key, val){
		decode.push(google.maps.geometry.encoding.decodePath(val['enString'][0]));
		//polygons.setPath(google.maps.geometry.encoding.decodePath(val['enString'][0]));
		//polygons.setMap(map);
		arrColor.push("#ffffff");
		if(val['enString'][1]){
			decode.push(google.maps.geometry.encoding.decodePath(val['enString'][1]));
			//polygons.setPath(google.maps.geometry.encoding.decodePath(val['enString'][1]))
			//polygons.setMap(map);
			//console.log('key: ',key,'.enString: ',val['enString'][1]);
			arrColor.push("#494949");
		}
		
	});
	
	// Construct the polygon.
  	var polygons = new google.maps.Polygon({
	    paths: decode,
	    strokeColor: '#FFFFFF',
	    strokeOpacity: 0.8,
	    strokeWeight: 2,
	    fillColor: '#000000',
	    fillOpacity: 1
  	});
  	
  	polygons.setMap(map);
  	
	google.maps.event.trigger(map, 'resize');
  
	}