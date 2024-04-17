const nodeMailer = require('../mailer/nodeMailer');
const config = require('../../config/config');
const utils = require('../utils/utils')
let notification = {
    "mailSend": async (req, res) => {
        let postedData = req['body'],
            content = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your Awesome Email</title>
            </head>
            <body>
                <h1>Hello Employee</h1>
                <p>${config['response']['mailDomain']}?events=${postedData['eventsUrl']}</p>
            </body>
            </html>`;
        let dataString = { to: postedData['mailReceiver'], content }
        let mailResponse = await nodeMailer.sendMail(dataString);
        if (mailResponse && mailResponse.accepted) resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['CODE_SUCCESS'])
        else resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['AUTH_MSG'])
        res.send(resMsg)
    }
}

module.exports = notification;