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
	},
	"emp_contact": {
		tableName: "contact_details",
		fields: {
			emp_code: 'emp_code',
			conatct_no: "conatct_no"
		}
	},
	"employee_details": {
		tableName: "emp_personal_details",
		fields: {
			emp_code: 'emp_code',
			father_name: "father_name",
			mother_name: 'mother_name',
			gender: "gender",
			maritial_status: 'maritial_status',
			designation: "designation",
			address: 'address',
			date_of_joining: "date_of_joining",
			blood_group: "blood_group",
			date_of_birth: 'date_of_birth',
			team: "team",
			address: 'address',
			date_of_joining: "date_of_joining",
			blood_group: "blood_group",
			conatct_no: "conatct_no",
			mail_id: "mail_id"
		}
	}
};
module.exports = schema;