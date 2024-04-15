/**
 * @author Johnson R.
 * @description url routes
 */
const apiHelper = require('../api/apiHelper');
const auth = require('./jwtRoutes');
const notification = require('./mailRoutes')
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
		"routeName": `/getEmpAttendance`,
		"method": "post",
		"callback": apiHelper.getEmpAttendance,
		"cors": true
	},
	{
		"routeName": `/addEmpDetails`,
		"method": "post",
		"callback": apiHelper.addEmpDetails,
		"cors": true
	},
	{
		"routeName": `/getEmpGenderDetails`,
		"method": "get",
		"callback": apiHelper.getEmpGenderDetails,
		"cors": true
	},
	{
		"routeName": `/getEmpFoodPreference`,
		"method": "post",
		"callback": apiHelper.getEmpFoodPreference,
		"cors": true
	},
	{
		"routeName": `/getEmpTeamDetails`,
		"method": "get",
		"callback": apiHelper.getEmpTeamDetails,
		"cors": true
	},
	{
		"routeName": `/getEmpResponse`,
		"method": "get",
		"callback": apiHelper.getEmpResponse,
		"cors": true
	},
	{
		"routeName": `/getEventList`,
		"method": "post",
		"callback": apiHelper.getEventList,
		"cors": true
	},
	{
		"routeName": `/addEvents`,
		"method": "post",
		"callback": apiHelper.addEventsData,
		"cors": true
	},
	{
		"routeName": `/getEmpDetails`,
		"method": "post",
		"callback": apiHelper.getAllEmpDetails,
		"cors": true
	},
	{
		"routeName": `/deleteEmp`,
		"method": "post",
		"callback": apiHelper.deleteEmpDetails,
		"cors": true
	},
	{
		"routeName": `/sendMail`,
		"method": "post",
		"callback": notification.mailSend,
		"cors": true
	},
	{
		"routeName": `/addEmpFoodPreference`,
		"method": "post",
		"callback": apiHelper.addEmpFoodPreference,
		"cors": true
	}
];
module.exports = apis;