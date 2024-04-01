/**
 * @author Johnson R.
 * @description url routes
 */
const apiHelper = require('../api/apiHelper');
const auth = require('./jwtRoutes');
const apis = [
	{
		"routeName": `/login`,
		"method": "post",
		"callback": apiHelper.login,
		"cors": true
	},
	{
		"routeName": `/registerUser`,
		"method": "post",
		"callback": apiHelper.registerUsers,
		"cors": true
	},
	{
		"routeName": `/registerEmployees`,
		"method": "post",
		"callback": apiHelper.registerEmployees,
		"cors": true
	},
	{
		"routeName": `/addAttendance`,
		"method": "post",
		"callback": apiHelper.addAttendance,
		"cors": true
	},
	{
		"routeName": `/getEmployeeAttendance`,
		"method": "post",
		"callback": apiHelper.getEmployeeAttendance,
		"cors": true
	},
	{
		"routeName": `/addEmployeeDetails`,
		"method": "post",
		"callback": apiHelper.addEmployeeDetails,
		"cors": true
	},
	{
		"routeName": `/getEmployeeDetails`,
		"method": "post",
		"callback": apiHelper.getAllEmployeeDetails,
		"cors": true
	}
];
module.exports = apis;