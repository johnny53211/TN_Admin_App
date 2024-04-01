let corsConfig = require('./corsConfig');

const corsOptions = {
    origin: function(origin, callback) {
        if (corsConfig.allowedDomains.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(corsConfig.error,false)
        }
    }
}

module.exports = function(app){
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).send({status: err.status, message: err.message});        
    });    
}