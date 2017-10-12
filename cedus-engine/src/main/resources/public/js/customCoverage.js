$(document).ready(function() {
	initMap();
	//ajax call for level
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
	//change the map on change of dropdown value
	$("#dropdownList").change(function(){
		var markers = [];
        //console.log("level data:", $('#levelText').text());
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
    		
    		initMap(markers,data['districtMap']);	
    		},
    		failure: function() {console.log("Error!");}
    	});
    });
});
function change_div(level_text){
	var markers = [];
	$('#select_btn').hide();
	$('#select_type').show();
	$('#levelText').text(level_text);
	//ajax call for markers filter by level(on click level button)
	$.ajax
	({
		type: "GET",
		//dataType : 'json',
		url: 'https://dev.smartcommunitylab.it/cedus/api/cover/education',
		data: {ordine:level_text,filter:'TRANSIT_DISTANCE'} ,
		success: function (data) {
		//console.log("data name:",data['tuList']);
		$.each(data['tuList'],function(key, val){
			//console.log("data geocode:",val['geocode'][0]);
			markers.push({
			  lat: val['geocode'][1],
			  lng: val['geocode'][0],
			  name: val['name']
			});
		});
		
		initMap(markers,data['districtMap']);	
		},
		failure: function() {alert("Error!");}
	});
	//ajax call for tipologia (fullfill the dropdown box)
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

function initMap(markers,districtMap) {
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
		//console.log("markers:",markers);
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
	var polygons = new Array();
	
	$.each(allGeoData,function(key, val){
		var polyColor;
		var decodePaths=[];
		//decode.push(google.maps.geometry.encoding.decodePath(val['enString'][0]));
		decodePaths.push(google.maps.geometry.encoding.decodePath(val['enString'][0]));
		if(districtMap){
			var codiceIstat="0"+val['PRO_COM'];
			console.log("data 4 local file:",val['PRO_COM']);
			console.log("districtMap:",districtMap[codiceIstat]);
			if(districtMap[codiceIstat]){
				if(districtMap[codiceIstat]['carDistance']<50){
					polyColor="#000000";
				}else if(districtMap[codiceIstat]['carDistance']>50 && districtMap[codiceIstat]['carDistance']<100){
					polyColor="#555555";
				}else if(districtMap[codiceIstat]['carDistance']>100 && districtMap[codiceIstat]['carDistance']<150){
					polyColor="#";
				}else if(districtMap[codiceIstat]['carDistance']>150 && districtMap[codiceIstat]['carDistance']<200){
					polyColor="#777777";
				}else{
					polyColor="#999999";
				}
			}else{
				//close to white color
				polyColor="#800000";
			}
		}
		//console.log("districtMap:",districtMap);
		/*
		if(markers){
			//console.log("markers:",markers);
			$.each(markers,function(key2, val2){
				//check  lat:val['lat'],lng:val['lng'] is in map and put color
				var coord1 = new google.maps.LatLng(val2['lat'],val2['lng']);
				var bermudaTriangle = new google.maps.Polygon({paths: google.maps.geometry.encoding.decodePath(val['enString'][0])});
				if (google.maps.geometry.poly.containsLocation(coord1, bermudaTriangle)) {
					console.log("marker is inside the polygon");
					polyColor="#000000";
					return false; 
				} else {
					console.log("marker is not inside the polygon");
					polyColor="#878787";
				}
			});
			
		}
		polygons[key] = new google.maps.Polygon({
		    paths: google.maps.geometry.encoding.decodePath(val['enString'][0]),
		    strokeColor: '#FFFFFF',
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: polyColor,
		    fillOpacity: 1
	  	});
		polygons[key].setMap(map);
		*/
		if(val['enString'][1]){
			//decode.push(google.maps.geometry.encoding.decodePath(val['enString'][1]));
			decodePaths.push(google.maps.geometry.encoding.decodePath(val['enString'][1]));
						
		}
		polygons[key] = new google.maps.Polygon({
		    paths: decodePaths,
		    strokeColor: '#FFFFFF',
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: polyColor,
		    fillOpacity: 1
	  	});
		polygons[key].setMap(map);
	});
	/*
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
  	*/
	google.maps.event.trigger(map, 'resize');
  
	}