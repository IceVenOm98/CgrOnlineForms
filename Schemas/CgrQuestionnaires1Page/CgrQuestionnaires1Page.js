define("CgrQuestionnaires1Page", ["ServiceHelper"], function(ServiceHelper) {
	return {
		entitySchemaName: "CgrQuestionnaires",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "CgrQuestionnairesFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "CgrQuestionnaires"
				}
			},
			"CgrQuestions": {
				"schemaName": "CgrSchemaa200389cDetail",
				"entitySchemaName": "CgrQuestion",
				"filter": {
					"detailColumn": "CgrQuestionnairy",
					"masterColumn": "Id"
				}
			},
			"CgrAnswers": {
				"schemaName": "CgrSchemad8d7c037Detail",
				"entitySchemaName": "CgrAnswer",
				"filter": {
					"detailColumn": "CgrQuestionnairy",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			getActions: function(){
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuItem({
					Type: "Terrasoft.MenuSeparator",
					Caption: ""
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": {
						bindTo: "Resources.Strings.CreateGoogleForm"
					},
					"Tag": "createGoogleForm",
					"Enabled": true 
				}));
				return actionMenuItems; 
            },
            createGoogleForm: function(){
              	var prop = 
              	{
                  	"formName":this.get("CgrName"),
                    "questions":[]
                }
                var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "CgrQuestion"
				});
				esq.addColumn("CgrQuestionnairy", "Questionnairy");
				esq.addColumn("CgrTitle", "Title");
				esq.addColumn("CgrType", "Type");				
              	var esqFilter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, 
																	"CgrQuestionnairy", 
																	this.get("Id"));
				esq.filters.add("esqFilter", esqFilter);

				esq.getEntityCollection(function (result) {
				    if (result.success) {
                        result.collection.each(function (item) {
                            prop.questions.push({"Title":item.get("Title"),
                                                "Type":item.get("Type")});
                        });
                      this.sendRequestToGoogleScript(prop);
                    }
				}, this);
            },
          	sendRequestToGoogleScript: function(prop){
				var parameters = JSON.stringify(prop);
              	var serviceData = {
				    jsonParameters:parameters,
				    questionnairyId:this.get("Id"),
				};
				ServiceHelper.callService("OnlineFormsService", "GetNewGoogleFormLink",
					function(response) {
                  		//var responseJson = JSON.parse(response);
                  		//var mes = responseJson.Message;
                  		if (response){
							this.set("CgrFormLink", response);
							this.reloadEntity();
                          	this.showInformationDialog("Данные обновлены");
                        }
                  		else {
          			        this.showInformationDialog("Error");
                        }
					},serviceData, this);
            },
          	getDataFromGoogleForm: function(){
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", theUrl, false ); // false for synchronous request
                xmlHttp.send( null );
                return xmlHttp.responseText;
            }
        },
      dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "CgrName689cf4a7-b8f9-411e-83a3-b6048d056de5",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "CgrName"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "CgrFormLink68cbac78-cd2f-400c-9894-157741a228e9",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "CgrFormLink"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TabQuestions",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.TabQuestionsTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "CgrQuestions",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "TabQuestions",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TabAnswers",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.TabAnswersTabCaption"
					},
					"items": [],
					"order": 1
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "CgrAnswers",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "TabAnswers",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 2
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "CgrNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "remove",
				"name": "ESNTab"
			},
			{
				"operation": "remove",
				"name": "ESNFeedContainer"
			},
			{
				"operation": "remove",
				"name": "ESNFeed"
			}
		]/**SCHEMA_DIFF*/
	};
});
