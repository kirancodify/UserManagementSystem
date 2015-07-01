/**
 * Function to reset the users
 */
var oUsers = $.import("sap.cld_user_management.services", "users");
var oRequest = $.request;
var oResponse = $.response;


if (oRequest.method !== $.net.http.GET) {
	oResponse.status = $.net.http.METHOD_NOT_ALLOWED;
}
else
{
	var body = "<a href=\"../ui/admin/index.html\">&lt;-- Back to the Cloud User Management</a><br><br>The following users have been resetted in the system:<br><hr>\n";
	try
	{
		var query = "SELECT TOP 1000 \"userName\", \"password\" FROM \"CLD_USER_MANAGEMENT\".\"sap.cld_user_management.db::users\"";
		var connection = $.db.getConnection();
		var preparedStatement = connection.prepareStatement(query);
		var result = preparedStatement.executeQuery();
		var username;
		var password;
		while (result.next()) {
			username = result.getString(1);
			password = result.getString(2);
			
			oUsers.executeDelete(connection, username);
			oUsers.executeCreate(connection, username, password);
			
			body += username + "<br>\n";
		}
		result.close();
		preparedStatement.close();
		body += "<hr>\n";
			
		oResponse.setBody(body);
		oResponse.contentType = 'text/html';
		oResponse.status = $.net.http.OK;
	}
	catch (e)
	{
		oResponse.status = $.net.http.INTERNAL_SERVER_ERROR;
	}
}
