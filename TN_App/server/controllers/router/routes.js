const cors = require('cors');
const apis = require('../api/api');
const corsOptions = require('../../config/corsPolicy/corsConfig');
const bodyParser = require('body-parser');
let defaultMiddleware = function (req, res, next) {
    next();
}

module.exports = function (app, express) {
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    apis.forEach(api => {
        const method = api.method;
        middleware = api.middlewares ? api.middlewares : defaultMiddleware,
            corsPolicy = api.cors ? cors(corsOptions) : cors({ origin: false });
        app[method](api.routeName, middleware, corsPolicy, api.callback);
    });
}


