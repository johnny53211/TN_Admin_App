let express = require('express');
const dotenv = require('dotenv');
let app = express();
let corsPolicy = require('./config/corsPolicy/corsPolicy')(app);
let routes = require('./controllers/router/routes')(app, express);
let server = require('http').Server(app);
let config = require('./config/config');
let utils = require('./controllers/utils/utils');
let dbAdapter = require('./models/initDatabase');
let ipAddress = utils.getLocalIP();
const mailSend = require('./controllers/mailer/nodeMailer')
// retrieve user entered parameters
let argv = require('minimist')(process.argv.slice(2), {
    alias: {
        d: ['database', 'db'],
        s: ['db-size', 'size']
    },
    default: {
        d: "mysql",
    }
});
dotenv.config();
if (!argv.db) {
    console.error('No database provided');
    process.exit(1);
}
app.start = async function () {
    server.listen(config.response.PORT, () => console.log(`Server Started --> ${ipAddress}:${config.response.PORT}`));
    dbAdapter.initDatabase(argv);
}
app.start();