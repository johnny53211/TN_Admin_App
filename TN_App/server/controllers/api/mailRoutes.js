const nodeMailer = require('../mailer/nodeMailer');
const config = require('../../config/config')
let notification = {
    "mailSend": async (req, res) => {
        let postedData = req['body'],
            content = `${config['response']['mailDomain']}?events=${postedData['eventsUrl']}`;
        let dataString = { to: postedData['mailReceiver'], content }
        let mailResponse = await nodeMailer.sendMail(dataString);
        res.send(mailResponse)
    }
}

module.exports = notification;