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
var unaddedMinusVal={
	tab1:[],
	tab2:[],
	tab3:[]
};
var trackYearTab1=3;
var trackYearTab2=2;
var trackYearTab3=2;
var staLevelList;
$(document).ready(function() {

	google.charts.load('current', {'packages': ['corechart', 'bar']});
	google.charts.setOnLoadCallback(drawBarChart);
	/*
	var oneTimeClickTab2=0;
	var oneTimeClickTab3=0;
	$('#pill2').click(function(e) {
		if(oneTimeClickTab2==0){
			oneTimeClickTab2=oneTimeClickTab2+1;
			setTimeout(function(){
				google.charts.load("current", {packages:["corechart"]});
				google.charts.setOnLoadCallback(drawPieChartCall);
			}, 200);
		}
		
	});
	$('#pill3').click(function(e) {
		setTimeout(function(){
			google.charts.load("current", {packages:["corechart"]});
			google.charts.setOnLoadCallback(drawPieChartCall);
		}, 200);
	});
	*/
	
});

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
		//it should come from param api
		//var staLevelList=['Primaria', 'Secondaria di secondo grado', 'Secondaria di primo grado', 'Formazione professionale'];
		//here  loop is for insert level values into 'dataTest' and checkbox div in html
		$.each(staLevelList,function(key, val){
			dataTable.addRow([val]);
		});
		//console.log("globalMasterData:",globalModifyData['tab1']);
		$.each(globalModifyData['tab1'][0],function(key, val){
			if (key>trackYearTab1 || key > 3) { return false; }
			dataTable.addColumn('number', val['year']);
			dataTable.addColumn({type:'string',role: 'annotation' });
			//anniList['tab1'].push(val['year']);
			$.each(val['values'],function(key2,val2){
				/*
				if(key == 0){
					//dataTest.addRow([val2['name'],val2['value']]);
					dataTable.addRow([val2['name'],val2['value'],val['year'].toString()]);
					//levelList['tab1'].push(val2['name']);
				}else{
					dataTable.setValue(key2, key+key+1, val2['value']);
					dataTable.setValue(key2, key+key+2, val['year'].toString());
				}
				*/
				//insert values in dataTest
				if(val2['name']==staLevelList[0]){
					dataTable.setValue(0, key+key+1, val2['value']);
					dataTable.setValue(0, key+key+2, val['year'].toString());
				}else if(val2['name']==staLevelList[1]){
					dataTable.setValue(1, key+key+1, val2['value']);
					dataTable.setValue(1, key+key+2, val['year'].toString());
				}else if(val2['name']==staLevelList[2]){
					dataTable.setValue(2, key+key+1, val2['value']);
					dataTable.setValue(2, key+key+2, val['year'].toString());
				}else if(val2['name']==staLevelList[3]){
					dataTable.setValue(3, key+key+1, val2['value']);
					dataTable.setValue(3, key+key+2, val['year'].toString());
				}else {
					//dataTest.setValue(1, key+key+1, 0);
					//dataTest.setValue(1, key+key+2, 0);
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
		    colors: ['#67C169','#2F9232','#0b4f0c','#021e03'],
		    is3D:true
		};
	
	var pathData="schoolYears=2002-03";
	var currentYear=new Date().getFullYear();
	for (i = 2003; i < currentYear; i++) {
		var yy=i % 100;
		if(yy<9){
			var tempYear=yy+1;
			pathData += "&schoolYears=" + i + "-0"+tempYear;
		}else{
			var tempYear=yy+1;
			pathData += "&schoolYears=" + i + "-"+tempYear;
		}
	}
	//it should come from param api
	$.ajax
	({
		type: "GET",
		url: '../api/params/ordini',
		success: function (data) {
			staLevelList=data;
			//here  loop is for insert level values into 'dataTest' and level checkbox div in html (tab1 and tab2)
			$.each(staLevelList,function(key, val){
				dataTest.addRow([val]);
				var i=key+1;
				var id1="tab1checkbox"+i;
				var id2="tab2checkbox"+i;
				var tab1='"'+'tab1'+'"';
				var tab2='"'+'tab2'+'"';
				var name='"'+val+'"';
				$("#tab1level").append("<div class='checkbox'><label><input type='checkbox' name='' value='' id='"+id1+"' checked='checked'  onchange='levelModification(this,"+tab1+","+name+")'/><i class='helper'></i>"+val+"</label> </div>");
				$("#tab2level").append("<div class='checkbox'><label><input type='checkbox' name='' value='' id='"+id2+"' checked='checked'  onchange='levelModification(this,"+tab2+","+name+")'/><i class='helper'></i>"+val+"</label> </div>");
			});
		},
		failure: function() {alert("Error!");}
	});
	//var staLevelList=['Primaria', 'Secondaria di secondo grado', 'Secondaria di primo grado', 'Formazione professionale'];
	
	// this ajax call for tab1
	$.ajax
	({
		type: "GET",
		//dataType : 'json',
		//url: 'https://dev.smartcommunitylab.it/cedus/api/stats/registration',
		url: '../api/stats/registration',
		//url:'http://192.168.42.60:6010/cs-engine/api/stats/registration/ordine?'+pathData,
		data: {ordine:pathData} ,
		success: function (data) {
			var revData=data.reverse();
			globalMasterData['tab1'].push(revData);
			globalModifyData['tab1'].push($.extend(true, [], revData));
			globalMasterData['tab2'].push( revData);
			globalModifyData['tab2'].push($.extend(true, [], revData));
			//call for tab2 and tab3 after load data
			google.charts.load("current", {packages:["corechart"]});
			google.charts.setOnLoadCallback(drawPieChartCall);
			
			console.log("push globalMasterData:",globalMasterData);
			$.each(revData,function(key, val){
				if (key>trackYearTab1 || key > 3) { return false; }
				dataTest.addColumn('number', val['year']);
				dataTest.addColumn({type:'string',role: 'annotation' });
				
				$("#tab1AnniList").append("<div class='row' id='tab1Anni"+val['year']+"'> <p><b>"+val['year']+"</b></p></div>");
				$.each(val['values'],function(key2,val2){
					/*
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
					}//add else if() here for new level that not in globalLevelList[]
					else if(globalLevelList['tab1'].indexOf(val2['name']) == -1){
						dataTest.addRow([val2['name'],val2['value'],val['year'].toString()]);
						//globalLevelList['tab1'].push(val2['name']);
						var i=key2+1;
						var id="tab1checkbox"+i;
						var tab='"'+'tab1'+'"';
						var name='"'+val2['name']+'"';
						$("#tab1level").append("<div class='checkbox'><label><input type='checkbox' name='' value='' id='"+id+"' checked='checked'  onchange='levelModification(this,"+tab+","+name+")'/><i class='helper'></i>"+val2['name']+"</label> </div>");
					}
					else{
						dataTest.setValue(key2, key+key+1, val2['value']);
						dataTest.setValue(key2, key+key+2, val['year'].toString());
					}
					*/
					//insert values in dataTest
					if(val2['name']==staLevelList[0]){
						dataTest.setValue(0, key+key+1, val2['value']);
						dataTest.setValue(0, key+key+2, val['year'].toString());
					}else if(val2['name']==staLevelList[1]){
						dataTest.setValue(1, key+key+1, val2['value']);
						dataTest.setValue(1, key+key+2, val['year'].toString());
					}else if(val2['name']==staLevelList[2]){
						dataTest.setValue(2, key+key+1, val2['value']);
						dataTest.setValue(2, key+key+2, val['year'].toString());
					}else if(val2['name']==staLevelList[3]){
						dataTest.setValue(3, key+key+1, val2['value']);
						dataTest.setValue(3, key+key+2, val['year'].toString());
					}else {
						//dataTest.setValue(1, key+key+1, 0);
						//dataTest.setValue(1, key+key+2, 0);
					}
				});
				
			});
			var chart = new google.visualization.BarChart(document.getElementById('tab1_barChart1'));
			chart.draw(dataTest, options);
			
		},
		failure: function() {alert("Error!");}
	});
}

function drawPieChartCall(){
	// this ajax call for tab2
	/*
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
	*/
	var trackTab2=2;
	$.each(globalMasterData['tab2'][0],function(key, val){
		if (key>trackYearTab2 || key > 2) { return false; }
		var dataSet=[['Task', ' ']];
		$("#tab2AnniList").append("<div class='row' id='tab2Anni"+val['year']+"'> <p><b>"+val['year']+"</b></p></div>");
		$.each(val['values'],function(key2,val2){
			dataSet.push([val2['name'],val2['value']]);
			
		});
		var i=key+1;
		var divID='tab2_pieChart'+i;
		//console.log("divID:",divID);
		//console.log("dataSet:",dataSet);
		var chartTitle='tot.classi '+val['year'];
		drawPieChart(divID,chartTitle,dataSet);
	});
	
	//for tab3
	var pathData="schoolYears=2002-03";
	var currentYear=new Date().getFullYear();
	for (i = 2003; i < currentYear; i++) {
		var yy=i % 100;
		if(yy<9){
			var tempYear=yy+1;
			pathData += "&schoolYears=" + i + "-0"+tempYear;
		}else{
			var tempYear=yy+1;
			pathData += "&schoolYears=" + i + "-"+tempYear;
		}
	}
	//this ajax call for add level in tab3
	$.ajax
	({
		type: "GET",
		url: '../api/params/indirizzi',
		success: function (data) {			
			//here  loop is for  level checkbox div in html (tab3)
			$.each(data,function(key, val){
				
				var i=key+1;
				var id="tab3checkbox"+i;
				var tab='"'+'tab3'+'"';
				var name='"'+val+'"';
				$("#tab3level").append("<div class='checkbox'><label><input type='checkbox' name='' value='' id='"+id+"' checked='checked'  onchange='levelModification(this,"+tab+","+name+")'/><i class='helper'></i>"+val+"</label> </div>");
				
			});
		},
		failure: function() {alert("Error!");}
	});
	// this ajax call for store data in tab3 
	$.ajax
	({
		type: "GET",
		//dataType : 'json',
		//url: 'https://dev.smartcommunitylab.it/cedus/api/stats/registration',
		//url:'http://192.168.42.60:6010/cs-engine/api/stats/registration/indirizzo?'+pathData,
		url: '../api/stats/registration',
		data: {indirizzo:pathData} ,
		success: function (data) {
			var revData=data.reverse();
			globalMasterData['tab3'].push(revData);
			globalModifyData['tab3'].push(revData);
			$.each(data,function(key, val){
				if (key>trackYearTab3 || key > 2) { return false; }
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
			if(tab=="tab2"){
				if (key>trackYearTab2 || key > 2) { return false; }
			}
			if(tab=="tab3"){
				if (key>trackYearTab3 || key > 2) { return false; }
			}
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
			legend:'left'
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
			
			var pushAnniModifyData=unaddedMinusVal[tab][0]['year'];
			
			//add data to globalModifyData array
			globalModifyData[tab][0].push(unaddedMinusVal[tab][0]);
			unaddedMinusVal[tab]=unaddedMinusVal[tab].filter(function(el){
				return el.year !== pushAnniModifyData;
			})
			
			//call for draw chart and add div in the List
			if(tab=='tab1'){
				trackYearTab1=trackYearTab1+1;
				var plusAnni=globalModifyData[tab][0][trackYearTab1]['year'];
				$("#tab1AnniList").append("<div class='row' id='tab1Anni"+plusAnni+"'> <p><b>"+plusAnni+"</b></p></div>");
				drawBarChartOnRequest('anni');
			}else if(tab=='tab2'){
				trackYearTab2=trackYearTab2+1;
				var plusAnni=globalModifyData[tab][0][trackYearTab2]['year'];
				$("#tab2AnniList").append("<div class='row' id='tab2Anni"+plusAnni+"'> <p><b>"+plusAnni+"</b></p></div>");
				drawPieChartOnRequest('anni','tab2');
			}else if(tab=='tab3'){
				trackYearTab3=trackYearTab3+1;
				var plusAnni=globalModifyData[tab][0][trackYearTab3]['year'];
				$("#tab3AnniList").append("<div class='row' id='tab3Anni"+plusAnni+"'> <p><b>"+plusAnni+"</b></p></div>");
				drawPieChartOnRequest('anni','tab3');
			}
			//console.log("globalModifyData after plus:",globalModifyData);
			//console.log("unaddedMinusVal after plus:",unaddedMinusVal);
		}else{
			console.log("no more year for plus!");
		}
		
	}else if(type=='minus'){
		// globalModifyData array length greater then 0 means the array have minimum values that can be "minus"
		if(globalModifyData[tab][0].length > 0){
			//minusAnni is first one of the globalModifyData
			var minusAnni = globalModifyData[tab][0][0]['year'];
			
			//add to unaddedMinusVal array and minus data from globalModifyData array
			globalModifyData[tab][0] = globalModifyData[tab][0].filter(function(el) {
				if(el.year === minusAnni){
					unaddedMinusVal[tab].push(el);
				}
			    return el.year !== minusAnni;
			});
			
			//call for draw chart and add div in the List
			if(tab=='tab1'){
				trackYearTab1=trackYearTab1-1;
				$('#tab1Anni'+minusAnni).remove();
				drawBarChartOnRequest('anni');
			}else if(tab=='tab2'){
				trackYearTab2=trackYearTab2-1;
				$("#tab2_pieChart1").empty();
				$("#tab2_pieChart2").empty();
				$("#tab2_pieChart3").empty();
				$('#tab2Anni'+minusAnni).remove();
				drawPieChartOnRequest('anni','tab2');
			}else if(tab=='tab3'){
				trackYearTab3=trackYearTab3-1;
				$("#tab3_pieChart1").empty();
				$("#tab3_pieChart2").empty();
				$("#tab3_pieChart3").empty();
				$('#tab3Anni'+minusAnni).remove();
				drawPieChartOnRequest('anni','tab3');
			}
			console.log("globalModifyData after minus:",globalModifyData);
			console.log("globalMasterData after minus:",globalMasterData);
			//console.log("unaddedMinusVal after minus:",unaddedMinusVal);
		}else{
			console.log("no more year for minus!");
		}
		
	}
	//} 
}

//levelModification
function levelModification(obj,tab, modifyLevel){ 
	
	if($(obj).is(":checked")){
		//add data 
		$.each(globalMasterData[tab][0],function(key, val){
			$.each(val['values'],function(key2,val2){
				//console.log('val2 name:',val2['name']);
				if(val2['name'] == modifyLevel){
					globalModifyData[tab][0][key]['values'].push(val2);
					//console.log("push val:",val2);
				}
			});
			
		});
		console.log('after plus level globalModifyData',globalModifyData);
		if(tab=="tab1"){
			drawBarChartOnRequest('anni');
		}else if(tab == "tab2"){
			drawPieChartOnRequest('anni','tab2');
		}else if(tab == "tab3"){
			drawPieChartOnRequest('anni','tab3');
		}
		
	}else{
		//minus data
		var tempglobalModifyData=globalModifyData;
		$.each(tempglobalModifyData[tab][0],function(key, val){
			
			globalModifyData[tab][0][key]['values'] = val['values'].filter(function(el) {
			    return el.name !== modifyLevel;
			});
			
		});
		
		//console.log('after minus level globalMasterData',globalMasterData);
		console.log('after minus level globalModifyData',globalModifyData);
		if(tab=="tab1"){
			drawBarChartOnRequest('anni');
		}else if(tab == "tab2"){
			drawPieChartOnRequest('anni','tab2');
		}else if(tab == "tab3"){
			drawPieChartOnRequest('anni','tab3');
		}
		
	}
	
}