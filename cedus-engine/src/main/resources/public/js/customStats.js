//global array
var globalMasterData={
		tab1:[],
		tab2:[],
		tab3:[]
	};
var globalModifyData={
		tab1:[],
		tab2:[],
		tab3:[]
	};
var globalLevelList={
		tab1:[],
		tab2:[],
		tab3:[]
};
google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawPieChartCall);

google.charts.load('current', {'packages': ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBarChart);

function drawBarChartOnRequest(modifyType){
	if(modifyType=='anni'){
		var dataTable = new google.visualization.DataTable();
		dataTable.addColumn('string', 'Level');
		var options = {
			    title: 'Istituti Scolastici',
			    //chartArea: {width: '60%'},
			    width:650, 
			    height:400,
			    hAxis: {
				      title: 'Total...',
				      minValue: 0,
				      textStyle: {
				    	  bold: true,
				    	  fontSize: 12,
				    	  color: '#4d4d4d'
				      },
				      titleTextStyle: {
				    	  bold: true,
				    	  fontSize: 18,
				    	  color: '#4d4d4d'
				      }
			    },
			    vAxis: {
				      title: 'Level',
				      textStyle: {
				    	  fontSize: 14,
				    	  bold: true,
				    	  color: '#848484'
				      },
				      titleTextStyle: {
				    	  fontSize: 14,
				    	  bold: true,
				    	  color: '#848484'
				      }
			    },
			    colors: ['#67C169','#2F9232','#073308'],
			    is3D:true
			};
		//console.log("globalMasterData:",globalModifyData['tab1']);
		$.each(globalModifyData['tab1'][0],function(key, val){
			dataTable.addColumn('number', val['year']);
			dataTable.addColumn({type:'string',role: 'annotation' });
			//anniList['tab1'].push(val['year']);
			$.each(val['values'],function(key2,val2){
				if(key == 0){
					//dataTest.addRow([val2['name'],val2['value']]);
					dataTable.addRow([val2['name'],val2['value'],val['year'].toString()]);
					//levelList['tab1'].push(val2['name']);
				}else{
					dataTable.setValue(key2, key+key+1, val2['value']);
					dataTable.setValue(key2, key+key+2, val['year'].toString());
				}
				
			});
			
		});
		//console.log("dataTable:",dataTable);
		var chart = new google.visualization.BarChart(document.getElementById('tab1_barChart1'));
		chart.draw(dataTable, options);
	}
	
}


function drawBarChart() {
	var test;
	var dataTest = new google.visualization.DataTable();
	dataTest.addColumn('string', 'Level');
	//dataTest.addColumn({ type: "string", role: 'annotation' });

	
	var options = {
		    title: 'Istituti Scolastici',
		    //chartArea: {width: '60%'},
		    width:650, 
		    height:400,
		    hAxis: {
		      title: 'Total...',
		      minValue: 0,
		      textStyle: {
		        bold: true,
		        fontSize: 12,
		        color: '#4d4d4d'
		      },
		      titleTextStyle: {
		        bold: true,
		        fontSize: 18,
		        color: '#4d4d4d'
		      }
		    },
		    vAxis: {
		      title: 'Level',
		      textStyle: {
		        fontSize: 14,
		        bold: true,
		        color: '#848484'
		      },
		      titleTextStyle: {
		        fontSize: 14,
		        bold: true,
		        color: '#848484'
		      }
		    },
		    colors: ['#67C169','#2F9232','#073308'],
		    is3D:true
		};
	// this ajax call for tab1
	$.ajax
	({
		type: "GET",
		//dataType : 'json',
		url: 'https://dev.smartcommunitylab.it/cedus/api/stats/registration',
		//url: '../api/stats/registration',
		data: {ordine:1} ,
		success: function (data) {
			globalMasterData['tab1'].push(data);
			globalModifyData['tab1'].push(data);
			console.log("push globalMasterData:",globalMasterData);
			$.each(data,function(key, val){
				dataTest.addColumn('number', val['year']);
				dataTest.addColumn({type:'string',role: 'annotation' });
				
				$("#tab1AnniList").append("<div class='row' id='tab1Anni"+val['year']+"'> <p><b>"+val['year']+"</b></p></div>");
				$.each(val['values'],function(key2,val2){
					if(key == 0){
						//add row header in google datatest for drawing google barChart
						dataTest.addRow([val2['name'],val2['value'],val['year'].toString()]);
						//save the level(ordine) and write the level
						globalLevelList['tab1'].push(val2['name']);
						var i=key2+1;
						var id="tab1checkbox"+i;
						var tab='"'+'tab1'+'"';
						var name='"'+val2['name']+'"';
						$("#tab1level").append("<div class='checkbox'><label><input type='checkbox' name='' value='' id='"+id+"' checked='checked'  onchange='levelModification(this,"+tab+","+name+")'/><i class='helper'></i>"+val2['name']+"</label> </div>");
					}else{
						dataTest.setValue(key2, key+key+1, val2['value']);
						dataTest.setValue(key2, key+key+2, val['year'].toString());
					}
					
				});
				
			});
			console.log("globalLevelList:",globalLevelList);
			var chart = new google.visualization.BarChart(document.getElementById('tab1_barChart1'));
			chart.draw(dataTest, options);
			
		},
		failure: function() {alert("Error!");}
	});

}

function drawPieChartCall(){
	// this ajax call for tab2
	$.ajax
		({
			type: "GET",
			//dataType : 'json',
			url: 'https://dev.smartcommunitylab.it/cedus/api/stats/registration',
			data: {tipologia:2} ,
			success: function (data) {
				globalMasterData['tab2'].push(data);
				globalModifyData['tab2'].push(data);
				console.log("data for tab2 :",data);
				$.each(data,function(key, val){
					var dataSet=[['Task', ' ']];
					//dataTest.addColumn('number', val['year']);
					//dataTest.addColumn({type:'string',role: 'annotation' });
					//anniList['tab1'].push(val['year']);
					$("#tab2AnniList").append("<div class='row' id='tab2Anni"+val['year']+"'> <p><b>"+val['year']+"</b></p></div>");
					$.each(val['values'],function(key2,val2){
						dataSet.push([val2['name'],val2['value']]);
						if(key == 0){
							//dataTest.addRow([val2['name'],val2['value']]);
							//dataTest.addRow([val2['name'],val2['value'],val['year'].toString()]);
							//levelList['tab1'].push(val2['name']);
						}else{
							//dataTest.setValue(key2, key+key+1, val2['value']);
							//dataTest.setValue(key2, key+key+2, val['year'].toString());
						}
						
					});
					var i=key+1;
					var divID='tab2_pieChart'+i;
					//console.log("divID",divID);
					var chartTitle='tot.classi '+val['year'];
					drawPieChart(divID,chartTitle,dataSet);
				});
			},
			failure: function() {alert("Error!");}
		});
	// this ajax call for tab3
	$.ajax
	({
		type: "GET",
		//dataType : 'json',
		url: 'https://dev.smartcommunitylab.it/cedus/api/stats/registration',
		data: {indirizzo:1} ,
		success: function (data) {
			globalMasterData['tab3'].push(data);
			globalModifyData['tab3'].push(data);
			console.log("data for tab3 :",data);
			$.each(data,function(key, val){
				var dataSet=[['Task', ' ']];
				$("#tab3AnniList").append("<div class='row' id='tab3Anni"+val['year']+"'> <p><b>"+val['year']+"</b></p></div>");
				$.each(val['values'],function(key2,val2){
					dataSet.push([val2['name'],val2['value']]);					
				});
				var i=key+1;
				var divID='tab3_pieChart'+i;
				//console.log("divID",divID);
				var chartTitle='tot.classi: '+val['year'];
				drawPieChart(divID,chartTitle,dataSet);
			});
		},
		failure: function() {alert("Error!");}
	});

}
function drawPieChartOnRequest(modifyType,tab){
	if(modifyType=='anni'){
		$.each(globalModifyData[tab][0],function(key, val){
			var dataSet=[['Task', ' ']];
			
			$.each(val['values'],function(key2,val2){
				dataSet.push([val2['name'],val2['value']]);					
			});
			var i=key+1;
			var divID=tab+'_pieChart'+i;
			//console.log("divID",divID);
			var chartTitle='tot.classi: '+val['year'];
			drawPieChart(divID,chartTitle,dataSet);
		});
	}
}
//Draw the Pie chart and set the chart values
function drawPieChart(divID,chartTitle,dataSet) {
	var data = google.visualization.arrayToDataTable(dataSet);

	 // Optional; add a title and set the width and height of the chart
	//var options = {title:chartTitle, width:335,height:300,fontFamily: 'Arial', fontSize: 10, pieHole: 0.4};
	var options = {
			title:chartTitle, 
			width:230,height:230,
			fontFamily: 'Arial', fontSize: 13,
			pieHole: 0.3,
			legend:'none'
	};

	// Display the chart inside the <div> element with id=""
	var chart = new google.visualization.PieChart(document.getElementById(divID));
	chart.draw(data, options);
}

// all event for user modification 
// anni modify
function anniModification(tab, type){
	//if(tab=='tab1'){
	if(type=='plus'){
		//globalMasterData array length is greater means the array have some values that can be "plus" 
		if(globalMasterData[tab][0].length > globalModifyData[tab][0].length){
			var plusAnni=globalMasterData[tab][0][globalModifyData[tab][0].length]['year'];
			//add data to globalModifyData array
			globalModifyData[tab][0].push(globalMasterData[tab][0][globalModifyData[tab][0].length]);
			//call for draw chart and add div in the List
			if(tab=='tab1'){
				$("#tab1AnniList").append("<div class='row' id='tab1Anni"+plusAnni+"'> <p><b>"+plusAnni+"</b></p></div>");
				drawBarChartOnRequest('anni');
			}else if(tab=='tab2'){
				$("#tab2AnniList").append("<div class='row' id='tab2Anni"+plusAnni+"'> <p><b>"+plusAnni+"</b></p></div>");
				drawPieChartOnRequest('anni','tab2');
			}else if(tab=='tab3'){
				$("#tab3AnniList").append("<div class='row' id='tab3Anni"+plusAnni+"'> <p><b>"+plusAnni+"</b></p></div>");
				drawPieChartOnRequest('anni','tab3');
			}
		}else{
			console.log("no more year for plus!");
		}
		
	}else if(type=='minus'){
		// globalModifyData array length greater then 0 means the array have minimum values that can be "minus"
		if(globalModifyData[tab][0].length > 0){
			var minusAnni = globalModifyData[tab][0][globalModifyData[tab][0].length-1]['year'];
			
			
			//minus data from globalModifyData array
			globalModifyData[tab][0] = globalModifyData[tab][0].filter(function(el) {
			    return el.year !== minusAnni;
			});
			
			//call for draw chart and add div in the List
			if(tab=='tab1'){
				$('#tab1Anni'+minusAnni).remove();
				drawBarChartOnRequest('anni');
			}else if(tab=='tab2'){
				$("#tab2_pieChart1").empty();
				$("#tab2_pieChart2").empty();
				$("#tab2_pieChart3").empty();
				$('#tab2Anni'+minusAnni).remove();
				drawPieChartOnRequest('anni','tab2');
			}else if(tab=='tab3'){
				$("#tab3_pieChart1").empty();
				$("#tab3_pieChart2").empty();
				$("#tab3_pieChart3").empty();
				$('#tab3Anni'+minusAnni).remove();
				drawPieChartOnRequest('anni','tab3');
			}
		}else{
			console.log("no more year for minus!");
		}
		
	}
	//} 
}

//levelModification
function levelModification(obj,tab, modifyLevel){ 
	console.log('globalMasterData(levelModification)',globalMasterData);
	console.log('globalModifyData(levelModification)',globalModifyData);
	if($(obj).is(":checked")){
		//add data 
		console.log('modifyLevel',modifyLevel);
		//globalModifyData[tab][0][0]['values'].push(globalMasterData[tab][0][0]['values'][0]);
		//globalModifyData[tab][0][1]['values'].push(globalMasterData[tab][0][1]['values'][0]);
		
		$.each(globalMasterData[tab][0],function(key, val){
			$.each(val['values'],function(key2,val2){
				console.log('val2 name:',val2['name']);
				if(val2['name'] == modifyLevel){
					globalModifyData[tab][0][key]['values'].push(val2);
					console.log("push val:",val2);
				}
			});
			
		});
		console.log('after plus level globalModifyData',globalModifyData);
		drawBarChartOnRequest('anni');
	}else{
		//minus data
		//var minusLevel ='Primaria';
		//2016
		/*globalModifyData[tab][0][0]['values'] = globalModifyData[tab][0][0]['values'].filter(function(el) {
		    return el.name !== minusLevel;
		});
		//2017
		globalModifyData[tab][0][1]['values'] = globalModifyData[tab][0][1]['values'].filter(function(el) {
		    return el.name !== minusLevel;
		});*/
		
		$.each(globalModifyData[tab][0],function(key, val){
			
			globalModifyData[tab][0][key]['values'] = globalModifyData[tab][0][key]['values'].filter(function(el) {
			    return el.name !== modifyLevel;
			});
			
			
		});
		
		console.log('after minus level globalMasterData',globalMasterData);
		drawBarChartOnRequest('anni');
		
	}
	
}