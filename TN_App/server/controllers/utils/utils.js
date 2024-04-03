/**
 * @author Johnson R.
 * @description Generic functions and variables that can be used across application
 */
const ifaces = require('os').networkInterfaces();
const axios = require('axios');
const fs = require('fs'); // For file system operations
const path = require('path'); // For path manipulation
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
let utils = {
	/**
	 * Function Name-- getLocalIP
	 * @purpose  - To get local IP address 
	 * @return
	 */
	getLocalIP: function () {
		let address;
		Object.keys(ifaces).forEach(dev => {
			ifaces[dev].filter(details => {
				if (details.family === 'IPv4' && details.internal === false) {
					address = details.address;
				}
			});
		});
		return address;
	},
	/**
	 * Function Name-- generateResponse
	 * @purpose  - To create object with status and store all response
	 * @return
	 */
	generateResponse: function (status, message, data = '') {
		return (data) ? { 'status': status, 'message': message, 'data': data } : { 'status': status, 'message': message };
	},
	/**
	 * Function Name-- generateApiKey
	 * @purpose  - To generate Authentication key 
	 * @return
	 */
	generateApiKey: function (charsLength) {
		let apiKey = "";
		for (let i = 0; i < charsLength; i++) {
			apiKey += Math.floor(Math.random() * 32).toString(32);
		}
		return apiKey;
	},
	/**
	 * Function Name-- getObjectKey
	 * @purpose  - To get key from object using value 
	 * @return
	 */
	getObjectKey: function (obj, val) {
		return Object.keys(obj).find(key => obj[key] === val);
	},
	/**
	 * Function Name-- numberPadding
	 * @purpose  - To make padding of number using padding operator
	 * @return
	 */
	numberPadding: function (number, size, paddingOperator) {
		paddingOperator = paddingOperator || "0";
		let s = String(number);
		while (s.length < (size || 2)) { s = paddingOperator + s; }
		return s;
	},
	/**
	 * Function Name-- schemaFieldsMapping
	 * @purpose  - Checking schema values is getting in request
	 * @return
	 */
	schemaFieldsMapping: function (schema, schemaName, dataObj) {
		//get table schema
		let schemaTbl = schema[schemaName];
		let fieldsMapped = {};
		// iterate keys from object and map with schema
		for (var key in dataObj) {
			if (schemaTbl.fields[key]) {
				let fieldName = schemaTbl.fields[key];
				let fieldValue = dataObj[key];
				fieldsMapped[fieldName] = fieldValue;
			}
		}
		return fieldsMapped;
	},
	/**
	 * Function Name-- getUtcTime
	 * @purpose  - get UTC timezone
	 * @return
	 */
	getUtcTime: function (date) {
		if (typeof date === "undefined")
			var dt = new Date();
		else
			var dt = new Date(date);

		let utctime = dt.getTime();
		return utctime;
	},
	/**
	 * Function Name-- getLocalDtIsoFormat
	 * @purpose  - get local IOS format 
	 * @return
	 */
	getLocalDtIsoFormat: function (timeStamp) {
		let dtObj = new Date(timeStamp);
		return utils.toIsoStringFormat(dtObj.toString());
	},
	/**
	 * Function Name-- getUtcDtIsoFormat
	 * @purpose  - getting iso date with timezone 
	 * @return
	 */
	getUtcDtIsoFormat: function (timeStamp) {
		let dtObj = new Date(timeStamp);
		return utils.toIsoStringFormat(dtObj.toUTCString());
	},
	/**
	 * Function Name-- getUtcDtIsoFormat
	 * @purpose  - //making iso string format like: YYYY-MM-DD HH:MM:SS from date object
	 * @return
	 */
	toIsoStringFormat: function (dateString) {
		//making iso string format like: YYYY-MM-DD HH:MM:SS from date object
		return new Date(dateString.split('GMT')[0] + ' UTC').toISOString().replace('Z', '').replace('T', ' ').split(".")[0]
	},
	downloadZip: async function (dataObj) {
		let url = dataObj.url;
		try {
			const response = await axios.get(url, { responseType: 'stream' }); // Request response as blob
			const filename = url.split('/').pop(); // Extract filename from the URL
			// Create the destination folder if it doesn't exist
			const destinationFolder = 'downloaded_files';
			if (!fs.existsSync(destinationFolder)) {
				fs.mkdirSync(destinationFolder);
			}
			const destinationFile = path.join(destinationFolder, filename);

			response.data.pipe(fs.createWriteStream(destinationFile));

			return new Promise((resolve, reject) => {
				response.data.on('end', () => resolve(destinationFile));
				response.data.on('error', error => reject(error));
				console.log(`File ${filename} saved to ${destinationFolder}`);
			});

		} catch (error) {
			console.log(error);
		}
	},
	encryptData: function (data) {
		return cryptr.encrypt(data);
	},
	decryptData: function (data) {
		return cryptr.decrypt(data);
	}
};

module.exports = utils;