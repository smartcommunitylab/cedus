$(document).ready(function() {
	initMap();
	//ajax call for level
	$.ajax
	({
		type: "GET",
		//dataType : 'json',
		//url:'https://dev.smartcommunitylab.it/cedus/api/params/ordini',
		url: '../api/params/ordini',
		data: '' ,
		success: function (data) {
		//console.log("data name:",data);
		$.each(data,function(key, val){
			//console.log('dd:',val);
			var strVal="\"change_div('"+val+"')\"";
			//console.log('strVal:',strVal)
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
		if($(this).val()){
	    	$.ajax
	    	({
	    		type: "GET",
	    		//dataType : 'json',
	    		//url: 'https://dev.smartcommunitylab.it/cedus/api/cover/education',
	    		url:'../api/cover/education',
	    		data: {ordine:$('#levelText').text(),tipologia:$(this).val(),filter:'CAR_DISTANCE'} ,
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
	    		failure: function() {console.log("Error!");}
	    	});
		}
    });
	$( "input.radioOption" ).on( "click", function() {
		console.log( " is checked:" ,$( "input.radioOption:checked" ).val());
		//change range table below
		var radioValSelect=$( "input.radioOption:checked" ).val();
		
		if(radioValSelect=="CAR_DISTANCE" || radioValSelect=="TRANSIT_DISTANCE"){
			$('#timeMark').hide();
			$('#distanceMark').show();
		}else if(radioValSelect=="CAR_TIME" || radioValSelect=="TRANSIT_TIME"){
			$('#distanceMark').hide();
			$('#timeMark').show();
		}
		//change map with color for different type
		if($("#dropdownList").val()){
			var markers = [];
			
			$.ajax
	    	({
	    		type: "GET",
	    		//dataType : 'json',
	    		//url: 'https://dev.smartcommunitylab.it/cedus/api/cover/education',
	    		url:'../api/cover/education',
	    		data: {ordine:$('#levelText').text(),tipologia:$("#dropdownList").val(),filter:radioValSelect} ,
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
	    		failure: function() {console.log("Error!");}
	    	});
		}
	});
});
function change_div(level_text){
	var markers = [];
	$('#select_btn').hide();
	$('#select_type').show();
	$('#levelText').text(level_text);
	/*
	//ajax call for markers filter by level(on click level button)
	$.ajax
	({
		type: "GET",
		//dataType : 'json',
		//url: 'https://dev.smartcommunitylab.it/cedus/api/cover/education',
		url:'../api/cover/education',
		data: {ordine:level_text,tipologia:$("#dropdownList").val(),filter:'TRANSIT_DISTANCE'} ,
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
		
		//initMap(markers,data['districtMap']);	
		},
		failure: function() {alert("Error!");}
	});
	*/
	$('select#dropdownList').empty();
	//ajax call for tipologia (fullfill the dropdown box)
	$.ajax
	({
		type: "GET",
		//dataType : 'json',
		//url: 'https://dev.smartcommunitylab.it/cedus/api/params/Tipologie',
		url:'../api/params/tipologieForOrdine',
		data: {ordine:level_text} ,
		success: function (data) {
		$("#dropdownList").append("<option value=''>Tipologia di selezione</option>");
		$.each(data,function(key, val){
			$("#dropdownList").append("<option value='"+val+"'>"+val+"</option>");
		});
			
		},
		failure: function() {console.log("Error!");}
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
	    /*
	    stroke: false,
		color: '#fff',
		fillOpacity: 1,
		
		styles: [
		{elementType: 'geometry', stylers: [{color: '#FFFFFF'}]},
		{elementType: 'labels.text.stroke', stylers: [{color: '#FFFFFF'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#FFFFFF'}]}            
		
		],
		*/
	    
	    styles: [
	    	{
	    	    featureType: "administrative",
	    	    elementType: "all",
	    	    stylers: [
	    	      { visibility: "off" }
	    	    ]
	    	},{
	    	    featureType: "landscape.man_made",
	    	    elementType: "all",
	    	    stylers: [
	    	      { visibility: "off" }
	    	    ]
	    	},{
	    	    featureType: "poi.attraction",
	    	    elementType: "all",
	    	    stylers: [
	    	      { visibility: "off" }
	    	    ]
	    	},
	    	{
	    		featureType: 'transit',
	    		elementType: 'labels.icon',
	    		stylers: [{visibility: 'off'}]
	    	},
	    	{
	    	    featureType: "road",
	    	    elementType: "all",
	    	    stylers: [
	    	      { visibility: "off" }
	    	    ]
	    	},
	    	{
	    	    featureType: "poi",
	    	    elementType: "labels",
	    	    stylers: [
	    	      { visibility: "off" }
	    	    ]
	    	},
	    	{
	    	    featureType: "landscape",
	    	    elementType: "labels",
	    	    stylers: [
	    	      { visibility: "off" }
	    	    ]
	    	},
	    	{elementType: 'geometry', stylers: [{color: '#FFFFFF'}]},
			{elementType: 'labels.text.stroke', stylers: [{color: '#FFFFFF'}]},
	        {elementType: 'labels.text.fill', stylers: [{color: '#FFFFFF'}]}
	        
	    ],
	    
	    fullscreenControl: false,
	    streetViewControl: false,
	    mapTypeControl: false,
	    disableDefaultUI: true,
	    zoomControl: true,
	    directionsDisplay:false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	    //<!-- mapTypeId: google.maps.MapTypeId.TERRAIN -->
	});
	if(markers){
		//console.log("markers:",markers);
		$.each(markers,function(key, val){
			var marker = new google.maps.Marker({
				animation: google.maps.Animation.DROP,
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
		if(val['enString'][0]){
			decodePaths.push(google.maps.geometry.encoding.decodePath(val['enString'][0]));
		}
		if(val['enString'][1]){
			decodePaths.push(google.maps.geometry.encoding.decodePath(val['enString'][1]));				
		}
		if(districtMap){
			var codiceIstat="0"+val['PRO_COM'];
			polyColor=getPolyColor(districtMap[codiceIstat]);
			/*
			var radioVal=$( "input.radioOption:checked" ).val();
			var distMap;
			if(radioVal=="CAR_DISTANCE"){
				distMap="carDistance";
			}else if(radioVal=="CAR_TIME"){
				distMap="carTime";
			}else if(radioVal=="TRANSIT_DISTANCE"){
				distMap="transitDistance";
			}else if(radioVal=="TRANSIT_TIME"){
				distMap="transitTime";
			}
			//console.log("data 4 local file:",val['PRO_COM']);
			//console.log("districtMap:",districtMap[codiceIstat]);
			if(districtMap[codiceIstat]){
				if(districtMap[codiceIstat][distMap]<=20){
					polyColor="#40C144";
				}else if(districtMap[codiceIstat][distMap]>20 && districtMap[codiceIstat][distMap]<=40){
					polyColor="#E4EA19";
				}else if(districtMap[codiceIstat][distMap]>40 && districtMap[codiceIstat][distMap]<=100){
					polyColor="#FFA500";
				}else if(districtMap[codiceIstat][distMap]>100 ){
					polyColor="#FF0000";
				}else{
					console.log("districtMap:",districtMap[codiceIstat]);
					polyColor="#999999";
				}
			}else{
				//close to white color
				polyColor="#FFFFFF";
			}
			*/
		}
		
		
		polygons[key] = new google.maps.Polygon({
		    paths: decodePaths,
		    strokeColor: '#FFFFFF',
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: polyColor,
		    fillOpacity: 0.8
	  	});
		polygons[key].setMap(map);
	});
	
	google.maps.event.trigger(map, 'resize');
  
}

//function return the polygons color
function getPolyColor(districtMap){
	var radioVal=$( "input.radioOption:checked" ).val();
	var polyColor,distMap;
	if(radioVal=="CAR_DISTANCE"){
		distMap="carDistance";
	}else if(radioVal=="CAR_TIME"){
		distMap="carTime";
	}else if(radioVal=="TRANSIT_DISTANCE"){
		distMap="transitDistance";
	}else if(radioVal=="TRANSIT_TIME"){
		distMap="transitTime";
	}
	//console.log("data 4 local file:",val['PRO_COM']);
	//console.log("districtMap:",districtMap[codiceIstat]);
	if(districtMap){
		if(districtMap[distMap]<=20){
			polyColor="#40C144";
		}else if(districtMap[distMap]>20 && districtMap[distMap]<=40){
			polyColor="#E4EA19";
		}else if(districtMap[distMap]>40 && districtMap[distMap]<=100){
			polyColor="#FFA500";
		}else if(districtMap[distMap]>100 ){
			polyColor="#FF0000";
		}else{
			console.log("districtMap:",districtMap);
			polyColor="#999999";
		}
	}else{
		//close to white color
		polyColor="#FFFFFF";
	}
	return polyColor;
}