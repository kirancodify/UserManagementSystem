var oRequest = $.request;
var oResponse = $.response;
/**
 * XS Function to fetch the data and export into a Excel file.
 * @params {string}
 * 			mode - indicates if the export is for admin or view only mode.
 * @params {string}
 * 			cmd - specifies the function of the csv.xsjs to be called from the controller
 */
function exportExcel() {
	var mode = oRequest.parameters.get("mode");
	if (oRequest.method !== $.net.http.GET) {
		oResponse.status = $.net.http.METHOD_NOT_ALLOWED;
	} else {
		var body = "";
		var query = "";
		var admin = "SELECT TOP 1000 * FROM \"CLD_USER_MANAGEMENT\".\"sap.cld_user_management.db::users\"";
		var view = "SELECT TOP 1000 \"firstName\",\"lastName\",\"gender\",\"email\",\"accountNumber\",\"company\",\"role\",\"relationship\",\"userName\",\"invitationLanguage\",\"isInvited\" from \"CLD_USER_MANAGEMENT\".\"sap.cld_user_management.db::users\"";
		try {
			if (mode === 'admin') {
				query = admin;
			} else if (mode === 'view') {
				query = view;
			} else {
				oResponse.status = $.net.http.OK;
				oResponse.setBody("Invalid Command: " + mode);
			}
			var language = oRequest.parameters.get("language");
			if (language === "DE") {
				query += " WHERE \"invitationLanguage\" = 'DE'";
			} else if (language === "EN") {
				query += " WHERE \"invitationLanguage\" = 'EN'";
			}
			var connection = $.db.getConnection();
			var preparedStatement = connection.prepareStatement(query);
			var result = preparedStatement.executeQuery();
			var resultMetaData = result.getMetaData();
			var i = 1;
			for (i = 1; i <= resultMetaData.getColumnCount(); i++) {
				if (i !== 1) {
					body += "\t";
				}
				body += resultMetaData.getColumnName(i);
			}
			body += "\n";
			while (result.next()) {
				if (mode === 'admin') {
					body += result.getString(1) + "\t" + result.getString(2)
							+ "\t" + result.getString(3) + "\t"
							+ result.getString(4) + "\t" + result.getString(5)
							+ "\t" + result.getString(6) + "\t"
							+ result.getString(7) + "\t" + result.getString(8)
							+ "\t" + result.getString(9) + "\t"
							+ result.getString(10) + "\t"
							+ result.getString(11) + "\t"
							+ result.getString(12) + "\n";
				} else if (mode === 'view') {
					body += result.getString(1) + "\t" + result.getString(2)
							+ "\t" + result.getString(3) + "\t"
							+ result.getString(4) + "\t" + result.getString(5)
							+ "\t" + result.getString(6) + "\t"
							+ result.getString(7) + "\t" + result.getString(8)
							+ "\t" + result.getString(9) + "\t"
							+ result.getString(10) + "\t"
							+ result.getString(11) + "\n";
				}
			}
			result.close();
			preparedStatement.close();
			oResponse.setBody(body);
			oResponse.contentType = 'application/x-www-form-urlencoded; charset=utf-16le';
			oResponse.headers.set('Content-Disposition','attachment; filename=Clouduser.xls');
			oResponse.headers.set('access-control-allow-origin', '*');
			oResponse.status = $.net.http.OK;
		} catch (e) {
			oResponse.status = $.net.http.INTERNAL_SERVER_ERROR;
		}
	}
}
/**
 * Checks if the parameter cmd is provided
 */
var acmd = oRequest.parameters.get("cmd");
switch (acmd) {
case "exportExcel":
	exportExcel();
	break;
default:
	oResponse.status = $.net.http.OK;
	oResponse.setBody("Invalid Command: " + acmd);
}
