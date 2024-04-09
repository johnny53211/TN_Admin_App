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
			conatcts_no: "conatcts_no",
		}
	},
	"emp_adhar_details": {
		tableName: "emp_adhar_details",
		fields: {
			emp_code: 'emp_code',
			emp_adhar: "emp_adhar",
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
	},
	"getEventData": {
		tableName: "events",
		fields: {
			event_date: "event_date",
			event_type: "event_type",
			event_name: "event_name",
			event_time: "event_time",
			"celeb_type": "celeb_type"
		}
	},
	"getEmpFoodPreference": {
		tableName: "food_preference",
		fields: {
			food_type: "food_type",
			no_members: "no_members",
			emp_code: "emp_code",
			event_name: "event_name",
			"attend": "attend",
			event_date: "event_date"
		}
	}
};
module.exports = schema;