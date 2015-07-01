/**
 * Creates a Controller for the
 * view.
 */
sap.ui.controller("scripts.index",
        {
			/**
			 * Function to create a user. On click of Create button on the view
			 * this function gets called. It creates an opens a dialogue window
			 * with all the fields required to create the user
			 * 
			 * All fields marked with * are mandatory
			 */
            userCreate: function() 
            {
                var oDialog = new sap.ui.commons.Dialog("Dialog", 
                		{
                    		modal: true,
                    		closed: function(oControlEvent) {
                    			sap.ui.getCore().getElementById('Dialog').destroy();
                    			}
                		});
                	oDialog.setTitle("Create User");

                var oLayout = new sap.ui.commons.layout.MatrixLayout(
                		{
		                    columns: 3,
		                    width: "100%"
                		});

                var fName = sap.ui.controller("scripts.index").rowFirstName();
                oLayout.createRow(fName[0], fName[1]);
                var lName = sap.ui.controller("scripts.index").rowLastName();
                oLayout.createRow(lName[0], lName[1]);
                var gender = sap.ui.controller("scripts.index").rowGender();
                oLayout.createRow(gender[0], gender[1]);
                var email = sap.ui.controller("scripts.index").rowEmail();
                oLayout.createRow(email[0], email[1]);
                var accountNumber = sap.ui.controller("scripts.index").rowAccountNumber();
                oLayout.createRow(accountNumber[0], accountNumber[1]);
                var company = sap.ui.controller("scripts.index").rowCompany();
                oLayout.createRow(company[0], company[1]);
                var role = sap.ui.controller("scripts.index").rowRole();
                oLayout.createRow(role[0], role[1]);
                var relationship = sap.ui.controller("scripts.index").rowRelationship();
                oLayout.createRow(relationship[0], relationship[1]);
                var userName = sap.ui.controller("scripts.index").rowUserName();
                userName[1].setValue(sap.ui.controller("scripts.index").nextUser());
                oLayout.createRow(userName[0], userName[1]);
                var password = sap.ui.controller("scripts.index").rowPassword();
                oLayout.createRow(password[0], password[1]);
                oLayout.createRow(null, password[2]);
                oLayout.createRow(null, password[3]);
                var language = sap.ui.controller("scripts.index").rowLanguage();
                oLayout.createRow(language[0], language[1]);
                var alreadyInvited = sap.ui.controller("scripts.index").rowAlreadyInvited();
                oLayout.createRow(alreadyInvited[0], alreadyInvited[1]);
                var validTill = sap.ui.controller("scripts.index").rowValidTill();
                oLayout.createRow(validTill[0], validTill[1]);
                oDialog.addContent(oLayout);
                oDialog.addButton(new sap.ui.commons.Button(
                		{
                			text: "Create",
                			press: function() 
                			{
                				if (sap.ui.getCore().getControl("autogen").getSelected() == true) 
                				{
                					sap.ui.controller("scripts.index").passwordGenerate();
                				}

                				if (sap.ui.controller("scripts.index").validateData() == true)
                				{
                                var oEntry = sap.ui.controller("scripts.index").createJson();
                                var oModel = new sap.ui.model.odata.ODataModel("../../services/users.xsodata",true);
                                sap.ui.getCore().setModel( oModel);
                                oModel.setHeaders(
                                		{
                                        "Content-Type": "application/json",
                                        "dataType": "JSON"
                                		});
                                oModel.create("/UsersEntity",oEntry,null,function(oData, oResponse) 
                                		{
                                            jQuery.sap.require("sap.ui.commons.MessageBox");
                                            var suc = "SUCCESS";
                                            sap.ui.commons.MessageBox.show("User was created",sap.ui.commons.MessageBox.Icon.SUCCESS, suc, [sap.ui.commons.MessageBox.Action.OK],oDialog.close(),sap.ui.commons.MessageBox.Action.OK);
                                        },
                                        function(oError) 
                                        {
                                            jQuery.sap.require("sap.ui.commons.MessageBox");
                                            var er = "ERROR";
                                            sap.ui.commons.MessageBox.show("Unable to create user. Please check the data entered",sap.ui.commons.MessageBox.Icon.ERROR,er, [sap.ui.commons.MessageBox.Action.OK],oDialog.open(),sap.ui.commons.MessageBox.Action.OK);
                                        });
                                sap.ui.getCore().byId("users").getModel().refresh(true);
                            }
                        }
                    }));
                oDialog.open();
            },
            /**
             * Function to create First Name row in the Dialogue box
             */
            rowFirstName: function() 
            {
            	var oTF = new sap.ui.commons.TextField("tfirstName", 
            		{
	                    tooltip: 'First Name',
	                    editable: true,
	                    required: true,
	                    width: '200px'
                });
                var oLabel = new sap.ui.commons.Label("lfirstName", 
                	{
	                    text: 'First Name',
	                    labelFor: oTF
                });
                return [oLabel, oTF];
            },
            /**
             * Function to create Last Name row in the Dialogue box
             */
            rowLastName: function() 
            {
                var oTF = new sap.ui.commons.TextField("tlastName", {
                    tooltip: 'Last Name',
                    editable: true,
                    required: true,
                    width: '200px',
                });
                var oLabel = new sap.ui.commons.Label("llastName", {
                    text: 'Last Name',
                    labelFor: oTF
                });
                return [oLabel, oTF];
            },
            /**
             * Function to create Gender row in the Dialogue box
             */
            rowGender: function() 
            {
                var oComboBox = new sap.ui.commons.ComboBox("tgender", {required: true});
                oComboBox.setTooltip("Gender");
                oComboBox.setValue("Male");
                oComboBox.setEditable(true);
                oComboBox.setWidth("75px");
                var oItem = new sap.ui.core.ListItem("Gender1");
                oItem.setText("Male");
                oComboBox.addItem(oItem);
                oItem = new sap.ui.core.ListItem("Gender2");
                oItem.setText("Female");
                oComboBox.addItem(oItem);
                var oLabel = new sap.ui.commons.Label("lgender", {
                    text: 'Gender',
                    labelFor: oComboBox
                });
                return [oLabel, oComboBox];
            },
            /**
             * Function to create Email row in the Dialogue box
             */
            rowEmail: function() 
            {
            	var oTF = new sap.ui.commons.TextField("temail", {
                    tooltip: 'Email',
                    required: true,
                    editable: true,
                    width: '200px',
                });
                var oLabel = new sap.ui.commons.Label("lemail", {
                    text: 'Email',
                    labelFor: oTF
                });
                return [oLabel, oTF];
             },
             /**
              * Function to create Account Number row in the Dialogue box
              */
             rowAccountNumber: function() 
             {
                var oTF = new sap.ui.commons.TextField("taccountNumber", {
                        tooltip: 'Account Number',
                        editable: true,
                        width: '200px',
                    });
                var oLabel = new sap.ui.commons.Label("laccountNumber", {
                    text: 'Account Number',
                    labelFor: oTF
                });
                return [oLabel, oTF];
             },
             /**
              * Function to create Company row in the Dialogue box
              */
             rowCompany: function() 
             {
                var oTF = new sap.ui.commons.TextField("tcompany", {
                    tooltip: 'Company',
                    required: true,
                    editable: true,
                    width: '200px',
                });
                var oLabel = new sap.ui.commons.Label("lcompany", {
                    text: 'Company',
                    labelFor: oTF
                });
                return [oLabel, oTF];
             },
             /**
              * Function to create Role row in the Dialogue box
              */
             rowRole: function() 
             {
                var oTF = new sap.ui.commons.TextField("trole", {
                    tooltip: 'Role',
                    editable: true,
                    width: '200px',
                });
                var oLabel = new sap.ui.commons.Label("lrole", {
                    text: 'Role',
                    labelFor: oTF
                });
                return [oLabel, oTF];
             },
             /**
              * Function to create Relationship row in the Dialogue box
              */
             rowRelationship: function() 
             {
            	 var oComboBox = new sap.ui.commons.ComboBox("trelationship", {
                        required: true,
                        change:function(oEvent){
                        	if(sap.ui.getCore().getControl("trelationship").getValue()!= "Customer"){
                        	sap.ui.getCore().byId("tvalidTill").setRequired(false);
                        	} else{
                        	sap.ui.getCore().byId("tvalidTill").setRequired(true);
                        	}
                        },
                   });
                oComboBox.setTooltip("Relationship");
                oComboBox.setValue("Customer");
                oComboBox.setEditable(true);
                oComboBox.setWidth("110px");
                var oItem = new sap.ui.core.ListItem("r1");
                oItem.setText("Customer");
                oComboBox.addItem(oItem);
                oItem = new sap.ui.core.ListItem("r2");
                oItem.setText("Partner");
                oComboBox.addItem(oItem);
                oItem = new sap.ui.core.ListItem("r3");
                oItem.setText("Team");
                oComboBox.addItem(oItem);
                oItem = new sap.ui.core.ListItem("r4");
                oItem.setText("Colleague");
                oComboBox.addItem(oItem);
                var oLabel = new sap.ui.commons.Label("lrelationship", {
                    text: 'Relationship',
                    labelFor: oComboBox
                });
                return [oLabel, oComboBox];
             },
             /**
              * Function to create User Name row in the Dialogue box
              */
             rowUserName: function() 
             {
                var oTF = new sap.ui.commons.TextField("tuserName", {
                    tooltip: 'User Name',
                    editable: true,
                    required: true,
                    width: '200px'
                });
                var oLabel = new sap.ui.commons.Label("luserName", {
                    text: 'User Name',
                    labelFor: oTF
                });
                return [oLabel, oTF];
            },
            /**
             * Function to create Account Number row in the Dialogue box
             */
            rowPassword: function() 
            {
                var oRB1 = new sap.ui.commons.RadioButton("autogen", {
                    text: 'Auto Generated',
                    tooltip: 'Password autogenerated',
                    groupName: 'Group1',
                    selected: true,
                    select: function() {
                        sap.ui.getCore().getControl("tpassword").setEditable(false);
                    }
                });
                var oRB2 = new sap.ui.commons.RadioButton("manual", {
                    text: 'Manual',
                    tooltip: 'Enter password Manually',
                    groupName: 'Group1',
                    select: function() {
                        sap.ui.getCore().getControl("tpassword").setEditable(true);
                    }
                });
                oTF = new sap.ui.commons.TextField("tpassword", {
                    tooltip: 'Password',
                    editable: false,
                    required: true,
                    width: '200px',
                });
                oLabel = new sap.ui.commons.Label("lpassword", {
                    text: 'Password',
                    labelFor: oTF
                });
                return [oLabel, oRB1, oRB2, oTF];
            },
            /**
             * Function to create Language row in the Dialogue box
             */
            rowLanguage: function() 
            {
                var oComboBox = new sap.ui.commons.ComboBox("invitationLanguage", {required: true});
                oComboBox.setTooltip("Invitation Language");
                oComboBox.setValue("DE");
                oComboBox.setEditable(true);
                oComboBox.setWidth("50px");
                var oItem = new sap.ui.core.ListItem("invitationLanguage1");
                oItem.setText("DE");
                oComboBox.addItem(oItem);
                oItem = new sap.ui.core.ListItem("invitationLanguage2");
                oItem.setText("EN");
                oComboBox.addItem(oItem);
                var oLabel = new sap.ui.commons.Label("linvitationLanguage", {
                        text: 'Invitation Language',
                        labelFor: oComboBox
                    });
                return [oLabel, oComboBox];
            },
            /**
             * Function to create Already Invited row in the Dialogue box
             */
            rowAlreadyInvited: function() 
            {
                var oComboBox = new sap.ui.commons.ComboBox("tisInvited", {required: true});
                oComboBox.setTooltip("Already Invited");
                oComboBox.setValue("NO");
                oComboBox.setEditable(true);
                oComboBox.setWidth("50px");
                var oItem = new sap.ui.core.ListItem("isInvited1");
                oItem.setText("YES");
                oComboBox.addItem(oItem);
                oItem = new sap.ui.core.ListItem("isInvited2");
                oItem.setText("NO");
                oComboBox.addItem(oItem);
                var oLabel = new sap.ui.commons.Label("lisInvited", {
                    text: 'Already Invited',
                    labelFor: oComboBox
                });
                return [oLabel, oComboBox];
            },
            /**
             * Function to create Already Invited row in the Dialogue box
             */
            rowValidTill: function() 
            {
            	var oDatePicker = new sap.ui.commons.DatePicker('tvalidTill',{required: true});
            	oDatePicker.setYyyymmdd(sap.ui.controller("scripts.index").threeMonthsValidity());
            	oDatePicker.setLocale("en-US");
            	oDatePicker.attachChange(
            			function(oEvent){
            				if(oEvent.getParameter("invalidValue")){
            					oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
            				}else{
            					oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
            				}
            			}
            	);
            	if(sap.ui.getCore().getControl("trelationship").getLiveValue()!= "Customer"){
                 	sap.ui.getCore().byId("tvalidTill").setRequired(false);
                 	}
                var oLabel = new sap.ui.commons.Label("lvalidTill", {
                    text: 'Valid Till',
                    labelFor: oDatePicker
                });
                return [oLabel, oDatePicker];
            },
            /**
             * Function to get validity date. i.e 3 Months from the present date
             */
            threeMonthsValidity: function(){
            	var date = new Date();
            	date.setMonth(date.getMonth()+3)
            	var dd = date.getDate();
            	var mm = date.getMonth()+1;
            	var yyyy = date.getFullYear();
            	if(dd<10) {
            	    dd='0'+dd
            	} 
            	if(mm<10) {
            	    mm='0'+mm
            	}
            	var newDate = yyyy+mm+dd;
            	return newDate;
            },
            /**
             * Function to generate password automatically.
             * The return value results in a combination of [A-Z],[a-z] and [0-9]
             */
            passwordGenerate: function() 
            {
            	var randomstring = "";
                var password = [];
                var charCode = String.fromCharCode;
                var R = Math.random;
                var random, i;
                password.push(charCode(48 + (0 | R() * 10)));
                password.push(charCode(65 + (0 | R() * 26)));
                for (i = 2; i < 10; i++) 
                {
                    random = 0 | R() * 62;
                    password.push(charCode(48 + random + (random > 9 ? 7 : 0) + (random > 35 ? 6 : 0)));
                }
                randomstring = password.sort(function() {return R() - .5;}).join('');
                sap.ui.getCore().getControl("tpassword").setValue(randomstring);
                sap.ui.getCore().getControl("tpassword").setEditable(false);
            },
            /**
             * Function to generate the next userid automatically
             */
            nextUser: function() 
            {
            	var oModel = new sap.ui.model.odata.ODataModel("../../services/users.xsodata", true);
                sap.ui.getCore().setModel(oModel);
                oModel.setHeaders({"Content-Type": "application/json","dataType": "JSON"});
                var userNameArr=[];
                oModel.read("/UsersEntity?$orderby=userName asc", null, null, true, function(oData, oResponse)
                		{
		                    var json = JSON.stringify(oData);
		            		var uName = JSON.parse(json);
		            		for (var i = 0; i<uName.results.length;i++){
		            			userNameArr.push(parseInt((uName.results[i].userName).substr(1,(uName.results[i].userName).length)));
		            			}
		            		userNameArr.sort(function(a, b){return a-b});
		            		for(var i=0;i<userNameArr.length;i++){
		            			if(userNameArr[i+1]!==userNameArr[i]+1){
		            				var uId = parseInt(userNameArr[i])+1;
		            				var uName = "u" + uId ;
		                            sap.ui.getCore().getControl("tuserName").setValue(uName);
		                            break;
		            			}
		            		}
	         		}, function fError(oEvent) {console.log("No User");});	
                
            },
            /**
             * Function to update user which gets called on click of the update button on the UI
             * An update dialogue window is opend with the details of the user selected and the values
             * can be edited except the UserName
             */
            userUpdate: function() 
            {
            	var ServiceURL = "../../services/users.xsodata";
            	var oModel = new sap.ui.model.odata.ODataModel(ServiceURL, true);
                sap.ui.getCore().setModel(oModel);
                var oTable = sap.ui.getCore().getElementById('users');
                var i = oTable.getSelectedIndex();
                if (i == -1) 
                {
                    jQuery.sap.require("sap.ui.commons.MessageBox");
                    var info = "INFORMATION";
                    sap.ui.commons.MessageBox.show("Please select a row to Update",sap.ui.commons.MessageBox.Icon.INFORMATION,info, [sap.ui.commons.MessageBox.Action.OK],sap.ui.commons.MessageBox.Action.OK);
                    return;
                } 
                else if (i >= 0) 
                {
                    var selectedContext = oTable.getContextByIndex(i);
                    var selectedUser = selectedContext.getObject().userName;
                    OData.read(ServiceURL + "/UsersEntity('" + selectedUser + "')",function(response) 
                    		{
                                var oDialog = new sap.ui.commons.Dialog("Dialog", {modal: true,closed: function(oControlEvent) 
                                	{
                                            sap.ui.getCore().getElementById('Dialog').destroy();
                                    }});
                                oDialog.setTitle("User Update Form");
                                var oLayout = new sap.ui.commons.layout.MatrixLayout({columns: 2, width: "100%"});
                                var fName = sap.ui.controller("scripts.index").rowFirstName();
                                fName[1].setValue(response.firstName);
                                oLayout.createRow(fName[0],fName[1]);
                                var lName = sap.ui.controller("scripts.index").rowLastName();
                                lName[1].setValue(response.lastName);
                                oLayout.createRow(lName[0], lName[1]);
                                var gender = sap.ui.controller("scripts.index").rowGender();
                                gender[1].setValue(response.gender);
                                oLayout.createRow(gender[0],gender[1]);
                                var email = sap.ui.controller("scripts.index").rowEmail();
                                email[1].setValue(response.email);
                                oLayout.createRow(email[0],email[1]);
                                var accountNumber = sap.ui.controller("scripts.index").rowAccountNumber();
                                accountNumber[1].setValue(response.accountNumber);
                                oLayout.createRow(accountNumber[0],accountNumber[1]);
                                var company = sap.ui.controller("scripts.index").rowCompany();
                                company[1].setValue(response.company);
                                oLayout.createRow(company[0],company[1]);
                                var role = sap.ui.controller("scripts.index").rowRole();
                                role[1].setValue(response.role);
                                oLayout.createRow(role[0],role[1]);
                                var relationship = sap.ui.controller("scripts.index").rowRelationship();
                                relationship[1].setValue(response.relationship);
                                oLayout.createRow(relationship[0],relationship[1]);
                                var userName = sap.ui.controller("scripts.index").rowUserName();
                                userName[1].setValue(response.userName);
                                userName[1].setEditable(false);
                                oLayout.createRow(userName[0],userName[1]);
                                var password = sap.ui.controller("scripts.index").rowPassword();
                                password[3].setValue(response.password);
                                password[3].setEditable(true);
                                password[2].setSelected(true);
                                password[1].setSelected(false);
                                oLayout.createRow(password[0],password[1]);
                                oLayout.createRow(null, password[2]);
                                oLayout.createRow(null,password[3]);
                                var language = sap.ui.controller("scripts.index").rowLanguage();
                                language[1].setValue(response.invitationLanguage);
                                oLayout.createRow(language[0],language[1]);
                                var alreadyInvited = sap.ui.controller("scripts.index").rowAlreadyInvited();
                                alreadyInvited[1].setValue(response.isInvited);
                                oLayout.createRow(alreadyInvited[0],alreadyInvited[1]);
                                var validTill = sap.ui.controller("scripts.index").rowValidTill();
                                if(response.validTill != null)
                                {
                                	var dateFormat = sap.ui.controller("scripts.index").validTillDateFormat(response.validTill);
                                	validTill[1].setValue(dateFormat);
                                }
                                else
                                {
                                	validTill[1].setValue(response.validTill);	
                                }
                                oLayout.createRow(validTill[0], validTill[1]);
                                oDialog.addContent(oLayout);
                                oDialog.addButton(new sap.ui.commons.Button({
                                        text: "Update",
                                        press: function() 
                                        {
                                            if (sap.ui.getCore().getControl("autogen").getSelected() == true) 
                                            {
                                                sap.ui.controller("scripts.index").passwordGenerate();
                                            }
                                            if (sap.ui.controller("scripts.index").validateData() == true) 
                                            {
                                                var oEntry = sap.ui.controller("scripts.index").createJson();
                                                var selectedUser = sap.ui.getCore().getControl("tuserName").getValue();
                                                var oParams = {};
                                                oParams.fnSuccess = function() 
                                                {
                                                    jQuery.sap.require("sap.ui.commons.MessageBox");
                                                    var suc = "SUCCESS";
                                                    sap.ui.commons.MessageBox.show("User updated",sap.ui.commons.MessageBox.Icon.SUCCESS,suc, [sap.ui.commons.MessageBox.Action.OK],oDialog .close(), sap.ui.commons.MessageBox.Action.OK);
                                                };
                                                oParams.fnError = function() 
                                                {
                                                    jQuery.sap.require("sap.ui.commons.MessageBox");
                                                    var er = "ERROR";
                                                    sap.ui.commons.MessageBox.show( "Unable to create user. Please check the data entered",sap.ui.commons.MessageBox.Icon.ERROR,er, [sap.ui.commons.MessageBox.Action.OK],oDialog.open(),sap.ui.commons.MessageBox.Action.OK);
                                                };
                                                oParams.bMerge = true;
                                                oModel.setHeaders({"content-type": "application/json;charset=utf-8"});
                                                oModel.update("/UsersEntity('" + selectedUser + "')", oEntry,oParams);
                                                sap.ui.getCore().byId("users").getModel().refresh(true);
                                                oDialog.close();
                                            }
                                        }
                                    }));
                                oDialog.open();
                            });
                	}
            },
             /**
             * Gets the Valid date in the format required by the GateWay service "\/Date("+time+")\/"
             */            
            validTillDateFormat: function(date){
            	var unixTime = date;
            	var timeMilliSeconds = parseInt(unixTime.match(/[0-9]+/)[0], 10);
            	var time = new Date(timeMilliSeconds);
            	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            	var year = time.getFullYear();
            	var month = months[time.getMonth()];
            	var date = time.getDate();
            	var outputDate = month +' ' + date + ', ' + year; 
                return outputDate;
            },
            /**
             * Gets the Valid date in the format required by the GateWay service "\/Date("+time+")\/"
             */            
            validTillDate: function(){
            	var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern :"dd-MM-yyyy" });   
            	var inputDate = sap.ui.getCore().getControl("tvalidTill").getValue();
            	var TZOffsetMs = (new Date().getTimezoneOffset()*60*1000)*(-1);
            	var time1 = new Date(dateFormat.parse(inputDate)).getTime();
            	var time = time1 + TZOffsetMs;
            	var unixTime = "\/Date("+time+")\/";
                return unixTime;
            },
            
            
            
            /**
             * Create JSON function is called by createUser and updateUser to generate the JSON 
             * data that is sent to the Odata service.
             */
            createJson: function()
            
            {	
            	var oEntry = 
                {
                    firstName: sap.ui.getCore().getControl("tfirstName").getValue(),
                    lastName: sap.ui.getCore().getControl("tlastName").getValue(),
                    email: sap.ui.getCore().getControl("temail").getValue(),
                    gender: sap.ui.getCore().getControl("tgender").getValue(),
                    accountNumber: sap.ui.getCore().getControl("taccountNumber").getValue(),
                    company: sap.ui.getCore().getControl("tcompany").getValue(),
                    role: sap.ui.getCore().getControl("trole").getValue(),
                    relationship: sap.ui.getCore().getControl("trelationship").getValue(),
                    userName: sap.ui.getCore().getControl("tuserName").getValue(),
                    password: sap.ui.getCore().getControl("tpassword").getValue(),
                    invitationLanguage: sap.ui.getCore().getControl("invitationLanguage").getValue(),
                    isInvited: sap.ui.getCore().getControl("tisInvited").getValue(),
                    validTill: sap.ui.controller("scripts.index").validTillDate()
                };
                return oEntry;
            },
            /**
             * Function to validate the data provided by the user
             */
            validateData: function() 
            {
                if (sap.ui.getCore().getControl("tfirstName")
                    .getValue() == "" || sap.ui.getCore().getControl("tlastName")
                    .getValue() == "" || sap.ui.getCore().getControl("temail")
                    .getValue() == "" || sap.ui.getCore().getControl("tgender")
                    .getValue() == "" || sap.ui.getCore().getControl("tcompany")
                    .getValue() == "" || sap.ui.getCore().getControl("trelationship")
                    .getValue() == "" || sap.ui.getCore().getControl("tuserName")
                    .getValue() == "" || sap.ui.getCore().getControl("tpassword")
                    .getValue() == "" || sap.ui.getCore().getControl("invitationLanguage")
                    .getValue() == "" || sap.ui.getCore().getControl("tisInvited").getValue() == "")
                {
                    jQuery.sap.require("sap.ui.commons.MessageBox");
                    var war = "WARNING";
                    sap.ui.commons.MessageBox.show("Not all mandatory fields are filled. Please check the entered data.",sap.ui.commons.MessageBox.Icon.WARNING,war, [sap.ui.commons.MessageBox.Action.OK],sap.ui.commons.MessageBox.Action.OK);
                    return false;
                } 
                else if (sap.ui.getCore().getControl("trelationship").getValue() == "Customer" && sap.ui.getCore().getControl("tvalidTill").getValue() == "" ){
                	jQuery.sap.require("sap.ui.commons.MessageBox");
                    var war = "WARNING";
                    sap.ui.commons.MessageBox.show("Not all mandatory fields are filled. Please check the entered data.",sap.ui.commons.MessageBox.Icon.WARNING,war, [sap.ui.commons.MessageBox.Action.OK],sap.ui.commons.MessageBox.Action.OK);
                    return false;
                }
                else if (!(sap.ui.getCore().getControl("trelationship").getValue().match(/^(Customer|Partner|Team|Colleague)$/))) 
                {
                    jQuery.sap.require("sap.ui.commons.MessageBox");
                    var war = "WARNING";
                    sap.ui.commons.MessageBox.show("Please select a valid relationship",sap.ui.commons.MessageBox.Icon.WARNING,war, [sap.ui.commons.MessageBox.Action.OK],sap.ui.commons.MessageBox.Action.OK);
                    return false;
                } 
                else if (!(sap.ui.getCore().getControl("tgender").getValue().match(/^(Male|Female)$/))) 
                {                    
                	jQuery.sap.require("sap.ui.commons.MessageBox");
                    var war = "WARNING";
                    sap.ui.commons.MessageBox.show("Please select a valid gender",sap.ui.commons.MessageBox.Icon.WARNING, war, [sap.ui.commons.MessageBox.Action.OK],sap.ui.commons.MessageBox.Action.OK);
                    return false;
                } 
                else if (!(sap.ui.getCore().getControl("invitationLanguage").getValue().match(/^(DE|EN)$/))) 
                {
                    jQuery.sap.require("sap.ui.commons.MessageBox");
                    var war = "WARNING";
                    sap.ui.commons.MessageBox .show("Please select a valid value for Invitation Language", sap.ui.commons.MessageBox.Icon.WARNING,war, [sap.ui.commons.MessageBox.Action.OK],sap.ui.commons.MessageBox.Action.OK);
                    return false;
                } 
                else if (!(sap.ui.getCore().getControl("tisInvited").getValue().match(/^(YES|NO)$/))) {
                    jQuery.sap.require("sap.ui.commons.MessageBox");
                    var war = "WARNING";
                    sap.ui.commons.MessageBox.show("Please select a valid value for Already Selected",sap.ui.commons.MessageBox.Icon.WARNING,war, [sap.ui.commons.MessageBox.Action.OK],sap.ui.commons.MessageBox.Action.OK);
                    return false;
                } 
                else if (!(sap.ui.getCore().getControl("tuserName").getValue().match(/^u\d{3,}$/))) 
                {
                    jQuery.sap.require("sap.ui.commons.MessageBox");
                    var war = "WARNING";
                    sap.ui.commons.MessageBox.show("Please select a valid value for User Name. Only uXYZ are allowed!",sap.ui.commons.MessageBox.Icon.WARNING,war, [sap.ui.commons.MessageBox.Action.OK],sap.ui.commons.MessageBox.Action.OK);
                    return false;
                }
                return true;
            },
            /**
             * Function to delete users on click of delete button
             */
            userDelete: function() 
            {
                var oModel = new sap.ui.model.odata.ODataModel("../../services/users.xsodata", true);
                sap.ui.getCore().setModel(oModel);
                var oTable = sap.ui.getCore().getElementById('users');
                var i = oTable.getSelectedIndex();
                var ServiceURL = "../../services/users.xsodata";
                if (i == -1) 
                {
                    jQuery.sap.require("sap.ui.commons.MessageBox");
                    var info = "INFORMATION";
                    sap.ui.commons.MessageBox.show("Please select row/rows to Delete",sap.ui.commons.MessageBox.Icon.INFORMATION,info, [sap.ui.commons.MessageBox.Action.OK],sap.ui.commons.MessageBox.Action.OK);
                    return;
                } 
                else if (i >= 0) 
                {
                	jQuery.sap.require("sap.ui.commons.MessageBox");
                	sap.ui.commons.MessageBox.show("Do you really want to delete the selected user(s)?",sap.ui.commons.MessageBox.Icon.WARNING,"Confirm Delete", [sap.ui.commons.MessageBox.Action.YES,sap.ui.commons.MessageBox.Action.NO],fnConfirmDelete,sap.ui.commons.MessageBox.Action.YES);
                	function fnConfirmDelete(sResult) 
                	{
                        if (sResult == "YES") 
                        {
                            var idx;
                            var selectedContext;
                            var selectedUsers = [];
                            var row = oTable.getSelectedIndices();
                            for (var ri = 0; ri < row.length; ri++) 
                            {
                                idx = row[ri]
                                selectedContext = oTable.getContextByIndex(idx);
                                selectedUsers.push(selectedContext.getObject().userName);
                            }
                            for (i = 0; i < selectedUsers.length; i++) 
                            {
                            	var selectedUser = selectedUsers[i];
                                oModel.setHeaders({"content-type": "application/json;charset=utf-8"});
                                oModel.remove( "/UsersEntity('" + selectedUser + "')", null,function() 
                                		{
                                            if (ri == 0) 
                                            {
                                                jQuery.sap.require("sap.ui.commons.MessageBox");
                                                var suc = "SUCCESS";
                                                sap.ui.commons.MessageBox.show("User was deleted",sap.ui.commons.MessageBox.Icon.SUCCESS,suc, [sap.ui.commons.MessageBox.Action.OK],null,sap.ui.commons.MessageBox.Action.OK);
                                                sap.ui.getCore().byId("users").getModel().refresh(true);
                                                sap.ui.getCore().byId("users").clearSelection();
                                            }
                                        },function() 
                                        {
                                            jQuery.sap.require("sap.ui.commons.MessageBox");
                                            var er = "ERROR";
                                            sap.ui.commons.MessageBox.show("Unable to delete user. Please retry",sap.ui.commons.MessageBox.Icon.ERROR,er, [sap.ui.commons.MessageBox.Action.OK],null,sap.ui.commons.MessageBox.Action.OK);
                                        });
                            }
                            sap.ui.getCore().byId("users").getModel().refresh(true);
                            sap.ui.getCore().byId("users").clearSelection();
                        }
                    }
                }
            },
            /**
             * Function to export all users to an excel file
             */
            csvAll: function() {
                window.location.href = "../../xs/csv.xsjs?cmd=exportExcel&mode=admin"
            },
            /**
             * Function to export all users with language = DE to and excel file
             */
            csvDE: function() {
                window.location.href = "../../xs/csv.xsjs?cmd=exportExcel&mode=admin&language=DE"
            },
            /**
             * Function to export all users with language = EN to and excel file
             */
            csvEN: function() {
                window.location.href = "../../xs/csv.xsjs?cmd=exportExcel&mode=admin&language=EN"
            },
            /**
             * Function to reset all users
             */
            resetAllUsers: function() {
                window.location.href = "../../xs/resetAllUsers.xsjs"
            }
        });