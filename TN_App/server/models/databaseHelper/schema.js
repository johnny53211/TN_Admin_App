/**
 * @author Binod Y.
 * @description schema for application
 */
const schema = {
	"register_users": {
		tableName: "credential",
		fields: {
			emp_code: 'emp_code',
			username: 'username',
			password: "password",
			is_admin: "is_admin"
		}
	},
	"regsiter_employee": {
		tableName: "employee_details",
		fields: {
			emp_code: 'emp_code',
			emp_name: "emp_name"
		}
	},
	"emp_attendance": {
		tableName: "emp_attendance",
		fields: {
			emp_code: 'emp_code',
			day: "day",
			month: 'month',
			year: "year",
			attendance_status: "attendance_status"
		}
	}
};
module.exports = schema;