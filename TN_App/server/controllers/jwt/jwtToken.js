const jwt = require('jsonwebtoken');
let jwtModule = {
    register: async (args, callback) => {
        try {
            let { payload, options } = args;
            const token = await jwt.sign(payload, process.env.TOKEN_SECRET, options, function (err, response) {
                callback(err, response)
            });
        } catch (error) {
            console.log(error);
        }
    },
    verify: async (options, callback) => {
        let { token, secretKey } = options
        await jwt.verify(token, secretKey, function (err, decoded) {
            callback(err, decoded)
        });
    }
}

module.exports = jwtModule

