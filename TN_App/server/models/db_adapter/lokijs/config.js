/**
* @author Binod Y.
* @description Configuration parameters and query operators
*/
const config = {
	LOKI_DATABASE: process.env.LOKI_DATABASE || 'vault_setup',
	operators: {
		'=': '$eq',
		'!=': '$ne',
		'>': '$gt',
		'>=': '$gte',
		'<': '$lt',
		'<=': '$lte',
		'between': '$between',
		'in': '$in',
		'notin': '$nin',
		'OR': '$or',
		'AND': '$and',
	}
};

module.exports = config;