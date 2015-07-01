sap.ui.jsview("scripts.index",
		{

			/**
			 * Specifies the Controller belonging to this View. In the case that
			 * it is not implemented, or that "null" is returned, this View does
			 * not have a Controller.
			 * 
			 */
			getControllerName : function() {
				return "scripts.index";
			},

			/**
			 * Is initially called once after the Controller has been
			 * instantiated. It is the place where the UI is constructed. Since
			 * the Controller is given to this method, its event handlers can be
			 * attached right away.
			 * 
			 */
			createContent : function(oController) 
			{
				var oLayout = new sap.ui.commons.layout.MatrixLayout();
				var oModel = new sap.ui.model.odata.ODataModel("../../services/users.xsodata", false);
				var oControl;
				oTable = new sap.ui.table.Table("users", 
					{
						tableId : "tableId",
						visibleRowCount : 20,
						selectionMode : sap.ui.table.SelectionMode.Multi,
						toolbar : new sap.ui.commons.Toolbar({
						items : [ new sap.ui.commons.Button({text : "Create",enabled : false}), 
						          new sap.ui.commons.Button({text : "Edit",enabled : false}),
							      new sap.ui.commons.Button({text : "Delete",enabled : false}),
							      new sap.ui.commons.Button({text : "Excel (All)",press : oController.csvAll}),
							      new sap.ui.commons.Button({text : "Excel (DE)",press : oController.csvDE}),
							      new sap.ui.commons.Button({text : "Excel (EN)", press : oController.csvEN}),
							      new sap.ui.commons.Button({text : "Reset All Users",enabled : false})
					]})});
				oTable.setTitle("User Management Application");
				oControl = new sap.ui.commons.TextField().bindProperty("value","firstName");
				oTable.addColumn(new sap.ui.table.Column({label : new sap.ui.commons.Label({text : "First Name"}),
					template : oControl,
					sortProperty : "firstName",
					filterProperty : "firstName",
					width : "100px"
				}));
				oControl = new sap.ui.commons.TextField().bindProperty("value","lastName");
				oTable.addColumn(new sap.ui.table.Column({label : new sap.ui.commons.Label({text : "Last Name"}),
					template : oControl,
					sortProperty : "lastName",
					filterProperty : "lastName",
					width : "100px"
				}));
				oControl = new sap.ui.commons.TextField().bindProperty("value","userName");
				oTable.addColumn(new sap.ui.table.Column({label : new sap.ui.commons.Label({text : "User ID"}),
					template : oControl,
					sortProperty : "userName",
					filterProperty : "userName",
					width : "100px"
				}));
				oControl = new sap.ui.commons.TextField().bindProperty("value","email");
				oTable.addColumn(new sap.ui.table.Column({label : new sap.ui.commons.Label({text : "E-Mail"}),
					template : oControl,
					sortProperty : "email",
					filterProperty : "email",
					width : "100px"
				}));
				oControl = new sap.ui.commons.TextField().bindProperty("value","gender");
				oTable.addColumn(new sap.ui.table.Column({label : new sap.ui.commons.Label({text : "Gender"}),
					template : oControl,
					sortProperty : "gender",
					filterProperty : "gender",
					width : "100px"
				}));
				oControl = new sap.ui.commons.TextField().bindProperty("value","accountNumber");
				oTable.addColumn(new sap.ui.table.Column({label : new sap.ui.commons.Label({text : "Account Number"}),
					template : oControl,
					sortProperty : "accountNumber",
					filterProperty : "accountNumber",
					width : "100px"
				}));
				oControl = new sap.ui.commons.TextField().bindProperty("value","company");
				oTable.addColumn(new sap.ui.table.Column({label : new sap.ui.commons.Label({text : "Comapny"}),
					template : oControl,
					sortProperty : "company",
					filterProperty : "company",
					width : "100px"
				}));
				oControl = new sap.ui.commons.TextField().bindProperty("value","role");
				oTable.addColumn(new sap.ui.table.Column({label : new sap.ui.commons.Label({text : "Role"}),
					template : oControl,
					sortProperty : "role",
					filterProperty : "role",
					width : "100px"
				}));
				oControl = new sap.ui.commons.TextField().bindProperty("value","relationship");
				oTable.addColumn(new sap.ui.table.Column({label : new sap.ui.commons.Label({text : "Relationship"}),
					template : oControl,
					sortProperty : "relationship",
					filterProperty : "relationship",
					width : "100px"
				}));
				oControl = new sap.ui.commons.TextField().bindProperty("value","invitationLanguage");
				oTable.addColumn(new sap.ui.table.Column({label : new sap.ui.commons.Label({text : "Invitation Language"}),
					template : oControl,
					sortProperty : "invitationLanguage",
					filterProperty : "invitationLanguage",
					width : "100px"
				}));
				oControl = new sap.ui.commons.TextField().bindProperty("value","isInvited");
				oTable.addColumn(new sap.ui.table.Column({label : new sap.ui.commons.Label({text : "Already Invited"}),
					template : oControl,
					sortProperty : "isInvited",
					filterProperty : "isInvited",
					width : "100px"
				}));
				oTable.setModel(oModel);
				oTable.bindRows("/UsersEntity");
				oLayout.createRow(oTable);
				return oLayout;
			}
		});