/**
 * Handles Server Communications.
 */
const serverRequest = require('axios');

const makeAPICall = function(options){
    return serverRequest(options).then(function (response) {
        return response;
    })
    .catch(function (err) {
        return err; // API call failed...
    });
}

module.exports = {makeAPICall};