define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/connect",
	"dojo/_base/sniff",
	"dojo/aspect", "dojo/dom-style",
	"dojo/dom-class",
	"ecm/widget/layout/_LaunchBarPane",
	"ecm/widget/layout/BrowsePane",
	"ecm/model/Request",
	"ecm/model/Repository",
	"dojo/cookie",
	"dijit/layout/ContentPane",
	"dijit/registry",
	"dojo/text!./templates/CFBLDossier.html",
	"dijit/form/TextBox",
	"dijit/form/Button",
	"dojox/grid/DataGrid",
	"dojox/grid/cells",
	"dojox/grid/cells/dijit",
	"dojo/data/ItemFileWriteStore",
	"dojo/dom-construct",
	"dojo/_base/window",
	"dijit/layout/TabContainer"
],
function(declare, lang, connect, has, aspect, domStyle, domClass,
		_LaunchBarPane, BrowsePane, Request, Repository, cookie,
		ContentPane, registry, template, TextBox, Button, DataGrid, cells, cellsDijit, ItemFileWriteStore, domConstruct, win, TabContainer) {
	/**
	 * @name cFBLPluginDojo.CFBLDossier
	 * @class 
	 * @augments ecm.widget.layout._LaunchBarPane
	 */
	return declare("cFBLPluginDojo.CFBLDossier", 
	[ContentPane], 
	{
		widgetsInTemplate: true,
		contentString: template,
		panel_object: null,
		
		postCreate: function() {

			this.setmodel();
			this.inherited(arguments);	
			
		},
		
		startup: function() {

			this.inherited(arguments);		
			
		},
		setmodel:function(){
			console.log("-----------------******-----------------");
			console.log(this);
		},

		/**
		 * Loads the content of the pane. This is a required method to insert a pane into the LaunchBarContainer.
		 */
		loadContent: function() {
			var userId = ecm.model.desktop.userId;
			console.log("ReportsPane Null");
			
			/* var elem = dojo.byId('tc1-prog');
				if(elem != null){
					console.log("ReportsPane is not Null");
					registry.byId("tc1-prog").destroyRecursive();
				} */
			if (!this.isLoaded) {
			
			var tabcontainer = new TabContainer({
				id: "tc1-prog",
				style: "height: 100%; width: 100%;",
				useMenu: false,
				useSlider: false,
			}, "tc1-prog");
			
			this.addChild(tabcontainer);
			
			tabcontainer.addChild(new ContentPane({
				id: "OngoingCasesPane",	
				title: "Ongoing Cases",
			}));
			
			//================ Completed Cases tab ================//
			
			var testPane = new ContentPane({
				region: "center",
				'id':"CompletedCasesPane",
				'class': "centerPane",
				title: "Completed Cases",
				'dojoAttachPoint': 'CompletedCasesPane',
				startup:function () {
				console.log(">>> startup CompletedCasesPane");
		       }
			});

		  	testPane.set("content", dojo.create("iframe", {
				"src": 'http://10.12.1.68//CFBUSINESSLOAN/informationCenter',
				"style": "border: 0; width: 100%; height: 700px"
            })); 
			
			tabcontainer.addChild(testPane);
			
			
			//================ Ongoing Cases tab ================//
			
			var contentPane1 = new ContentPane({
				id: "targetID2",	
				content:'<h2 style="padding-left:280px">~| CF Business Loan - Case Search |~</h2>',
				style:"padding-left: 90px; background-color:#f7f7f7"
			}, "targetID2");
			contentPane1.placeAt("OngoingCasesPane");
			
			var contentPane2 = new ContentPane({
				id: "targetID",	
				content:"<p></p>",
				style:"padding-left: 90px; padding-top:10px; background-color:#f7f7f7"
			}, "targetID");
			contentPane2.placeAt("OngoingCasesPane");
		
			var textbox = new dijit.form.TextBox({
				id: "referenceNumber",
				name: "referenceNumber",
				placeHolder: "Reference Number"
			}, "referenceNumber");
			textbox.placeAt("targetID2");
			
			var searchButton = new Button({
				class:"newButton",
				label: "Search",
				onClick: function(){
					console.log("Searching ....");
					
					var xhttp = new XMLHttpRequest();
					var url="http://10.12.56.95:9080/CFRest/getByReferenceNumber/"+dijit.byId("referenceNumber").get("value");
					xhttp.open("GET",url, false);
					xhttp.setRequestHeader("Content-type", "application/json");
					xhttp.send();
					var response = JSON.parse(xhttp.responseText);

						var grid = dijit.byId("basicDataTable");
						console.log(grid);
						var emptyCells = { items: [] };
						var emptyStore = new dojo.data.ItemFileWriteStore({data: emptyCells});
						grid.setStore(emptyStore);
						
						var grid = dijit.byId("visitDetailsTable");
						console.log(grid);
						var emptyCells = { items: [] };
						var emptyStore = new dojo.data.ItemFileWriteStore({data: emptyCells});
						grid.setStore(emptyStore);
						
						var grid = dijit.byId("facilityDetailsTable");
						console.log(grid);
						var emptyCells = { items: [] };
						var emptyStore = new dojo.data.ItemFileWriteStore({data: emptyCells});
						grid.setStore(emptyStore);
						
						var grid = dijit.byId("clientInfoTable");
						console.log(grid);
						var emptyCells = { items: [] };
						var emptyStore = new dojo.data.ItemFileWriteStore({data: emptyCells});
						grid.setStore(emptyStore);
						
			/*==========================search grid with all the fields==============================*/			
	
						/* var keysArr = [];
						var valuesArr = [];
	
						for(var k in response){
							keysArr.push(k);
							}
						valuesArr = Object.values(response);
						
						var searchTableFields = [];
						searchTableFields.push(keysArr);
						searchTableFields.push(valuesArr);
						
						var storeMultiValue = dijit.byId("table").store;
						var layoutMultivalue = dijit.byId("table").layout;
						var id=0;
						for(var x=0;x<searchTableFields[0].length;x++){
							var xItem={};
							for(var y=0;y<layoutMultivalue.cells.length;y++){
								xItem[layoutMultivalue.cells[y].field] =  searchTableFields[y][x];
							}
							console.log(xItem);
							storeMultiValue.newItem(xItem);
							id++;
						} */
			/*==========================search grid with selected results==============================*/	

						var searchBasicTableFields = [];
						searchBasicTableFields.push(["1","2","3","4","5","6","7"]);	
						searchBasicTableFields.push(["Create Time","Launched By","Step Name","WobNumber","Loan Status","Loan Type","Client Type"]);
						var valuesArr1 = [response.LoanCreationDate, response.F_Originator, response.F_StepName, response.F_WobNum, response.LoanStatus, response.LoanType, response.ClientType];
						searchBasicTableFields.push(valuesArr1);						
			
						var storeMultiValue = dijit.byId("basicDataTable").store;
						var layoutMultivalue = dijit.byId("basicDataTable").layout;
						var id=0;
						for(var x=0;x<searchBasicTableFields[0].length;x++){
							var xItem={};
							for(var y=0;y<layoutMultivalue.cells.length;y++){
								xItem[layoutMultivalue.cells[y].field] =  searchBasicTableFields[y][x];
							}
							console.log(xItem);
							storeMultiValue.newItem(xItem);
							id++;
						}
						
						var visitTableFields = [];
						visitTableFields.push(["1","2","3","4","5","6","7","8","9","10","11","12","13","14"]);
						visitTableFields.push(["MO Code","Direct Business Code","BranchCode","BranchName","Name","Designation","EPF No","ContactNo","Date and Time of visit","Name Of The Officers Carrying Out The Visit","Locations Visited","Persons Met With Their Designation","Business Processing Branch","Lead Number"]);
						var valuesArr2 = [response.MOCode, response.DirectMarketingCode, response.BranchCode, response.BranchName, response.Name, response.UserDesignation, response.EPFNo, response.ContactNo, response.Date, response.Nameofofficers, response.LocationsVisited, response.PersonsmetwiththeirDesignations, response.BusinessProcessingBranch, response.LeadNo];
						visitTableFields.push(valuesArr2);			
			
						var storeMultiValue = dijit.byId("visitDetailsTable").store;
						var layoutMultivalue = dijit.byId("visitDetailsTable").layout;
						var id=0;
						for(var x=0;x<visitTableFields[0].length;x++){
							var xItem={};
							for(var y=0;y<layoutMultivalue.cells.length;y++){
								xItem[layoutMultivalue.cells[y].field] =  visitTableFields[y][x];
							}
							console.log(xItem);
							storeMultiValue.newItem(xItem);
							id++;
						}
						
						var facilityTableFields = [];
						facilityTableFields.push(["1","2","3","4"]);
						facilityTableFields.push(["Loan amount (Rs.)","Period of loan (Months)","Purpose Of The Loan","Detail Loan Purpose"]);
						var valuesArr3 = [response.LoanAmount, response.PeriodOfLoan, response.PurposeOftheLoan, response.DetailLoanPurpose];
						facilityTableFields.push(valuesArr3);			
			
						var storeMultiValue = dijit.byId("facilityDetailsTable").store;
						var layoutMultivalue = dijit.byId("facilityDetailsTable").layout;
						var id=0;
						for(var x=0;x<facilityTableFields[0].length;x++){
							var xItem={};
							for(var y=0;y<layoutMultivalue.cells.length;y++){
								xItem[layoutMultivalue.cells[y].field] =  facilityTableFields[y][x];
							}
							console.log(xItem);
							storeMultiValue.newItem(xItem);
							id++;
						}
						
						var clientInfoTableFields = [];
						clientInfoTableFields.push(["1","2","3","4","5","6","7","8","9","10","11"]);
						clientInfoTableFields.push(["Business Ownership Structure","BR No","Business Name","Business Sector","Business Subsector","Date of Registration","Registered Address","City","PostalCode","Contact Person","Mobile No"]);
						var BusinessApplicant_Address = response.BusinessApplicant_Address1+", "+response.BusinessApplicant_Address2+", "+response.BusinessApplicant_Address3;
						var valuesArr4 = [response.Ownership, response.BRNo, response.BusinessName, response.BusinessSector, response.BusinessSubsector, response.DateofRegistration, BusinessApplicant_Address, response.BusinessApplicant_City, response.BusinessApplicant_PostalCode, response.BusinessApplicant_ContactPerson, response.BusinessApplicant_Mobile];
						clientInfoTableFields.push(valuesArr4);			
			
						var storeMultiValue = dijit.byId("clientInfoTable").store;
						var layoutMultivalue = dijit.byId("clientInfoTable").layout;
						var id=0;
						for(var x=0;x<clientInfoTableFields[0].length;x++){
							var xItem={};
							for(var y=0;y<layoutMultivalue.cells.length;y++){
								xItem[layoutMultivalue.cells[y].field] =  clientInfoTableFields[y][x];
							}
							console.log(xItem);
							storeMultiValue.newItem(xItem);
							id++;
						}

				}
			},"search");
			searchButton.placeAt("targetID2");
			
			var dataTemp = {
				identifier: "id",
				items: []
			};
			
			var data_list = [
			{ property: "", value: "" },
			{ property: "", value: "" },
			{ property: "", value: "" },
			{ property: "", value: "" },
			{ property: "", value: "" }
			];
			var rows = 5;
			for(var i = 0, l = data_list.length; i < rows; i++){
				dataTemp.items.push(lang.mixin({ id: i+1 }, data_list[i%l]));
			}
			
			/*==========================search grid==============================*/
			
			var store = new ItemFileWriteStore({data: dataTemp});
			var basicDataLayout = [{
				defaultCell: { width: 8, editable: false, type: cells._Widget, styles: 'text-align: left;'  },
				cells: [
				{ name: 'No', field: 'id', width: 5 },
				{ name: 'Basic Details', field: 'property', width: 30 },
				{ name: 'Value', field: 'value', width: 30 }
				]
			}];
			var visitDetailsLayout = [{
				defaultCell: { width: 8, editable: false, type: cells._Widget, styles: 'text-align: left;'  },
				cells: [
				{ name: 'No', field: 'id', width: 5 },
				{ name: 'Visit Details', field: 'property', width: 30 },
				{ name: 'Value', field: 'value', width: 30 }
				]
			}];
			var facilityDetailsLayout = [{
				defaultCell: { width: 8, editable: false, type: cells._Widget, styles: 'text-align: left;'  },
				cells: [
				{ name: 'No', field: 'id', width: 5 },
				{ name: 'Facility Details', field: 'property', width: 30 },
				{ name: 'Value', field: 'value', width: 30 }
				]
			}];
			var clientInfoLayout = [{
				defaultCell: { width: 8, editable: false, type: cells._Widget, styles: 'text-align: left;'  },
				cells: [
				{ name: 'No', field: 'id', width: 5 },
				{ name: 'Client Information', field: 'property', width: 30 },
				{ name: 'Value', field: 'value', width: 30 }
				]
			}];
			
			var basicDataTable = new DataGrid({
				id: 'basicDataTable',
				store: store,
				structure: basicDataLayout,
				autoHeight:true,
				autoWidth: true});
			basicDataTable.placeAt("targetID");
				
			var visitDetailsTable = new DataGrid({
				id: 'visitDetailsTable',
				store: store,
				structure: visitDetailsLayout,
				autoHeight:true,
				autoWidth: true});
			visitDetailsTable.placeAt("targetID");
				
			var facilityDetailsTable = new DataGrid({
				id: 'facilityDetailsTable',
				store: store,
				structure: facilityDetailsLayout,
				autoHeight:true,
				autoWidth: true});
			facilityDetailsTable.placeAt("targetID");
				
			var clientInfoTable = new DataGrid({
				id: 'clientInfoTable',
				store: store,
				structure: clientInfoLayout,
				autoHeight:true,
				autoWidth: true});
			clientInfoTable.placeAt("targetID");
			
			
			this.isLoaded = true;
			this.needReset = false;
		}
		}
	});
});
