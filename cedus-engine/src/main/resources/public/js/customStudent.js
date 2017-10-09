var map; 
$(document).ready(function() {
	$('#pill2').click(function(e) {
		setTimeout(initMap, 200);
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
		data: {ordine:1} ,
		success: function (data) {
		console.log("data name:",data['tuList']);
		$.each(data['tuList'],function(key, val){
			console.log("data geocode:",val['geocode'][0]);
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
}
function back_div(){
	$('#select_btn').show();
	$('#select_type').hide();
	$('#levelText').text();
	initMap();	
}

function initMap(markers) {
	map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 09,
	    center: {
	      	lat: 46.152947008922631,
	  		lng: 11.16226884897163
	    },
		//autoResize: false,
		/*
		styles: [
		{elementType: 'geometry', stylers: [{color: '#FFFFFF'}]},
		{elementType: 'labels.text.stroke', stylers: [{color: '#FFFFFF'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#FFFFFF'}]}            
		
		],
		*/
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
	$.each(allGeoData,function(key, val){
		decode.push(google.maps.geometry.encoding.decodePath(val['enString'][0]));
		if(val['enString'][1]){
			decode.push(google.maps.geometry.encoding.decodePath(val['enString'][1]));
			//console.log('key: ',key,'.enString: ',val['enString'][1]);
		}
		
	});
	
	// Construct the polygon.
  	var polygons = new google.maps.Polygon({
	    paths: decode,
	    strokeColor: '#FFFFFF',
	    strokeOpacity: 0.8,
	    strokeWeight: 2,
	    fillColor: '#000000',
	    fillOpacity: 0.35
  	});
  	polygons.setMap(map);
	google.maps.event.trigger(map, 'resize');
  
}