/**
* @author Binod Kr Yadav.
* @description Configuration parameters & and operators mapping
*/
const config = {
	MYSQL_HOST: 'localhost',
	MYSQL_USER: 'root',
	MYSQL_PASSWORD: '',
	MYSQL_DATABASE: 'tn_maxval_app',
	CONNECTION_POOL: false,
	CONNECTION_Limit: 10,
	operators: {
		'=': '=',
		'!=': '!=',
		'>': '>',
		'>=': '>=',
		'<': '<',
		'<=': '<=',
		'between': 'BETWEEN',
		'notbetween': 'NOT BETWEEN',
		'is': 'IS',
		'isnot': 'IS NOT',
		'in': 'IN',
		'notin': 'NOT IN',
		'find_in_set': 'FIND_IN_SET'
	}
};

module.exports = config;