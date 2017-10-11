var map,infoWindow,mapPointer; 
$(document).ready(function() {
	$('#pill1').click(function(e) {
		//initMapPointer();
		setTimeout(initMapPointer, 300);
		console.log("call initMapPointer");
	});
	$('#pill2').click(function(e) {
		$('#select_btn').empty();
		//ajax call and get level list for set button
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
				$('#select_btn').append("<div class='row'><button type='button' class='btn btn-success btn-block' style='width:90%' onclick="+strVal+" >"+val+"</button></div><br/>");
			});
			
			//initMap(markers);	
			},
			failure: function() {console.log("Error!");}
		});
		setTimeout(initMap, 200);
	});
	//change the map on change of dropdown value
	$("#dropdownList").change(function(){
		var markers = [];
        console.log("level data:", $('#levelText').text());
        //ajax call for markers (filter by tipologia)
    	$.ajax
    	({
    		type: "GET",
    		//dataType : 'json',
    		url: 'https://dev.smartcommunitylab.it/cedus/api/cover/education',
    		data: {ordine:$('#levelText').text(),tipologia:$(this).val(),filter:'TRANSIT_DISTANCE'} ,
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
    		failure: function() {console.log("Error!");}
    	});
    });
	
});
/*
$('.selectpicker').selectpicker({
	liveSearch: true, 
	showTick: true, 
	width: 'auto'
});
*/
function change_div(level_text){
	var markers = [];
	$('#select_btn').hide();
	$('#select_type').show();
	$('#levelText').text(level_text);
	//ajax call for markers (filter by level)
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
		failure: function() {console.log("Error!");}
	});
	//ajax call for tipologia in dropdown box
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
			//$("#dropdownList").append("<li><a href='#'>"+val+"</a></li>");
			$("#dropdownList").append("<option value='"+val+"'>"+val+"</option>");
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
	    /* mapTypeId: google.maps.MapTypeId.TERRAIN */
	});
	infoWindow = new google.maps.InfoWindow;
	if(markers){
		console.log("markers:",markers);
		$.each(markers,function(key, val){
			var marker = new google.maps.Marker({
				position: {lat:val['lat'],lng:val['lng']},
				map: map,
				title: val['name']
			});
		});
		
	}else{
		//current position
		// Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            /*
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            */
            var marker = new google.maps.Marker({
				position: pos,
				map: map,
				title: 'user'
			});
			
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
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

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function initMapPointer(){
	mapPointer = new google.maps.Map(document.getElementById('mapPointer'), {
	    zoom: 09,
	    center: {
	      	lat: 46.152947008922631,
	  		lng: 11.16226884897163
	    },		
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	// Define the LatLng coordinates for the polygon's path.
	var decode=[];

	$.each(allGeoData,function(key, val){
		decode.push(google.maps.geometry.encoding.decodePath(val['enString'][0]));
		if(val['enString'][1]){
			decode.push(google.maps.geometry.encoding.decodePath(val['enString'][1]));
		}
		
	});
	
	// Construct the polygon.
  	var polygons = new google.maps.Polygon({
	    paths: decode,
	    strokeColor: '#FFFFFF',
	    strokeOpacity: 0.8,
	    strokeWeight: 2,
	    fillColor: "#494949",
	    fillOpacity: 0.35
  	});
  	//console.log("decode polygons:",polygons);
  	polygons.setMap(mapPointer);
  	google.maps.event.trigger(mapPointer, 'resize');
}