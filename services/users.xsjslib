/**@param {connection} Connection - The SQL connection used in the OData request
 * @param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
 * @param {afterTableName} String - The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
 * @return {object} - Error information with string-valued properties serialized into the inner error part of the error message.
 *                    Special properties HTTP_STATUS_CODE(int) and ERROR_MESSAGE(string) are returned as status code of the http
 *                    response and the OData error message string.
 */

var connection;
var beforeTableName;
var afterTableName;
var query;
var preparedStatement;
var result;

function executeCreate(connection, username, password) {
	// Create User in HANA
	query = 'CREATE USER ' + username + ' PASSWORD ' + password;
	preparedStatement = connection.prepareStatement(query);	
	result = preparedStatement.executeUpdate();
	preparedStatement.close();
	
	// Disable Password Lifetime
	query = 'ALTER USER ' + username + ' DISABLE PASSWORD LIFETIME';
	preparedStatement = connection.prepareStatement(query);	
	result = preparedStatement.executeUpdate();
	preparedStatement.close();
	
	// Grant Access to PLC
	query = 'GRANT TESTER TO ' + username;
	preparedStatement = connection.prepareStatement(query);	
	result = preparedStatement.executeUpdate();
	preparedStatement.close();
}

function createUser(param) {
	connection = param.connection;
	afterTableName = param.afterTableName;

	// Get Added Row
	query = 'SELECT * FROM "' + afterTableName + '"';
	preparedStatement = connection.prepareStatement(query);	
	result = preparedStatement.executeQuery();
	if (result.next() === false) {
		return { HTTP_STATUS_CODE: 400, ERROR_MESSAGE: 'No row in temporary table during creation!' };
	}
	
	// Get UserName and Password
	var username = result.getString(9);
	var password = result.getString(10);
	
	// Clean-Up
	result.close();
	preparedStatement.close();

	// Create User in HANA
	executeCreate(connection, username, password);
	
	return undefined;
}

function updateUser(param) {
	connection = param.connection;
	afterTableName = param.afterTableName;
	beforeTableName = param.beforeTableName;

	// Get Current Row
	query = 'SELECT * FROM "' + beforeTableName + '"';
	preparedStatement = connection.prepareStatement(query);	
	result = preparedStatement.executeQuery();
	if (result.next() === false) {
		return { HTTP_STATUS_CODE: 400, ERROR_MESSAGE: 'No row in temporary table during creation!' };
	}
	
	// Get Current UserName and Password
	var username = result.getString(9);
	var currentPassword = result.getString(10);
	
	// Clean-Up
	result.close();
	preparedStatement.close();

	// Get Changed Row
	query = 'SELECT * FROM "' + afterTableName + '"';
	preparedStatement = connection.prepareStatement(query);	
	result = preparedStatement.executeQuery();
	if (result.next() === false) {
		return { HTTP_STATUS_CODE: 400, ERROR_MESSAGE: 'No row in temporary table during creation!' };
	}
	
	// Get Changed Password
	var changedPassword = result.getString(10);
	
	// Clean-Up
	result.close();
	preparedStatement.close();
	
	// Password not Changed?
	if (currentPassword === changedPassword) {
		return undefined;
	}
	
	// Change User Password
	query = 'ALTER USER ' + username + ' PASSWORD ' + changedPassword;
	preparedStatement = connection.prepareStatement(query);	
	result = preparedStatement.executeUpdate();
	preparedStatement.close();
	
	return undefined;
}

function executeDelete(connection, username) {
	// Remove User
	query = 'DROP USER ' + username + ' CASCADE';
	preparedStatement = connection.prepareStatement(query);	
	result = preparedStatement.executeUpdate();
	preparedStatement.close();
}

function deleteUser(param) {
	connection = param.connection;
	beforeTableName = param.beforeTableName;

	// Get Deleted Row
	query = 'SELECT * FROM "' + beforeTableName + '"';
	preparedStatement = connection.prepareStatement(query);	
	result = preparedStatement.executeQuery();
	if (result.next() === false) {
		return { HTTP_STATUS_CODE: 400, ERROR_MESSAGE: 'No row in temporary table during creation!' };
	}
	
	// Get UserName
	var username = result.getString(9);
	
	// Clean-Up
	result.close();
	preparedStatement.close();

	// Remove User
	executeDelete(connection, username);
	
	return undefined;
}
